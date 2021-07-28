/** 接口返回内容
 * @param {*} res
 * @param {Number} code 状态码
 * @param {String} msg 提示信息 默认：200
 * @param {Object} data 返回数据 默认：""
 * code = 2** 调取成功
 * 200 提示根据msg判断（手动提示）
 * Notification 消息（自动提示）
 * 201 成功提示
 * 202 警告提示
 * 203 消息提示
 * 204 错误提示
 * Message 消息（自动提示）
 * 205 成功提示
 * 206 警告提示
 * 207 消息提示
 * 208 错误提示
 *
 * code = 4**
 * 400 未登录
 */
const send = (res, code = 200, msg = "", data = "") => {
  let params = { code, msg };
  if (data) {
    params.data = data;
  }
  res.send(params);
};

// 获取用户是否登录
const getLogin = (req, res, msg = "") => {
  let { userId } = req.signedCookies;
  if (!userId) {
    send(res, 400, msg);
  } else {
    return userId;
  }
};

module.exports = {
  send,
  getLogin,
};
