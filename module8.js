// ->javascript function:

function geet() {
  console.log("hello world");
}
geet();

// ->Real-Time use case:

function greetuser(name) {
  console.log("Hello " + name);
}
greetuser("sadiya");
greetuser("samira");

// ->passing Arguments:

function add(num1, num2) {
  console.log(num1 + num2);
}
add(250, 250);

// ->Returning values:

function discount(price, persentance) {
  return price - price * (persentance / 100);
}
let finalprice = discount(700, 10);

console.log(finalprice);

// ->Named functions:

// -------------->  those function have separate name that is name function

// ->anonymous functions:
//   adding/storing function into a valiable-> use a call function
let multiply = function (a, b) {
  return a * b;
};
console.log(multiply(25, 5));

setTimeout(function () {
  console.log("this will print after 2 sec");
}, 2000);
// ->Arrow functions or inline function

const sum = (a, b) => a + b;
console.log(sum(500, 500));

const jog = (a, b) => {
  return a + b;
};

console.log(jog(510, 410));

// ->Immediately Invoked or function Expressions ( IIFE ):

(function () {
  console.log("this is going print immediately inviked function");
})();

// ->Generator Functions:

function* genetrator() {
  yield 1;
  yield 2;
  yield 3;
}
const gen = genetrator();
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());

// ->Recursive functions:

function countdown(n) {
  if (n <= 0) return;
  console.log(n);
  countdown(n - 1);
}

countdown(10);

function factorial(m) {
  if (m === 0) return 1;
  return m * factorial(m - 1);
}
console.log(factorial(7));

// fabonacci series

function fabonaccid(g) {
  let a = 0;
  let b = 1;
  console.log(a);
  if (g > 1) console.log(b);

  for (let i = 2; i <= g; i++) {
    let next = a + b;
    console.log(next);
    a = b;
    b = next;
  }
}

fabonaccid(8);
