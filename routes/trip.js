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
		url: "/api/user/:id/trip/:idTrip",
		method: "get",
		func: [auth, tripCtrl.getById],
	},
	{
		url: "/api/user/:id/trip/",
		method: "get",
		func: [auth, tripCtrl.getByUser],
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
];
