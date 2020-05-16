const express = require("express");
const s3FileController = require("../services/S3FileController");
const router = express.Router();

router.post("/upload-single-image", (req, res) => {
  const upload = s3FileController.uploadSingleFile.single("image");
  upload(req, res, (err) => {
    if (err) {
      return res.json({ code: "file upload error", message: err.message });
    }
    return res.json({ imgUrl: req.file.location });
  });
});

router.get("/all-images", (req, res) => {
  s3FileController
    .getAllFiles()
    .catch((err) => {
      res.json({ err: err });
    })
    .then((data) => {
      res.json({ data: data.Contents });
    });
});

router.delete("/delete-single-image", (req, res) => {
  s3FileController
    .deleteSingleFile(req.body.Key)
    .catch((err) => {
      res.status(400).json({ err: err });
    })
    .then((data) => {
      res.status(200).json({ message: "success", data });
    });
});

router.delete("/delete-multiple-images", (req, res) => {
  s3FileController
    .deleteMultipleFiles(req.body)
    .catch((err) => {
      res.status(400).json({ err: err });
    })
    .then((data) => {
      res.status(200).json({ message: "success", data });
    });
});

module.exports = router;
