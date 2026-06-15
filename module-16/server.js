/* 
 -mian run server
 -listen all routes
*/

import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();
const port = process.env.PORT || 4000;

// all routes
//app.user('api/user',ourRoute)

//listening
app.listen(port, () => {
  console.log(`server is runnig on ${port}`);
});
