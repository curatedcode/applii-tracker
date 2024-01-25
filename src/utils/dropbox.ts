import { DropboxAuth } from "dropbox";
import {
	DropboxGetAccessTokenResponse,
	dropboxGetAccessTokenResponse,
	dropboxTokenNames,
} from "../types/dropbox";
import env from "./env";
import storeSyncError from "./storeSyncError";

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
			// Dropbox returns the URL as String so we need to override it
			return value as string;
		});

	return authUrl;
}

/**
 * This will create and store an access token that can be used to read/write from the users dropbox account
 * @param initialToken the token you received back from dropbox after the user granted permissions
 */
export async function createDropboxToken(initialToken: string): Promise<void> {
	const codeVerifier = window.localStorage.getItem(
		dropboxTokenNames.codeVerifier,
	);

	if (!codeVerifier) {
		throw new Error("Unable to retrieve codeVerifier from localStorage");
	}

	dbxAuth.setCodeVerifier(codeVerifier);
	dbxAuth.getAccessTokenFromCode(redirectURL, initialToken).then((value) => {
		const valueParsed = dropboxGetAccessTokenResponse.safeParse(value);

		if (!valueParsed.success) {
			storeSyncError({
				error: `Dropbox Auth getAccessTokenFromCode return type is incorrect. Data: ${value}. Date: ${new Date().toISOString()}`,
			});
			const typedValue = value as DropboxGetAccessTokenResponse;
			window.localStorage.setItem(
				dropboxTokenNames.refreshToken,
				typedValue.result.refresh_token,
			);
			window.localStorage.setItem(
				dropboxTokenNames.accessToken,
				typedValue.result.access_token,
			);
			return;
		}

		const tokens = valueParsed.data.result;

		window.localStorage.setItem(
			dropboxTokenNames.refreshToken,
			tokens.refresh_token,
		);
		window.localStorage.setItem(
			dropboxTokenNames.accessToken,
			tokens.access_token,
		);
	});
}
