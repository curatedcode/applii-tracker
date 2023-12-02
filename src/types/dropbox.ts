import { DropboxResponse, files } from "dropbox";

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

export type DropboxResponseError = {
  error: { error: { ".tag": string }; error_summary: string };
  headers: Headers;
  name: string;
  status: number;
};

export type GenerateDropboxAuthReturnType = {
  codeVerifier: string;
  codeChallenge: string;
  url: string;
};

export type DropboxGetAccessTokenResponseType = {
  result: {
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
    account_id?: string;
    team_id?: string;
    refresh_token: string;
    id_token?: string;
    uid: string;
  };
  status: number;
};
