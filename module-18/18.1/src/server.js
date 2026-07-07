const dotenv = require("dotenv");
const app = require("./app");
const cors = require("cors");
const connectDB = require("../src/config/db");

require("dotenv").config();

app.use(cors());

const port = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`server is running on ${port}`);
  });
});
