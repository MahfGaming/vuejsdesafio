import CryptoJS from 'crypto-js';

const secretKey = 'miClaveSecreta';

export function encryptPassword(password) {
  return CryptoJS.AES.encrypt(password, secretKey).toString();
}

export function decryptPassword(encryptedPassword) {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}