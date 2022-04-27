const securityCtrl = require("../controllers/securityCtrl");

module.exports = [
  {
    url: "/api/login",
    method: "post",
    func: securityCtrl.login,
  },
  {
    url: "/api/signup",
    method: "post",
    func: securityCtrl.signup,
  },
  // {
  //   url: "/api/whoami",
  //   method: "get",
  //   func: securityCtrl.whoami,
  // },
];
