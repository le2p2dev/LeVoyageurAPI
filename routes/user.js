const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

module.exports = [
	{
		url: "/api/user/:id",
		method: "put",
		func: [auth, multer, userCtrl.update],
	},
	{
		url: "/api/user/:id",
		method: "delete",
		func: [auth, userCtrl.delete],
	},
	{
		url: "/api/user/:id",
		method: "get",
		func: [auth, userCtrl.getbyId],
	},
	{
		url: "/api/user/:id/file",
		method: "post",
		func: [auth, multer, userCtrl.addUserFile],
	},
	{
		url: "/api/user/:id/file/:fileId",
		method: "delete",
		func: [auth, multer, userCtrl.deleteFile],
	},
];
