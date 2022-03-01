import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 10);

const iterations = 10000;

function getEncoded(message: string) {
  let enc = new TextEncoder();
  return enc.encode(message);
}

function getKeyMaterial(password: string) {
  return window.crypto.subtle.importKey(
    "raw",
    getEncoded(password),
    "PBKDF2",
    false,
    ["deriveBits", "deriveKey"]
  );
}

async function genKey(password: string, salt: string): Promise<CryptoKey> {
  const keyMaterial = await getKeyMaterial(password);
  const encodedSalt = getEncoded(salt);
  let key = await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: encodedSalt,
      iterations: iterations,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
  return key;
}

async function encrypt(plaintext: string | object, iv: string, key: CryptoKey) {
  plaintext = JSON.stringify(plaintext);
  const encodedIv = getEncoded(iv);
  const cipherText = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: encodedIv,
    },
    key,
    getEncoded(plaintext)
  );
  return cipherText;
}

async function decrypt(ciphertext: any, iv: string, key: CryptoKey) {
  const encodedIv = getEncoded(iv);

  try {
    let decrypted = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: encodedIv,
      },
      key,
      ciphertext
    );

    let dec = new TextDecoder();
    let decryptedDecoded = JSON.parse(dec.decode(decrypted));
    return decryptedDecoded;
  } catch (err) {
    console.error(err);
  }
}

function genUUID(): string {
  return nanoid();
}

export { genKey, encrypt, decrypt, genUUID };
