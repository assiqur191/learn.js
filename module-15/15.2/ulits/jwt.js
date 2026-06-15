//jwt tokken create and manupulate
//JWT has three 3 Parts -> Header, Payload, Signature(secret);
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const user = { id: 1, name: "masfiq" };
const secret = crypto.randomBytes(32).toString("hex");

const token = jwt.sign(user, secret, { expiresIn: "2m" });

console.log("Token:- ", token);
console.log("secret is", secret);

/// verify the token
const decode = jwt.verify(token, secret);

console.log("jwt token verifyed: ", decode);
