const UserModel = require("../model/usermodel");
const { send, getLogin } = require("../utils");
const { encrypt, decrypt } = require("../crypto");

module.exports = router => {
  // 注册
  router.post("/register", (req, res) => {
    const { phone, password } = req.body;
    UserModel.findOne({ phone: decrypt(phone) }).then(data => {
      if (data) {
        send(res, 203, "该手机号已注册");
      } else {
        const params = {
          phone: decrypt(phone),
          password: decrypt(password),
        };
        UserModel.create(params)
          .then(() => {
            send(res, 201, "注册成功");
          })
          .catch(() => {
            send(res, 204, "注册异常");
          });
      }
    });
  });

  // 登录
  router.post("/login", (req, res) => {
    res.clearCookie("userId");
    const { phone, password } = req.body;
    UserModel.findOne({ phone: decrypt(phone) }).then(data => {
      if (data) {
        if (data.password === decrypt(password)) {
          // cookie
          let date = new Date();
          date.setDate(date.getDate() + 30);
          res.cookie("userId", phone, {
            expires: date,
            httpOnly: true,
            signed: true, // 加密
          });
          send(res, 201, "登录成功");
        } else {
          send(res, 202, "密码错误");
        }
      } else {
        send(res, 200, "该手机号暂未注册，是否前往注册。");
      }
    });
  });

  // 用户是否登录
  router.post("/getLogin", (req, res) => {
    getLogin(req, res);
  });

  // 退出登录
  router.post("/logout", (req, res) => {
    res.clearCookie("userId");
    getLogin(req, res, "用户退出成功");
  });

  // 获取用户信息
  router.post("/getUser", (req, res) => {
    const phone = getLogin(req, res);
    UserModel.findOne({ phone: decrypt(phone) }).then(data => {
      if (data) {
        data.phone = phone;
        send(res, 200, "", data);
      } else {
        send(res, 204, "获取用户信息有误");
      }
    });
  });
};
