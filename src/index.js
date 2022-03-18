const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("../models");
const cors = require('cors')

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
  },
  apis: [`src/index.js`, `routes/*.js`],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/**
 * Dotenv const
 */
const dotenv = require("dotenv").config();

/**
 * routes crée
 */
const routeTest = require("../routes/test.js");
const routeSecurity = require("../routes/security.js");
const routeTrip = require("../routes/trip.js");
const routeStep = require("../routes/step.js");
const routePoi = require("../routes/poi.js");
//const routePoitype = require("../routes/poitype.js");
const s3Bucket = require("./s3.js");

//consts
const PORT = process.env.PORT || 3630;
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", routeSecurity);
app.use("/api/test", routeTest);
app.use("/api/trip", routeTrip);
app.use("/api/step", routeStep);
app.use("/api/poi", routePoi)
//app.use("/api/poitype", routePoitype)

/*
Code below is used to check for token and securise all routes

app.use((req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: "No token given" });
  }
  next();
});

 */

/**
 * @swagger
 * /test:
 *  get:
 *    tags :
 *      - test
 *    decription: test route for exemple purposes
 *    responses:
 *      '200':
 *        description: Success
 */
app.get("/test", (req, res) => {
  res.send("oto");
});

db.sequelize.sync({alter: true}).then(() => {
  app.listen(PORT, () => {
    console.log(`Running on port : http://localhost:${PORT}`);
  });
});
