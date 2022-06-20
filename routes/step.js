const stepCtrl = require("../controllers/stepCtrl");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

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
		url: "/api/user/:id/trip/:tripId/step/:stepId",
		method: "get",
		func: [auth, stepCtrl.getById],
	},
	{
		url: "/api/user/:id/trip/:tripId/step/:stepId",
		method: "put",
		func: [auth, stepCtrl.update],
	},
	{
		url: "/api/user/:id/trip/:tripId/step/:stepId",
		method: "delete",
		func: [auth, stepCtrl.delete],
	},
	{
		url: "/api/user/:id/trip/:tripId/step/:stepId/file",
		method: "post",
		func: [auth, multer, stepCtrl.addFile],
	},
	{
		url: "/api/user/:id/trip/:tripId/step/:stepId/file/:fileId",
		method: "delete",
		func: [auth, multer, stepCtrl.deleteFile],
	},
];
