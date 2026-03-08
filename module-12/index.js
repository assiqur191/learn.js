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

// class Person{
//     constructor(name, balance){
//         this.name = name;
//         this.balance = balance;
//     }
//     info(amount){
//         this.balance += amount;
//         console.log(`Hello ${this.name} and your Balance is ${this.balance}`);
//     }
// }
// const acc1= new Person("rahman", 500);
// acc1.info(200);

//<-----------Encapsulation, Abstract, Inheritance, Polymorphism,--------------->

// class Animal{
//     speak(){
//         console.log("animal speksssss");
//     }
// }
// class Dog extends Animal{   // Inheritance;
//     speak(){
//         console.log("Dog burks");
//     }

// }
// class Cat extends Animal{
//     speak(){
//         console.log("Cat Meawwww");
//     }
// }
// class Cow extends Animal{
//     speak(){
//         console.log("Cow Hambaaaa");
//     }
// }

// //polymorphism happening here;
// const animals = [new Dog(), new Cat(), new Cow()];

// for(const a of animals){
//     a.speak();// same methods call but different output;
// }
// -------------------------------------All in real life project////////
class Payment {
  pay(amount) {
    console.log("Payment" + amount);
  }
}
class BcashPayment extends Payment {
  pay(amount) {
    console.log("paid"+ amount + "with Bcash");
  }
}
class CardPayment extends Payment{
    pay(amount){
        console.log("paid "+ amount + "with Card");
    }
}

function CheckOut(PaymentMethod, amount){
    PaymentMethod.pay(amount);
    ///// paymentmethod is and object and access 
    // inside in ovject { paymentmethod.pay()} 
}
CheckOut(new BcashPayment(), 500);
CheckOut(new CardPayment(), 700);
//<------------- Abbstract------------------>
