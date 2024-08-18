// Async Javascript

function sumn(num) {
  let sum = 0;
  for (let i = 1; i <= num; i++) {
    sum = sum + i;
  }

  return sum;
}

console.log(sumn(5));

//Reading data from os
// const fs = require('fs')
// const content = fs.readFileSync("a.txt","utf-8");
// console.log(content)

//CONTROL FLOW IN ASYNC FUNCTIONS
function logme() {
  console.log("Logging from function call from setTimeout");
}

setTimeout(logme, 1000);

console.log("I will log first");

for (let i = 0; i < 4; i++) {
  console.log("I will log 2nd ");
}

console.log("I will log 3rd");

for (let j = 0; j < 3; j++) {
  console.log("I will log 4th");
}
//output:
//I will log first
//I will log 2nd
//I will log 2nd
//I will log 2nd
//I will log 2nd
//I will log 3rd
//I will log 4th
//I will log 4th
//I will log 4th
//Logging from function call from setTimeout

//Promisifed version of fs.readFile
const fs = require("fs");

function myCallback() {
  console.log("Task Completed");
}

function promisifiedReadFile(filePath) {
  console.log("Inside promisified Read File function");
  return new Promise((resolve) => fs.readFile(filePath, "utf-8", resolve));
}

promisifiedReadFile("a.txt").then(myCallback);

//Promisified version of fs.writeFile
function promisifiedWriteFile(filePath) {
  console.log("Inside promisifed Write File function");
  let mydata = "new text added to file";
  return new Promise((resolve) =>
    fs.writeFile(filePath, mydata, "utf-8", resolve),
  );
}

promisifiedWriteFile("b.txt").then(myCallback);

//Promisified function that does the following
//1. Reads data from a file
//2. Trims the content for extra spaces
//3. Writes it back to the file
[TODO];
