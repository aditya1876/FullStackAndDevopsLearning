"use strict";
//javascript
let x = 10;
console.log(x);
//typescript
let y = 11;
console.log(y);
//types in ts
//number, string, any
let z = 1;
console.log(z);
z = "test";
console.log(z);
//simple greeter
function greeting(myname) {
    console.log("Hello " + myname);
}
greeting("Earth");
//sum
function sumit(a, b) {
    return a + b;
}
let ans = sumit(1, 2); //notice that the type of ans is being inferred implicitly. it takes the type of the return value.
console.log(ans);
ans = sumit(1, -1);
console.log(ans);
//age
function isAdult(age) {
    if (age >= 18) {
        return true;
    }
    return false;
}
let ans1 = isAdult(40); //type of ans1 is automatically inferred by the type of returned
console.log("Is adult?: " + ans1);
//return type inferencing
function sum2(a, b) {
    return a + b;
}
let ans2 = sum2(1, "2");
console.log(typeof ans2);
//explicitly mentioning the type
function sum3(a, b) {
    //specifying the type of return
    return a + b;
}
let ans3 = sum3(1, 23); //specifying type of variable ans3
//write a function that excutes a funtion after 5 seconts
function greetAfter5Sec(fun) {
    //to tell ts that the type of 'fun' is a function. The function does not return anything, hence the return type is void. If function returns, put the retrun type
    console.log("Starting timer for 5 secs");
    setTimeout(fun, 5000);
}
function fnToRun() {
    console.log("Hi there! after 5 seconds");
}
greetAfter5Sec(fnToRun);
//more complex example
function greetAfter2secs(fun) {
    console.log("print 1st");
    setTimeout(fun, 2000);
}
function fn1() {
    console.log("coming from function that does not take any args and returns a number");
    console.log("Returned value: 1");
    return 1;
}
function fn2(t) {
    console.log("coming from function that takes 1 arg and returns a number");
    console.log("Returned value: " + t);
    return t;
}
greetAfter2secs(fn1);
console.log("---------");
greetAfter2secs(fn2);
//Passing objects as arguements to a function
function greeting1(user) {
    console.log(`User has name: ${user.fname} and age: ${user.age}`);
}
greeting1({ fname: "Ram", age: 10 });
const user = { fname: "Sita", age: 11 };
greeting1(user);
