export interface DecryptedToken {
  token?: string;
  deviceID?: string;
  user?: { name?: string };
  kind?: string;
  role?: string;
  [key: string]: unknown;
}
