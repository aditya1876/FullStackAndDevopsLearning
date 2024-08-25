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

//PROMISE WORKING
const fs = require("fs");

console.log("Working of a promise - Start");

function runSetTimeout(resolve) {
  console.log("Inside runSetTimout function");
  setTimeout(function () {
    console.log("set timeout wait completed");
    resolve();
  }, 3000);
}

function myCallback() {
  console.log("Task Completed");
}

function PromisifiedSetTimeout() {
  console.log("Inside PromisifiedSetTimout function");
  return new Promise(runSetTimeout);
}

PromisifiedSetTimeout().then(myCallback());
console.log("Working of a promise - End");

//Promisifed version of fs.readFile
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

///Promisified function that does the following
////1. Reads data from a file
////2. Trims the content for extra spaces
////3. Writes it back to the file
//function cleanFile(filePath) {
//  console.log("Inside clean file function");
//  let myData;
//  fs.readFile(filePath, "utf-8", (err, data) => {
//    if (err) {
//      console.log("Error occured");
//    } else {
//      myData = data;
//      console.log("File contents before: " + data);
//
//      let myDataTrimmed = myData.trim();
//      fs.writeFile("b.txt", myDataTrimmed, "utf-8", resolve);
//    }
//  });
//}
//
//function promisifiedCleanFile(filePath) {
//  console.log("Inside promisifiedCleanFile function");
//
//  return new Promise(cleanFile("a.txt"));
//}
//
//promisifiedCleanFile("a.txt").then(myCallback);
//console.log("test");
//
////Promise class implementation
//class Promise2 {
//  constructor(fn) {
//    function afterDone() {
//      this.resolve();
//    }
//    fn(afterDone);
//  }
//
//  then(functionToCallback) {
//    this.resolve = functionToCallback;
//  }
//}

//CALLBACK HELL
setTimeout(function () {
  console.log("print after 1 sec");
  setTimeout(function () {
    console.log("prints 2 sec after first log statement");
    setTimeout(function () {
      console.log("prints 3 secs after the 2nd log statement");
    }, 3000);
  }, 2000);
}, 1000);

//THEN HELL
function setTimeoutPromisified(duration) {
  return new Promise(function (resolve) {
    setTimeout(resolve, duration);
  });
}

setTimeoutPromisified(1000).then(function () {
  console.log("pring after 1 sec");
  setTimeoutPromisified(2000).then(function () {
    console.log("Print 2 sec after first log statement");
    setTimeoutPromisified(3000).then(function () {
      console.log("Print 3 sec after 2nd log statement");
    });
  });
});

//PROMISE CHAINING
setTimeoutPromisified(1000)
  .then(function () {
    console.log("printing after 1 sec");
    return setTimeoutPromisified(3000);
  })
  .then(function () {
    console.log("printing 2 seconds after first log statement");
    return setTimeoutPromisified(5000);
  })
  .then(function () {
    console.log("printing 3 seconds after 2nd statement");
  });

// ASYNC AWAIT SYNTAX
async function logit() {
  await setTimeoutPromisified(1000);
  console.log("Async print after 1 sec");
  await setTimeoutPromisified(2000);
  console.log("Async print 2 secs after 1st log statement");
  await setTimeoutPromisified(3000);
  console.log("Async print 3 secs after 2nd log statement");
}

logit();
console.log("This is printed before anything in logit function is printed");
