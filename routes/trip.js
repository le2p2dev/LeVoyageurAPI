const express = require("express");
const bodyParser = require("body-parser");
const db = require("../models");
const { route } = require("./test");
const { query } = require("express");

//définition du router
const router = express.Router();

router.post("/", (req, res) => {
  if (
    req.body.title
  ){
    db.Trip.create({
      title: req.body.title,
      description: req.body.description,
      backgroundUrl: req.body.backgroundUrl,
      startDate: req.body.startDate
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

router.get("/", (req, res) => {
  db.Trip.findAll().then((data) => {
    res.send({
      status: 200,
      response: data,
    });
  });
});

router.get("/:id", (req, res) => {

  if (req.params.id) {
    db.Trip.findAll({
      where: {
        id: req.params.id,
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

router.delete("/:id", (req, res) => {
  if (req.params.id) {
    db.Trip.destroy({
      where: {
        id: req.params.id,
      },
    }).then(() => {
      res.send({
        status: 200,
        response: "success",
      });
    });
  }
});

router.put('/:id', (req, res) => {
  db.Trip.findOne({
    where: {
      id: req.params.id
    }
  }).then(data => {
    if(data){
      const values = {
        title : req.body.title,
        description: req.body.description,
        backgroundUrl: req.body.backgroundUrl,
        startDate: req.body.startDate
      }

      data.update(values).then(updateData => {
        console.log(`updated record ${JSON.stringify(updateData,null,2)}`)
      }).then((updateData) => {
        res.send({
          status: 200,
          response: updateData
        })
      })
    } else {
      res.status(404).send()
    }
  })
})

module.exports = router;
