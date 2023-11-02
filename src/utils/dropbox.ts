import { DropboxAuth } from "dropbox";
import env from "./env";
import { DropboxGetAccessTokenResponseType } from "./customVariables";

const dbxAuth = new DropboxAuth({ clientId: env.DROPBOX_APP_KEY });
const redirectURL = `${env.APP_URL}/settings`;

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
      window.sessionStorage.setItem("codeVerifier", codeVerifier);
      return value as string;
    });

  return authUrl;
}

/**
 *
 * @param dropboxGeneratedToken - the initial token generated after getting access to dropbox
 * @returns The token that will be used to access the apps dropbox folder
 */
export async function generateDropboxAuthToken({
  initialToken,
  isSetup,
}: {
  initialToken: string;
  isSetup?: boolean;
}): Promise<void> {
  const codeVerifier = window.sessionStorage.getItem("codeVerifier") ?? "";

  if (isSetup) {
    dbxAuth.setCodeVerifier(codeVerifier);
    window.sessionStorage.removeItem("codeVerifier");
    dbxAuth.getAccessTokenFromCode(redirectURL, initialToken).then((value) => {
      const typedValue = value as DropboxGetAccessTokenResponseType;
      window.localStorage.setItem(
        "dbxRefreshToken",
        typedValue.result.refresh_token,
      );
      window.localStorage.setItem(
        "dbxAccessToken",
        typedValue.result.access_token,
      );
    });

    return;
  }

  const refreshToken = window.sessionStorage.getItem("dbxRefreshToken");

  if (!refreshToken) {
    return;
  }

  fetch(
    "https://api.dropbox.com/oauth2/token" +
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: env.DROPBOX_APP_KEY,
      }),
    {
      method: "POST",
    },
  ).then((value) => {
    const typedValue =
      value.json() as unknown as DropboxGetAccessTokenResponseType;
    window.localStorage.setItem(
      "dbxRefreshToken",
      typedValue.result.refresh_token,
    );
    window.localStorage.setItem(
      "dbxAccessToken",
      typedValue.result.access_token,
    );
  });
}
