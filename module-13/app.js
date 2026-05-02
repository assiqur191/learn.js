import { add } from "./index.js";
const add = required("./index.js");

console.log(add(20, 30));

const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hellow World");
});

app.get("/greet", (req, res) => {
  const name = req.query.name || "GUEST";
  res.send(`HEllo ${name}`);
});

app.listen(3000, () => {
  console.log("Server is runing on 3000");
});
// ---------------http client--------------

const http = require("http");

const users = [
  {
    id: 1,
    name: "Fahim",
    email: "fahimasraf43@gmail.com",
  },

  {
    id: 2,
    name: "Rakib asraf",
    email: "Rkibmagi420@gmail.com",
  },
];

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "content-Type": "application/json",
    "access-control-allow-origin": "*", //allowing - block requests between different origins (frontend, backend)
  });
  res.end(JSON.stringify(users));
});

server.listen(3000, () => {
  console.log("server is runintg 3000");
});

//------------------------- URL Description-------------
const url = require("url");
const myUrl = new URL("http://ostad.app:8080/pathname?search=query#hash");
console.log(myUrl.hostname);
console.log(myUrl.port);
console.log(myUrl.pathname);
