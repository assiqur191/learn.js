const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);
// const dns = require("dns");
// dns.setDefaultResultOrder("ipv4first");

const express = require("express");

const app = express();
const port = process.env.PORT;

// app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.effkbfn.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    console.log("not connected with server");
    // await client.close();
  }
}
run().catch(console.dir);

// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASS);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
