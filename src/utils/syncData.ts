import { Dropbox, DropboxAuth } from "dropbox";
import { DropboxResponseError, dropboxTokenNames } from "../types/dropbox";
import { getAllData } from "./db";
import env from "./env";

export default async function syncData(): Promise<void | Error> {
  const accessToken = window.localStorage.getItem(
    dropboxTokenNames.accessToken,
  );
  const refreshToken = window.localStorage.getItem(
    dropboxTokenNames.refreshToken,
  );

  if (!accessToken || !refreshToken) {
    return new Error("Missing dropbox tokens");
  }

  const allData = await getAllData();

  const dbxAuth = new DropboxAuth({
    clientId: env.DROPBOX_APP_KEY,
    refreshToken,
    accessToken,
  });

  // dropbox type def file is incorrect. This is a promise
  await dbxAuth.checkAndRefreshAccessToken();

  const dbx = new Dropbox({
    accessToken: dbxAuth.getAccessToken(),
    auth: dbxAuth,
    clientId: env.DROPBOX_APP_KEY,
  });

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
          reject("Incorrect sync token");
        }
        if (errStatus >= 500 && errStatus <= 599) {
          reject("Sync server issues");
        }
        reject("Sync issue occurred");
      });
  });
}
