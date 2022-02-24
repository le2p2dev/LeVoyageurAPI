/**
 * AWS const
 */
const S3 = require("aws-sdk/clients/s3");

/**
 * Fs const
 */
const fs = require("fs");

/**
 * Dotenv const
 */
require("dotenv").config();

const region = process.env.AWS_REGION_NAME;
const bucketName = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.AWS_KEY_ACCESS;
const secretAccessKey = process.env.AWS_KEY_ACCESS_SECRET;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

//uploads file to s3
function uploadFile(file, name) {
  const fileStream = fs.createReadStream(file.path);
  const filename = name;
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
}
exports.uploadFile = uploadFile;

//dowload file from s3
