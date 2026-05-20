const express = require("express");
require("dotenv").config();

const multer = require("multer");

const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());
//LOG chek middleware

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  next();
});

//custom-route-middleware
function authMiddleware(req, res, next) {
  const token = req.headers["authorization"];
  if (token === "secret123") {
    next();
  } else {
    res.status(403).send("forbiden");
  }
}

app.get("/protection", authMiddleware, (req, res) => {
  res.send("you are allowed");
});

app.get("/", authMiddleware, (req, res) => {
  res.send("Hellow from HOme");
});

//get request-URL Query
app.get("/search", (req, res) => {
  const { name, cetagory } = req.query;
  //   res.send(`name: ${name} and cetegory :${cetagory}`);
  res.json({ name, cetagory });
  console.log(req.url);
});

//get request header
app.get("/header", (req, res) => {
  const userAgent = req.headers["user-agent"];
  const customHeader = req.headers["x-custom-header"];
  res.json({ userAgent, customHeader });
});

//simple  POSt request
app.post("/search", (req, res) => {
  const { name, cetagory } = req.query;
  //   res.send(`name: ${name} and cetegory :${cetagory}`);
  const customHeader = req.headers["h-header"];
  res.json({ method: req.method, name, cetagory, customHeader });
  console.log(req.url);
});

//post-req-from body ,
app.post("/json", (req, res) => {
  const { name, age } = req.body;
  res.json({ name, age });
});

//working with multipart form data
const storage = multer.diskStorage({
  destination: "Uploads/",
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.array("file"), (req, res) => {
  console.log(req.files);
  res.send("Uploaded succec");
});

//Application MIddleware
//client --------------->MIddleware------------------>server
//HTTP-REQ                   Request

app.listen(port, () => {
  console.log("server is running on port : " + port);
});
