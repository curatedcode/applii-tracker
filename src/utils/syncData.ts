import dayjs from "dayjs";
import { Dropbox, DropboxAuth } from "dropbox";
import { DropboxResponseError } from "../types/dropbox";
import { getAllData } from "./db";
import { generateDropboxAuthToken } from "./dropbox";
import env from "./env";

export default async function syncData(
  dbxToken: string,
): Promise<void | Error> {
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
          reject("Incorrect sync token");
        }
        if (errStatus >= 500 && errStatus <= 599) {
          reject("Sync server issues");
        }
        reject("Sync issue occurred");
      });
  });
}
