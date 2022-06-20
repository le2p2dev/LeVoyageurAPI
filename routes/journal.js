const journalCtrl = require("../controllers/journalCtrl");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

module.exports = [
	{
		url: "/api/user/:userId/trip/:tripId/journal",
		method: "get",
		func: [auth, journalCtrl.getAllJournal],
	},
	{
		url: "/api/user/:userId/trip/:tripId/journal",
		method: "post",
		func: [auth, journalCtrl.create],
	},
	// {
	// 	url: "/api/user/:userId/trip/:tripId/ride/:rideId/file",
	// 	method: "post",
	// 	func: [auth, multer, rideCtrl.addFile],
	// },
	// {
	// 	url: "/api/user/:userId/trip/:tripId/ride/:rideId/file/:fileId",
	// 	method: "delete",
	// 	func: [auth, multer, rideCtrl.deleteFile],
	// },
];
