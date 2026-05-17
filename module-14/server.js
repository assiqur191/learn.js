const express = require("express");

const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.json());
//getting string response
app.get("/", (req, res) => {
  res.send("Hellow world");
});
//getting json res
app.get("/user", (req, res) => {
  res.json([
    {
      name: "sayem",
      age: 25,
    },
    {
      name: "rakib",
      age: 24,
    },
  ]);
});
//status response
app.get("/not-found", (req, res) => {
  res.status(404).send("not found");
});
//redirect response
app.get("/redirect", (req, res) => {
  res.redirect("https://www.google.com/");
});
//grab from header
app.get("/custom-header", (req, res) => {
  res.set("x-custom-header", "Express Deom");
  res.send("header-grabed");
});
//set cookie
app.get("/cookie-set", (req, res) => {
  res.cookie("token", "ahsdfjeier4", { httpOnly: true });
  res.send("cookie set!");
});
//cookie remove
app.get("/cookie-remove", (req, res) => {
  res.clearCookie("token");
  res.send("cookie remove!");
});
//-------------------------------Working with rewquest
//------------> Uniq Quary
app.get("/search", (req, res) => {
  const { name, age } = req.query;
  res.json({ name, age });
});
//----------->using Params
app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  res.send(`user id : ${id}`);
});
//grabing response from body(json)
app.post("/submit", (req, res) => {
  console.log(req.body);
  const { name, email } = req.body;
  res.send(`Recive : ${name}, and email ${email}`);
});

app.listen(PORT, () => {
  console.log(`server is Running on posrt : ${PORT}`);
});
