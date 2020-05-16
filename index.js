const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const s3Route = require("./route/S3Route");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/file", s3Route);

const server = app.listen(8080, () => {
  console.log("listening on 8080");
});
