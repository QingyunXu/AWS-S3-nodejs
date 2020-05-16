const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
// const config = require("./config.json");
const config = require("./sampleConfig.json");

aws.config.update({
  secretAccessKey: config.secretAccessKey,
  accessKeyId: config.accessKeyId,
  region: config.region,
});

const s3 = new aws.S3();
const Bucket = "sample-bucket-upload-image"; // your bucket name here

const getAllFiles = async () => {
  try {
    return await s3.listObjectsV2({ Bucket }).promise();
  } catch (err) {
    return err;
  }
};

const deleteSingleFile = async (Key) => {
  try {
    return await s3.deleteObject({ Bucket, Key }).promise();
  } catch (err) {
    return err;
  }
};

const deleteMultipleFiles = async (Objects) => {
  const params = { Bucket, Delete: { Objects, Quiet: false } };
  try {
    return s3.deleteObjects(params).promise();
  } catch (err) {
    return err;
  }
};

const uploadSingleFile = multer({
  fileFilter: (req, file, cb) => {
    if (
      file.originalname.includes(".jpeg") ||
      file.originalname.includes(".jpg") ||
      file.originalname.includes(".png")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid Mime Type, only JPG, JEPG and PNG", false));
    }
  },
  limits: { files: 1, fileSize: 1024 * 1024 },
  storage: multerS3({
    s3,
    bucket: Bucket,
    acl: "public-read",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: "file_metadata" });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + file.originalname);
    },
  }),
});

module.exports = {
  uploadSingleFile,
  getAllFiles,
  deleteSingleFile,
  deleteMultipleFiles,
};
