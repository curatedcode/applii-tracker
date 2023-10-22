import { Dropbox } from "dropbox";
import { applicationDB, getAllData } from "./db";
import {
  ApplicationType,
  DropboxFetchFileType,
  DropboxResponseError,
  SettingsType,
} from "./customVariables";
import env from "./env";
import pkceChallenge from "./generatePKCE";

/**
 *
 * @todo - check for a stored access token otherwise accept one just passed in params
 * @todo - add sync interval
 * @todo - first check if data.json exists. if not upload current data
 */

export async function getDropboxAuthURL(): Promise<string> {
  const codeChallenge = await pkceChallenge();
  const dbxAppKey = env.DROPBOX_APP_KEY;

  return `https://www.dropbox.com/oauth2/authorize?response_type=code&client_id=${dbxAppKey}&code_challenge_method=S256&token_access_type=offline&code_challenge=${codeChallenge}`;
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

export async function getSyncedData(dbxToken: string) {
  const dropbox = new Dropbox({
    accessToken: dbxToken,
  });

  const response = (await dropbox.filesDownload({
    path: "/data.json",
  })) as DropboxFetchFileType;

  const fr = new FileReader();

  fr.addEventListener("load", () =>
    console.log({ result: JSON.parse(fr.result as string) }),
  );
  fr.readAsText(response.result.fileBlob);
}
