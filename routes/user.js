const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");

module.exports = [
  {
    url: "/api/user/:id",
    method: "put",
    func: [auth, userCtrl.update],
  },
  {
    url: "/api/user/:id",
    method: "delete",
    func: [auth, userCtrl.delete],
  },
];
