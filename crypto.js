const crypto = require("crypto");
const utf8 = require("utf8");

// 随机值
// const iv = crypto.randomBytes(16);

// 加密/解密方式
const algorithm = "aes-128-cbc";
const key = utf8.encode("abcdefgabcdefg12");
const iv = key;

// 加密
const encrypt = data => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  var crypted = cipher.update(data, "utf8", "binary");
  crypted += cipher.final("binary");
  crypted = Buffer.from(crypted, "binary").toString("base64");
  return crypted;
};

// 解密
const decrypt = data => {
  data = Buffer.from(data, "base64").toString("binary");
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  var decoded = decipher.update(data, "binary", "utf8");
  decoded += decipher.final("utf8");
  return decoded;
};

module.exports = {
  encrypt,
  decrypt,
};
