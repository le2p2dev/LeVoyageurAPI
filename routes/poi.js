const poiCtrl = require("../controllers/poiCtrl");
const auth = require("../middleware/auth");

module.exports = [
  {
    url: "/api/poi",
    method: "get",
    func: poiCtrl.getAll,
  },
  {
    url: "/api/poi/:poiId",
    method: "get",
    func: poiCtrl.getById,
  },
  {
    url: "/api/user/:id/trip/:tripId/poi",
    method: "get",
    func: [auth, poiCtrl.getByTrip],
  },
  {
    url: "/api/user/:id/trip/:tripId/day/:dayId/poi",
    method: "get",
    func: [auth, poiCtrl.getByTrip],
  },
  {
    url: "/api/user/:id/trip/:tripId/step/:stepId/day/:dayId/poi",
    method: "post",
    func: [auth, poiCtrl.create],
  },
  {
    url: "/api/user/:id/trip/:tripId/step/:stepId/day/:dayId/poi/:poiId",
    method: "put",
    func: [auth, poiCtrl.update],
  },
];
