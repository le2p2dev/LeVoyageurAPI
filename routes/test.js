const express = require("express");

/**
 *  Multer const
 */
const multer = require("multer");
const upload = multer({ dest: "assets/" });

/**
 * Dotenv const
 */
const dotenv = require("dotenv").config();

/**
 * AWS const
 */
const s3 = require("aws-sdk/clients/s3");

/**
 * functions
 */

const { uploadFile } = require("../src/s3.js");

const router = express.Router();

/**
 *
 *
 * TODO :
 *
 * -  I will test here for s3 bucket integrations
 *
 * - add dotenv
 *
 * - add aws sdk
 *
 * -  add .env file
 *
 */

/**
 * @swagger
 * /api/test/image:
 *  post:
 *    summary: upload an image
 *    tags:
 *      - s3 bucket
 *    parameters:
 *      - name: file
 *        type: file
 *        in: formData
 *        required: true
 *      - name: name
 *        type: string
 *        in: formData
 *        required: true
 *    responses:
 *      '200':
 *        description: OK
 */
router.post("/image", upload.single("file"), async (req, res) => {
  //getting file information
  if (req.file && req.body.name) {
    const file = req.file;
    const name = req.body.name;
    const result = await uploadFile(file, name);

    const pathToS3File = result.Location;
    res.status(200);
    res.send({
      status: "200",
      response: pathToS3File,
    });
  } else {
    res.status(400);
    res.send({
      status: "400",
      response: "error in form",
    });
  }
});
module.exports = router;
