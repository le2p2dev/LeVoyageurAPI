const tripCtrl = require("../controllers/tripCtrl");
const auth = require("../middleware/auth");

module.exports = [
  {
    url: "/api/trip/",
    method: "get",
    func: [tripCtrl.getAll],
  },
  {
    url: "/api/trip/:idTrip",
    method: "get",
    func: [tripCtrl.getById],
  },
  {
    url: "/api/user/:id/trip/",
    method: "post",
    func: [auth, tripCtrl.create],
  },
  {
    url: "/api/user/:id/trip/",
    method: "get",
    func: [auth, tripCtrl.getByUser],
  },
  {
    url: "/api/user/:id/trip/:tripId",
    method: "put",
    func: [auth, tripCtrl.update],
  },
];
