const rideCtrl = require("../controllers/rideCtrl");
const auth = require("../middleware/auth");

module.exports = [
  {
    url: "/api/ride",
    method: "get",
    func: rideCtrl.getAll,
  },
  {
    url: "/api/ride/:rideId",
    method: "get",
    func: rideCtrl.getAll,
  },
];
