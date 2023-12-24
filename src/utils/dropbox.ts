import { DropboxAuth } from "dropbox";
import {
  DropboxGetAccessTokenResponseType,
  dropboxTokenNames,
} from "../types/dropbox";
import env from "./env";

const dbxAuth = new DropboxAuth({ clientId: env.DROPBOX_APP_KEY });
const redirectURL = `${env.APP_URL}/boards/settings`;

export async function getDropboxAuthURL(): Promise<string> {
  const authUrl = await dbxAuth
    .getAuthenticationUrl(
      redirectURL,
      undefined,
      "code",
      "offline",
      undefined,
      undefined,
      true,
    )
    .then((value) => {
      const codeVerifier = dbxAuth.getCodeVerifier();
      window.localStorage.setItem(dropboxTokenNames.codeVerifier, codeVerifier);
      return value as string;
    });

  return authUrl;
}

/**
 * This will create and store an access token that can be used to read/write from the users dropbox account
 * @param initialToken the token you received back from dropbox after the user granted permissions
 */
export async function initializeDropboxAuthToken(
  initialToken: string,
): Promise<void> {
  const codeVerifier = window.localStorage.getItem(
    dropboxTokenNames.codeVerifier,
  );

  if (!codeVerifier) {
    throw new Error("Unable to retrieve codeVerifier from localStorage");
  }

  dbxAuth.setCodeVerifier(codeVerifier);
  dbxAuth.getAccessTokenFromCode(redirectURL, initialToken).then((value) => {
    const typedValue = value as DropboxGetAccessTokenResponseType;
    window.localStorage.setItem(
      dropboxTokenNames.refreshToken,
      typedValue.result.refresh_token,
    );
    window.localStorage.setItem(
      dropboxTokenNames.accessToken,
      typedValue.result.access_token,
    );
  });
}
