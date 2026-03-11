//import {add} from "./index.js";
//  const add = required ("./index.js");

// console.log(add(20, 30));

// const express = require("express");

// const app = express();

// app.get('/', (req, res) => {
//     res.send("Hellow World");
// });

// app.get("/greet", (req, res) => {
//     const name = req.query.name || "GUEST";
//     res.send(`HEllo ${name}`);
// });

// app.listen(3000, () => {
//     console.log("Server is runing on 3000");
// });
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
    "access-control-allow-origin": "*",
  });
  res.end(JSON.stringify(users));
});

server.listen(3000, () => {
  console.log("server is runintg 3000");
});
