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
];
