import { Dropbox } from "dropbox";
import { exportData, getAllData, importData } from "./db";
import {
  DropboxResponseError,
  GetDropboxAuthReturnType,
} from "./customVariables";
import env from "./env";
import pkceChallenge from "./generatePKCE";
import toast from "react-hot-toast";
import { RefObject } from "react";

/**
 *
 * @todo - check for a stored access token otherwise accept one just passed in params
 * @todo - add sync interval
 * @todo - first check if data.json exists. if not upload current data
 */

export async function getDropboxAuth(): Promise<GetDropboxAuthReturnType> {
  const { codeChallenge, codeVerifier } = await pkceChallenge();
  const dbxAppKey = env.DROPBOX_APP_KEY;

  return {
    codeChallenge,
    codeVerifier,
    url: `https://www.dropbox.com/oauth2/authorize?response_type=code&client_id=${dbxAppKey}&code_challenge_method=S256&token_access_type=offline&code_challenge=${codeChallenge}`,
  };
}

export async function syncData(
  dbxToken: string,
): Promise<void | { message: string }> {
  const allData = await getAllData();

  const dropbox = new Dropbox({
    accessToken: dbxToken,
  });

  await new Promise((resolve, reject) => {
    dropbox
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
