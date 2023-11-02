import { Dropbox, DropboxAuth } from "dropbox";
import { exportData, getAllData, importData } from "./db";
import { DropboxResponseError } from "./customVariables";
import toast from "react-hot-toast";
import { RefObject } from "react";
import env from "./env";
import dayjs from "dayjs";
import { generateDropboxAuthToken } from "./dropbox";

export async function syncData(
  dbxToken: string,
): Promise<void | { message: string }> {
  const allData = await getAllData();

  const dbx = new Dropbox({
    accessToken: dbxToken,
  });

  const dbxAuth = new DropboxAuth({ clientId: env.DROPBOX_APP_KEY });

  dbxAuth.setAccessToken(dbxToken);
  const expiresAtDate = dayjs(dbxAuth.getAccessTokenExpiresAt());

  const differenceInMinutes = expiresAtDate.diff(dayjs(), "minutes");

  if (differenceInMinutes <= 1) {
    const refreshToken = window.localStorage.getItem("dbxRefreshToken");
    if (!refreshToken) return;

    await generateDropboxAuthToken({ initialToken: refreshToken });
  }

  await new Promise((resolve, reject) => {
    dbx
      .filesUpload({
        path: "/data.json",
        contents: JSON.stringify(allData),
        mode: { ".tag": "overwrite" },
      })
      .then(() => resolve(undefined))
      .catch((err) => {
        const typedErr = err as DropboxResponseError;
        const errStatus = typedErr.status;

        if (errStatus >= 400 && errStatus <= 499) {
          reject({ message: "Incorrect sync token" });
        }
        if (errStatus >= 500 && errStatus <= 599) {
          reject({ message: "Sync server issues" });
        }
        reject({ message: "Sync issue occurred" });
      });
  });
}

export async function importDataFromFile(file: File) {
  const fr = new FileReader();

  fr.addEventListener("load", async () => {
    const data = fr.result;
    if (typeof data !== "string") {
      toast.error("Imported data is invalid");
      return;
    }
    const dataParsed = JSON.parse(data);
    const importPromise = importData(dataParsed);
    toast.promise(importPromise, {
      loading: "Importing data",
      error: "Imported data is invalid",
      success: "Data imported successfully",
    });
  });
  fr.readAsText(file);
}

export async function exportDataToFile(anchorEl: RefObject<HTMLAnchorElement>) {
  if (!anchorEl.current) return;

  const data = await exportData();
  const fileURL =
    "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));

  anchorEl.current.setAttribute("href", fileURL);
  anchorEl.current.setAttribute("download", "data.json");
  anchorEl.current.click();

  toast.success("Exported successfully");
}
