const express = require("express");
const router = express.Router();
const qs = require("qs");
//允许跨域
router.all("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods", "get,path,post,delete");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  // 继续执行后续代码
  next();
});

require("./users")(router);

module.exports = router;
