const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
  const ciper = crypto.createCipheriv(algorithm, key, iv);
  return Buffer.concat([ciper.update(text, "utf-8"), ciper.final()]).toString(
    "hex",
  );
}

const encrypted = encrypt("Khondokar-Mostak");

console.log("After Encription : " + encrypted);

function decrypt(text) {
  const deciper = crypto.createDecipheriv(algorithm, key, iv);
  return Buffer.concat([
    deciper.update(Buffer.from(encrypted, "hex")),
    deciper.final(),
  ]).toString("utf-8");
}
const decrypted = decrypt(encrypted);

console.log("After Decrypted : " + decrypted);
