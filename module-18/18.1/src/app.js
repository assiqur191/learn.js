const express = require("express");
const router = require("../src/routes/user.route");
const app = express();

app.use(express.json());

//

app.use("/api/vi", router);

//
app.get("/", (req, res) => {
  console.log("Hello mama");
  res.send("API is running");
});
//
module.exports = app;
