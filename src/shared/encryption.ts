import CryptoJS from "crypto-js";

export const encryptData = (data: unknown): string => {
  const jsonString = JSON.stringify(data);
  const key = (process.env.NEXT_PUBLIC_ENCRYPTION_KEY as string) || "secretkey";
  const encrypted = CryptoJS.AES.encrypt(jsonString, key);
  return encrypted.toString() || "";
};

export const decryptData = (encodedData: string): object => {
  const key = (process.env.NEXT_PUBLIC_ENCRYPTION_KEY as string) || "secretkey";

  if (!key) {
    throw new Error("Encryption key missing");
  }

  try {
    const decrypted = CryptoJS.AES.decrypt(encodedData, key);

    let decoded: string;
    try {
      decoded = decrypted.toString(CryptoJS.enc.Utf8);
    } catch {
      return {};
    }

    if (!decoded) {
      return {};
    }

    return JSON.parse(decoded);
  } catch {
    return {};
  }
};
