const multer = require("../middleware/multer-config");
const poiCtrl = require("../controllers/poiCtrl");
const auth = require("../middleware/auth");

module.exports = [
	{
		url: "/api/user/:id/trip/:tripId/step/:stepId/day/:dayId/poi",
		method: "get",
		func: [auth, poiCtrl.getByDay],
	},
	{
		url: "/api/user/:id/trip/:tripId/poi/:poiId",
		method: "get",
		func: [auth, poiCtrl.getById],
	},
	{
		url: "/api/user/:id/trip/:tripId/poi/:poiId",
		method: "delete",
		func: [auth, poiCtrl.delete],
	},
	{
		url: "/api/user/:id/trip/:tripId/poi/",
		method: "post",
		func: [auth, poiCtrl.create],
	},
	{
		url: "/api/user/:id/trip/:tripId/step/:stepId/poi",
		method: "get",
		func: [auth, poiCtrl.getByStep],
	},
	{
		url: "/api/user/:id/trip/:tripId/poi",
		method: "get",
		func: [auth, poiCtrl.getByTrip],
	},
	{
		url: "/api/user/:id/trip/:tripId/step/:stepId/poi",
		method: "post",
		func: [auth, poiCtrl.create],
	},
	{
		url: "/api/user/:id/trip/:tripId/step/:stepId/poi/:poiId",
		method: "put",
		func: [auth, poiCtrl.update],
	},
	{
		url: "/api/user/:id/trip/:tripId/poi/:poiId",
		method: "put",
		func: [auth, poiCtrl.update],
	},
	{
		url: "/api/user/:id/trip/:tripId/step/:stepId/poi/:poiId",
		method: "delete",
		func: [auth, poiCtrl.delete],
	},
	{
		url: "/api/user/:id/trip/:tripId/poi/:poiId/file",
		method: "post",
		func: [auth, multer, poiCtrl.addFile],
	},
	{
		url: "/api/user/:id/trip/:tripId/poi/:poiId/file/:fileId",
		method: "delete",
		func: [auth, multer, poiCtrl.deleteFile],
	},
	{
		url: "/api/user/:id/trip/:tripId/step/:stepId/poi/:poiId",
		method: "put",
		func: [auth, poiCtrl.deleteFromStep],
	},
	{
		url: "/api/user/:id/trip/:tripId/step/:stepId/poi/:poiId/file",
		method: "post",
		func: [auth, multer, poiCtrl.addFile],
	},
	{
		url: "/api/user/:id/trip/:tripId/step/:stepId/poi/:poiId/file/:fileId",
		method: "delete",
		func: [auth, multer, poiCtrl.deleteFile],
	},
];
