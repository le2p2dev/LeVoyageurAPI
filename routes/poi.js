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
  //   {
  //     url: "/api/user/:id/trip/:tripId/step/:stepId/day/",
  //     method: "get",
  //     func: [auth, poiCtrl.getByStep],
  //   },
  {
    url: "/api/user/:id/trip/:tripId/day/:dayId/poi",
    method: "get",
    func: [auth, poiCtrl.getByTrip],
  },
  {
    url: "/api/user/:id/trip/:tripId/step/:stepId/day/",
    method: "post",
    func: [auth, poiCtrl.create],
  },
  {
    url: "/api/user/:id/trip/:tripId/step/:stepId/day/:dayId",
    method: "put",
    func: [auth, poiCtrl.update],
  },
];
