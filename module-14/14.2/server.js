const express = require("express");
const multter = require("multer");
const upload = multter({ dest: "upload/" });
const app = express();

require("dotenv").config(); //install dotenv from npm=> and requried to activate the .env file.

app.get("/", (req, res) => {
  res.send("Hello from home");
});

app.post("/api/upload", upload.array("files"), (req, res) => {
  res.send("multiple file Uplodate");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("server is runing on " + port);
});
