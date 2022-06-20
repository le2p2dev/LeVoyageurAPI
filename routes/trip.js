const tripCtrl = require("../controllers/tripCtrl");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

module.exports = [
	{
		url: "/api/user/:id/trip/",
		method: "post",
		func: [auth, multer, tripCtrl.create],
	},
	{
		url: "/api/user/:id/trip/",
		method: "get",
		func: [auth, tripCtrl.getByUser],
	},
	{
		url: "/api/user/:id/trip/:tripId",
		method: "get",
		func: [auth, tripCtrl.getById],
	},
	{
		url: "/api/user/:id/trip/:tripId",
		method: "put",
		func: [auth, tripCtrl.update],
	},
	{
		url: "/api/user/:id/trip/:tripId",
		method: "delete",
		func: [auth, tripCtrl.delete],
	},
	{
		url: "/api/user/:id/trip/:tripId/users",
		method: "get",
		func: [auth, tripCtrl.getUserFromTrip],
	},
	{
		url: "/api/user/:id/trip/:tripId/file",
		method: "post",
		func: [auth, multer, tripCtrl.addFile],
	},
	{
		url: "/api/user/:id/trip/:tripId/file/:fileId",
		method: "delete",
		func: [auth, multer, tripCtrl.deleteFile],
	},
];
