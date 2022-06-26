const testCtrl = require("../controllers/testCtrl");

module.exports = [
  {
    url: "/api/user/:id/test",
    method: "get",
    func: testCtrl.test,
  },
];
