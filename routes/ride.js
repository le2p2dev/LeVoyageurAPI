const rideCtrl = require("../controllers/rideCtrl");
const auth = require("../middleware/auth");

module.exports = [
	{
		url: "/api/user/:userId/trip/:tripId/ride",
		method: "get",
		func: [auth, rideCtrl.getAllByTrip],
	},
	{
		url: "/api/user/:userId/trip/:tripId/ride/",
		method: "put",
		func: [auth, rideCtrl.getAllByTrip],
	},
];
