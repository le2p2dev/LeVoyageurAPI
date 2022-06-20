const rideCtrl = require("../controllers/rideCtrl");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

module.exports = [
	{
		url: "/api/user/:userId/trip/:tripId/ride",
		method: "get",
		func: [auth, rideCtrl.getAllByTrip],
	},
	{
		url: "/api/user/:userId/trip/:tripId/ride/:rideId",
		method: "put",
		func: [auth, rideCtrl.update],
	},
	{
		url: "/api/user/:userId/trip/:tripId/ride/:rideId/file",
		method: "post",
		func: [auth, multer, rideCtrl.addFile],
	},
	{
		url: "/api/user/:userId/trip/:tripId/ride/:rideId/file/:fileId",
		method: "delete",
		func: [auth, multer, rideCtrl.deleteFile],
	},
];
