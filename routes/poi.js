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
    func: [auth, poiCtrl.getByDay],
  },
  {
    url: "/api/user/:id/trip/:tripId/day/:dayId/poi",
    method: "get",
    func: [auth, poiCtrl.getByTrip],
  },
  {
    url: "/api/user/:id/trip/:tripId/poi",
    method: "post",
    func: [auth, poiCtrl.create],
  },
  {
    url: "/api/user/:id/trip/:tripId/poi/:poiId",
    method: "put",
    func: [auth, poiCtrl.update],
  },
  {
    url: "/api/user/:id/trip/:tripId/poi/:poiId",
    method: "delete",
    func: [auth, poiCtrl.delete],
  },
  {
    url: "/api/user/:id/trip/:tripId/step/:stepId/poi/:poiId",
    method: "put",
    func: [auth, poiCtrl.deleteFromStep],
  },
];
