const { error } = require("console");
const fs = require("fs");

// //-------------------------READ FILE node.js-------------------------------
// //------------------------syncronize way
// // const data = fs.readFileSync("file.txt", "utf8"); // blocking
// // console.log(data);
// // console.log("this log file read");
// //------------------------asyncronize way
// fs.readFile("file.txt", "utf8", (error, data) => {
//   if (error) throw error;
//   console.log(data);
// });
// console.log("this is acyncronize way thats why comes first");
// //-------------------------WriteFILE--------------------

// //---asyn
// fs.writeFile("output.txt", "\nI am from acyn22", (error) => {
//   if (error) throw error;
//   console.log("succes");
// });
// //---sync
// fs.writeFileSync("output.txt", "\n i am from sync");
//-----------------append file----------------
// -----async
// fs.appendFile("newoutput.txt", "\n hi append from async", (error) => {
//   if (error) throw error;
//   console.log("succes append async");
// });
// //----sync
// fs.appendFileSync("newoutput.txt", "\n hi append from sync ");
// console.log("done append sync");

// //##--------------------DELETE file
// //--async
// fs.unlink("newoutput.txt", (error) => {
//   if (error) throw error;
//   console.log("delete doen async");
// });
// //--sycnc
// fs.unlinkSync("newoutput.txt");
// console.log("delete done sync");
//-------------------- Rename file
//---- async
// fs.rename("output.txt", "logfile.txt", (error) => {
//   if (error) throw error;
//   console.log("rename async");
// });
//---------------------file cheacking
//----async
fs.access("newoutput.txt", fs.constants.F_OK, (error) => {
  if (error) {
    console.log("file Dose not exicst");
  } else {
    console.log("file Exist");
  }
});
//----sync
fs.accessSync("newoutput.txt", fs.constants.F_OK);
