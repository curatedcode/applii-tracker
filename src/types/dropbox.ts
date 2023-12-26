import { DropboxResponse, files } from "dropbox";
import { z } from "zod";

export interface DropboxFetchFileType
  extends DropboxResponse<files.FileMetadata> {
  result: {
    client_modified: string;
    content_hash: string;
    fileBlob: Blob;
    id: string;
    is_downloadable: boolean;
    name: string;
    path_display: string;
    path_lower: string;
    rev: string;
    server_modified: string;
    size: number;
  };
}

export const dropboxResponseError = z.object({
  error: z.object({
    error: z.object({
      ".tag": z.string(),
    }),
    error_summary: z.string(),
  }),
  headers: z.unknown(),
  name: z.string(),
  status: z.number(),
});

export type DropboxResponseError = z.infer<typeof dropboxResponseError>;

export type GenerateDropboxAuthReturnType = {
  codeVerifier: string;
  codeChallenge: string;
  url: string;
};

export const dropboxGetAccessTokenResponse = z.object({
  result: z.object({
    access_token: z.string(),
    expires_in: z.number(),
    token_type: z.string(),
    scope: z.string(),
    account_id: z.string().optional(),
    team_id: z.string().optional(),
    refresh_token: z.string(),
    id_token: z.string().optional(),
    uid: z.string(),
  }),
  status: z.number(),
});

export type DropboxGetAccessTokenResponse = z.infer<
  typeof dropboxGetAccessTokenResponse
>;

export const dropboxTokenNames = {
  refreshToken: "dbxRefreshToken",
  initialAuthToken: "dbxTokenParam",
  accessToken: "dbxAccessToken",
  codeVerifier: "dbxCodeVerifier",
} as const;
