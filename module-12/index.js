// <------Object orianted programming concept: 

//  let user = {
//     name:"fahim",
//     age : 25,
//     greet(){
//         console.log(`hello ${this.name} . your age is ${this.age}`);
//     }
//  }

//  user.greet();
//   <---------instance(copy from object , create from contructor or class)

        // function Person(name){
        //     this.name = name;//working as constructor

        // }
        // const p1 = new Person("sadia");
        // const p2 = new Person("Monane");
        // console.log(p2 instanceof Person);
        // console.log(p1);
        
//<---------- after ES6->>>>>>>
        // class Animal{
        //     speak(){
        //         console.log("dog speak");
        //     }
        // }
        
        // const d1 = new Animal();
        // const d2 = new Animal();
        // d1.speak();
        // d2.speak();
//<-------------Constructor in Class------------->

class Person{
    constructor(name, balance){
        this.name = name;
        this.balance = balance;
    }
    info(amount){
        this.balance += amount;
        console.log(`Hello ${this.name} and your Balance is ${this.balance}`);
    }
}
const acc1= new Person("rahman", 500);
acc1.info(200);