const dayCtrl = require("../controllers/dayCtrl");
const auth = require("../middleware/auth");

module.exports = [
  {
    url: "/api/day",
    method: "get",
    func: dayCtrl.getAll,
  },
  {
    url: "/api/day/:dayId",
    method: "get",
    func: dayCtrl.getById,
  },
  {
    url: "/api/user/:id/trip/:tripId/step/:stepId/day/",
    method: "get",
    func: [auth, dayCtrl.getByStep],
  },
  {
    url: "/api/user/:id/trip/:tripId/day/",
    method: "get",
    func: [auth, dayCtrl.getByTrip],
  },
  {
    url: "/api/user/:id/trip/:tripId/step/:stepId/day/",
    method: "post",
    func: [auth, dayCtrl.create],
  },
  {
    url: "/api/user/:id/trip/:tripId/step/:stepId/day/:dayId",
    method: "put",
    func: [auth, dayCtrl.update],
  },
];
