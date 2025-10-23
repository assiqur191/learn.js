// #javascript object & jason--------------------------------------->

let person = {
  firstname: "sayem",
  lastname: "rahman",
  age: 32,
  isdeveloper: true,
};
// console.log(person);
// console.log(person["firstname"]);
           // add in the object
// person.country = "bangladesh";  
// person.age ="45";         
// // console.log(person);

// let personkey= Object.keys(person);
// console.log(personkey);

// let personvalues = Object.values(person);
// console.log(personvalues);

// let personentris = Object.entries(person);
// console.log(personentris);
                     
      //---------->#jason<-------------
      //( 1,inside a API json make comunication with forntend and backend )(js object notation= json)
         
      let student= {
        name:"sagor",
        age : 50,
        country : "bidesh",
      }
    //   console.log(student);

    let studentjson = JSON.stringify(student);
    console.log(studentjson);
    let datajson= JSON.parse(studentjson);
    console.log(datajson); 



// #js array
// #strings and string operatons.
// #javascript data
// #math, Number ,
// #window object,
// #navigator object
