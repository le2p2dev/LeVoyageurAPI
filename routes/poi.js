const express = require("express");
const bodyParser = require("body-parser");
const db = require("../models");
// const { route } = require("./test");
// const { query } = require("express");

//définition du router
const router = express.Router();

/**
 * @swagger
 * /api/poi/:
 *  post:
 *    summary: create a new point of interest
 *    tags:
 *      - Point Of Interest
 *    parameters:
 *      - name : title
 *        description : title of the trip
 *        in: formData
 *        type: string
 *        required: true
 *      - name : description
 *        description : description of the trip
 *        in: formData
 *        type: string
 *        required: false
 *      - name : longitude
 *        description : longitude of the poi
 *        in : formData
 *        type : number
 *        required: true
 *      - name : latitude
 *        description : latitude of the poi
 *        in : formData
 *        type : number
 *        required : true
 *      - name : poiType
 *        description : type of the poi
 *        in : formData
 *        type : number
 *        required : false
 *      - name : tripId
 *        description : id of the trip which the poi is attached
 *        in : formData
 *        type : number
 *        required : false
 *      - name : stepId
 *        description : id of the step which the poi is attached
 *        in : formData
 *        type : number
 *        required : false
 *    responses:
 *      '200':
 *        description: OK
 */
router.post("/", (req, res) => {
  if (
    req.body.latitude,
    req.body.longitude,
    req.body.title
  ){
    console.log(typeof(req.body.longitude))
    db.Poi.create({
      title: req.body.title,
      description: req.body.description,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    }).then((dataSubmited) => {
      res.send({
        statut: 200,
        response: dataSubmited,
      });
    });
  } else {
    res.status(406).send({
      status: 406,
      response: "problem occured",
    });
  }
});

/**
 * @swagger
 * /api/poi/:
 *  get:
 *    summary: get all pois
 *    tags:
 *      - Point Of Interest
 *    responses:
 *      '200':
 *        description: OK
 */
router.get("/", (req, res) => {
  db.Poi.findAll().then((data) => {
    res.send({
      status: 200,
      response: data,
    });
  });
});

/**
 * @swagger
 * /api/poi/{id} :
 *    get:
 *      summary: get poi by id
 *      tags:
 *        - Point Of Interest
 *      parameters:
 *        - name : id
 *          type: number
 *          in: path
 *          description: id of the poi
 *          required : true
 *      responses:
 *        '200':
 *          description: OK
 *
 */
router.get("/:id", (req, res) => {
  const queryParm = req.params;

  if (queryParm.id) {
    db.Poi.findAll({
      where: {
        id: queryParm.id,
      },
    }).then((data) => {
      res.send({
        status: 200,
        response: data,
      });
    });
  } else {
    res.status(406).send({
      status: 406,
      response: "problem occured",
    });
  }
});

/**
 * @swagger
 * /api/poi/trip/{tripId} :
 *    get:
 *      summary: get all poi by tripId
 *      tags:
 *        - Point Of Interest
 *      parameters:
 *        - name : tripId
 *          type: integer
 *          in: path
 *          description: id of the trip who want all pooi
 *          required : true
 *      responses:
 *        '200':
 *          description: OK
 */
router.get("/trip/:tripId", (req, res) => {
  const queryParm = req.params;

  if (queryParm.tripId) {
    db.Poi.findAll({
      where: {
        TripId: queryParm.tripId,
      },
    }).then((data) => {
      res.send({
        status: 200,
        response: data,
      });
    });
  } else {
    res.status(406).send({
      status: 406,
      response: "problem occured",
    });
  }
});

/**
 * @swagger
 * /api/poi/step/{stepId} :
 *    get:
 *      summary: get all poi by stepId
 *      tags:
 *        - Point Of Interest
 *      parameters:
 *        - name : stepId
 *          type: integer
 *          in: path
 *          description: id of the step who want all pooi
 *          required : true
 *      responses:
 *        '200':
 *          description: OK
 */
router.get("/step/:stepId", (req, res) => {
  const queryParm = req.params;

  if (queryParm.stepId) {
    db.Poi.findAll({
      where: {
        StepId: queryParm.stepId,
      },
    }).then((data) => {
      res.send({
        status: 200,
        response: data,
      });
    });
  } else {
    res.status(406).send({
      status: 406,
      response: "problem occured",
    });
  }
});

/**
 * @swagger
 * /api/poi/:
 *    put:
 *      summary: update poi value 
 *      tags:
 *        - Point Of Interest
 *      parameters:
 *        - name : id
 *          type: integer
 *          in: formData
 *          description: id of the step who want all pooi
 *          required : true
 *        - name : title
 *          type: string
 *          in: formData
 *          description: new title of the poi
 *          required : false
 *        - name : description
 *          type: string
 *          in: formData
 *          description: new description of the poi
 *          required : false
 *        - name : latitude
 *          type: number
 *          in: formData
 *          description: new latitude of the poi
 *          required : false
 *        - name : longitude
 *          type: number
 *          in: formData
 *          description: new longitude of the poi
 *          required : false
 *        - name : stepId
 *          type: number
 *          in: formData
 *          description: new stepId of the poi
 *          required : false
 *        - name : tripId
 *          type: number
 *          in: formData
 *          description: new tripId of the poi
 *          required : false
 *      responses:
 *        '200':
 *          description: OK
 *        '204' : 
 *          description: poi not found 
 */
router.put("/", (req, res) => {

  db.Poi.findOne({
    where: {
      id: req.body.id
    }
  }).then(data => {
    if(data){
      const values = {
        title : req.body.title,
        description : req.body.description,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        StepId: req.body.stepId,
        TripId: req.body.tripID
      }
      console.log("value : " + req.body.longitude, "Type of " +typeof(req.body.longitude))

      data.update(values).then(updateData => {
        console.log(`updated record ${JSON.stringify(updateData,null,2)}`)
      }).then((updateData) => {
        res.send({
          status: 200,
          response: updateData
        })
      })
    } else {
      res.status(204).send()
    }
  })
})
module.exports = router;
