// 处理上传文件
const multer = require("multer");
const path = require("path");
// fs   filesystem   文件系统
const fs = require("fs");
//存放上传图片的文件夹 路径
const dirPath = path.join(__dirname, "./public/upload");

const storage = multer.diskStorage({
  //distination   "upload"  服务启动会自动创建文件夹
  destination: function (req, file, cb) {
    if (!fs.existsSync(dirPath)) {
      //判断  文件夹是否存在
      fs.mkdir(dirPath, { recursive: true }, err => {
        //不管文件夹 “/public” 是否存在都会创建  “/public/upload”
        if (err) {
          console.log(err);
        } else {
          cb(null, dirPath);
        }
      });
    } else {
      cb(null, dirPath);
    }
  },
  filename: function (req, files, cb) {
    //获取文件后缀名
    var ext = path.extname(files.originalname);
    cb(null, files.fieldname + "-" + Date.now() + ext);
  },
});
// 将配置注入multer中
const upload = multer({ storage });
// 定义上传文件类型
const uploadSingle = upload.array("file"); //处理上传文件file  single单个图片   array(,可以定义个数)  多个图片
module.exports = function fileUpload(router) {
  // 上传图片
  router.post("/img/upload", (req, res) => {
    uploadSingle(req, res, function (err) {
      //req 经过了multer的处理  解析了file并添加了file的内容
      if (err) {
        res.send({ zt: "图片上传失败" });
      }
      var imgData = [];
      req.files.forEach(function (i) {
        imgData.push({
          name: i.filename,
          url: "http://localhost:3000/public/upload/" + i.filename,
        });
      });
      res.send({ zt: "上传成功", code: 0, data: imgData });
    });
  });
  // 删除图片
  router.post("/img/delete", (req, res) => {
    const { name } = req.body;
    fs.unlink(path.join(dirPath, name), err => {
      if (err) {
        res.send({ zt: "删除图片失败" });
      } else {
        res.send({ zt: "删除图片成功", code: 0 });
      }
    });
  });
};
