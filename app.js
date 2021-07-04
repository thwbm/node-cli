const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
const router = require("./router/index");

const app = express();
// 签名：123456（对应cookie加密设置）
app.use(cookieParser("123456"));

//处理post请求
app.use(express.urlencoded({ extended: false })); //express自带
app.use(express.json());

//处理静态资源   响应图片请求
const static = path.resolve(__dirname, "/public/upload");
app.use(express.static(static));
app.get("/public/upload/*", function (req, res) {
  res.sendFile(__dirname + "/" + req.url);
});

// 取消mongoose弃用提示
mongoose.set("useFindAndModify", false);

app.use(router);
mongoose
  .connect("mongodb://127.0.0.1:27017/thwMongodb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("数据库连接成功");
    app.listen(4000, () => {
      console.log("服务器启动成功");
    });
  })
  .catch(err => {
    console.log("数据库连接失败");
  });
