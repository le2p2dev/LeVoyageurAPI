const stepCtrl = require("../controllers/stepCtrl");
const auth = require("../middleware/auth");

module.exports = [
	{
		url: "/api/user/:id/trip/:tripId/step",
		method: "post",
		func: [auth, stepCtrl.create],
	},
	{
		url: "/api/user/:id/trip/:tripId/step/",
		method: "get",
		func: [auth, stepCtrl.getByTrip],
	},
	{
		url: "/api/user/:userId/trip/:tripId/step/:stepId",
		method: "put",
		func: [auth, stepCtrl.update],
	},
	{
		url: "/api/user/:userId/trip/:tripId/step/:stepId",
		method: "delete",
		func: [auth, stepCtrl.delete],
	},
];
