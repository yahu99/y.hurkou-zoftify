import { AES, enc } from 'crypto-js';

export function aesEncrypt(message: string, aesKey: string): string {
  const encrypted = AES.encrypt(message, aesKey);
  return encrypted.toString();
}

export function aesDecrypt(message: string, aesKey): string {
  const decrypted = AES.decrypt(message, aesKey);
  return decrypted.toString(enc.Utf8);
}
