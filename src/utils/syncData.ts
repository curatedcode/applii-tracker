import { Dropbox, DropboxAuth } from "dropbox";
import { dropboxResponseError, dropboxTokenNames } from "../types/dropbox";
import { getAllData } from "./db";
import env from "./env";
import storeSyncError from "./storeSyncError";

export default async function syncData(): Promise<void | Error> {
  const accessToken = window.localStorage.getItem(
    dropboxTokenNames.accessToken,
  );
  const refreshToken = window.localStorage.getItem(
    dropboxTokenNames.refreshToken,
  );

  if (!accessToken || !refreshToken) {
    return new Error("Sync error (D1)");
  }

  const allData = await getAllData();

  const dbxAuth = new DropboxAuth({
    clientId: env.DROPBOX_APP_KEY,
    refreshToken,
    accessToken,
  });

  try {
    // dropbox type def file is incorrect. This is a promise
    await dbxAuth.checkAndRefreshAccessToken();
  } catch (error) {
    storeSyncError({ error });
    throw new Error("Sync error (D1)");
  }

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
      .catch((error) => {
        const errorParsed = dropboxResponseError.safeParse(error);

        if (!errorParsed.success) {
          storeSyncError({
            error: `Dropbox file upload error type is invalid. Data: ${error} Date: ${new Date().toISOString()}`,
          });
          reject("Sync error (D2)");
          return;
        }

        const errorStatus = errorParsed.data.status;

        if (errorStatus >= 400 && errorStatus <= 499) {
          reject("Sync error (D3)");
          return;
        }
        if (errorStatus >= 500 && errorStatus <= 599) {
          reject("Sync error (D4)");
          return;
        }

        reject("Sync error (D5)");
      });
  });
}
