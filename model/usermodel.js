const mongoose = require("mongoose");
//描述的文档结构  schema
//required  设置为必要   default 初始值
const userSchema = new mongoose.Schema({
  /**
   * phone 手机号（注册账号）
   * password 密码
   * email 邮箱
   * username 昵称
   * name 姓名
   * sex 性别
   * idcard 身份证号
   * image 头像
   * time 注册时间/更新时间
   */
  phone: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, default: "" },
  username: { type: String, default: "" },
  name: { type: String, default: "" },
  sex: { type: String, default: "" },
  idcard: { type: String, default: "" },
  image: { type: Array, default: [] },
  time: { type: Number, default: Date.now },
});
// 定义model 与集合对应  操作集合user
const UserModel = mongoose.model("users", userSchema);
//初始化超级管理员
UserModel.findOne({ phone: "admin" }).then(user => {
  if (!user) {
    UserModel.create({
      phone: "admin",
      password: "admin",
    }).then(user => {
      console.log("初始化的账号为admin，密码同为admin");
    });
  }
});
module.exports = UserModel;
