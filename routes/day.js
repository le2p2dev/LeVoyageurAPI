const dayCtrl = require("../controllers/dayCtrl");
const auth = require("../middleware/auth");

module.exports = [
	{
		url: "/api/user/:id/trip/:tripId/step/:stepId/day/",
		method: "get",
		func: [auth, dayCtrl.getByStep],
	},
	{
		url: "/api/user/:id/trip/:tripId/step/:stepId/day/:dayId",
		method: "get",
		func: [auth, dayCtrl.getById],
	},
	{
		url: "/api/user/:id/trip/:tripId/day/",
		method: "get",
		func: [auth, dayCtrl.getByTrip],
	},
	{
		url: "/api/user/:id/trip/:tripId/step/:stepId/day/:dayId",
		method: "put",
		func: [auth, dayCtrl.update],
	},
	{
		url: "/api/user/:id/trip/:tripId/step/:stepId/day/",
		method: "delete",
		func: [auth, dayCtrl.deleteAll],
	},
	{
		url: "/api/user/:id/trip/:tripId/step/:stepId/day/:number",
		method: "delete",
		func: [auth, dayCtrl.deleteDay],
	},
];