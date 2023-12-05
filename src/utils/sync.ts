import dayjs from "dayjs";
import { Dropbox, DropboxAuth } from "dropbox";
import JSONExport from "jsonexport";
import { RefObject } from "react";
import toast from "react-hot-toast";
import { DropboxResponseError } from "../types/dropbox";
import { FileExportTypeOptionsType } from "../types/file";
import { exportData, getAllData, importData } from "./db";
import { generateDropboxAuthToken } from "./dropbox";
import env from "./env";

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
        path:
          process.env.NODE_ENV === "production"
            ? "/data.json"
            : "/data-dev.json",
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

export type ExportDataToFileProps = {
  anchorEl: RefObject<HTMLAnchorElement>;
  fileType: FileExportTypeOptionsType;
  fileName: string;
};

export async function exportDataToFile({
  anchorEl,
  fileType,
  fileName,
}: ExportDataToFileProps) {
  if (!anchorEl.current) return;

  const rawData = await exportData();

  let blobURI: string;

  if (fileType === "csv") {
    const csvData = await JSONExport(rawData, {
      headerPathString: "/",
    });
    const fileBlob = new Blob([csvData], { type: "text/csv" });
    blobURI = URL.createObjectURL(fileBlob);
  } else {
    const jsonData = JSON.stringify(rawData);
    const fileBlob = new Blob([jsonData], { type: "text/json" });
    blobURI = URL.createObjectURL(fileBlob);
  }

  anchorEl.current.setAttribute("href", blobURI);
  anchorEl.current.setAttribute("download", `${fileName}.${fileType}`);
  anchorEl.current.click();
  URL.revokeObjectURL(blobURI);
}
