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
    console.log("object :>> ", req.body);
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
  router.get("/getLogin", (req, res) => {
    getLogin(req, res);
  });

  // 退出登录
  router.post("/logout", (req, res) => {
    res.clearCookie("userId");
    send(res, 400, "用户退出成功");
  });

  // 获取用户信息
  router.get("/getUser", (req, res) => {
    const phone = getLogin(req, res);
    UserModel.findOne(
      { phone: decrypt(phone) },
      { _id: false, password: false }
    ).then(data => {
      if (data) {
        data.phone = phone;
        send(res, 200, "", data);
      } else {
        send(res, 204, "获取用户信息有误");
      }
    });
  });

  // 获取用户列表
  router.get("/getUserList", (req, res) => {
    getLogin(req, res);
    const { page, pageSize } = req.query;
    console.log("page, pageSize :>> ", page, pageSize);
    UserModel.find({ phone: { $ne: "admin" } })
      .countDocuments()
      .then(total => {
        const skip = (page - 1) * pageSize;
        const limit = pageSize * 1;
        UserModel.find(
          { phone: { $ne: "admin" } },
          { _id: false, password: false },
          { skip: skip, limit: limit }
        ).then(data => {
          if (data) {
            data.forEach(item => {
              item.phone = encrypt(item.phone);
            });
            const params = {
              list: data,
              total,
            };
            send(res, 200, "", params);
          } else {
            send(res, 204, "获取用户列表失败");
          }
        });
      });
  });
};
