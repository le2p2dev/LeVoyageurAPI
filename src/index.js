const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("../models");
const cors = require('cors')
const path = require("path");
/**
 * Swagger doc
 */
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const swaggerOptions = {
	swaggerDefinition: {
		info: {
			title: "LeVoyageur",
			description: "leVoyageur Documentation",
			contact: {
				name: "TOTO",
			},
			servers: ["http://localhost:3630/"],
		},
		securityDefinitions: {
			bearerAuth: {
				type: "apiKey",
				name: "Authorization",
				scheme: "bearer",
				in: "header",
				bearerFormat: "JWT",
			},
		},
	},
	apis: [`src/index.js`, `documentation/*.yaml`],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/**
 * Dotenv const
 */
const dotenv = require("dotenv").config();

//consts
const PORT = process.env.PORT || 3630;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//************ Middleware de préparation de la requete ************//
app.use("/api/user/:id/", (req, res, next) => {
	const userMiddleware = require("../middleware/loadUser");
	userMiddleware.loadUser(req, res, next);
});

app.use("/api/user/:id/trip/:tripId", (req, res, next) => {
	const tripMiddleware = require("../middleware/loadTrip");
	tripMiddleware.loadTrip(req, res, next);
});

app.use("/api/user/:id/trip/:tripId/step/:stepId", (req, res, next) => {
	const stepMiddleware = require("../middleware/loadStep");
	stepMiddleware.loadStep(req, res, next);
});

app.use("/api/user/:id/trip/:tripId/ride/:rideId", (req, res, next) => {
	const rideMiddleware = require("../middleware/loadRide");
	rideMiddleware.loadRide(req, res, next);
});

app.use("/api/user/:id/trip/:tripId/poi/:poiId", (req, res, next) => {
	const poiMiddleware = require("../middleware/loadPoi");
	poiMiddleware.loadPoi(req, res, next);
});

app.use(
	"/api/user/:id/trip/:tripId/step/:stepId/day/:dayId/",
	(req, res, next) => {
		const dayMiddleware = require("../middleware/loadDay");
		dayMiddleware.loadDay(req, res, next);
	}
);

app.use(
	"/api/user/:id/trip/:tripId/step/:stepId/day/:dayId/poi/:poiId",
	(req, res, next) => {
		const poiMiddleware = require("../middleware/loadPoi");
		poiMiddleware.loadPoi(req, res, next);
	}
);

app.use("/api/user/:id/trip/:tripId/journal", (req, res, next) => {
	const journalMiddleware = require("../middleware/loadJournal");
	journalMiddleware.loadJournal(req, res, next);
});

app.use("/images", express.static(path.join(__dirname, "../images")));

//************ Import des routes ************//
require("../routes")(app);

//************ Middleware de gestion d'erreur ************//
app.use((err, req, res, next) => {
  const error = require("../middleware/error");
  error(err, req, res, next);
});

db.sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Running on port : http://localhost:${PORT}`);
  });
});
