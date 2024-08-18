//Basics

let myname = "John";
let a = 10; //number
let b = true; //boolean
console.log(myname);
console.log(a);
console.log(b);

const constName = "JohnCena"; //cannot be reassigned
//constName = "changed value" //this gives error
console.log(constName);

let a1 = [1, 2, 3.4, -1, "testing"];
console.log(a1);
console.log(a1[0]); //access 1st element
console.log(a1[3]);
console.log(a1[5]); //non existant element

//Operators
console.log(10 + 1); //arithmatic operators
console.log(10 === 10); //Comparison operator
console.log(true && false); //logical operators

//Functions
//declaration
function greeting(username) {
  console.log("Hello " + username);
}

//call
greeting("Ram");

//Objects
let username = {
  name: "test",
  age: 12,
};

console.log(username.name);
console.log(username["age"]);

//Objects of Objects
let user = {
  name: "Ram",
  age: 20,
  gender: "male",
  address: {
    india: ["bangalore", "hyderabad", "pune"],
    nz: ["auckland", "wellington"],
  },
};

console.log(
  "Name: " +
    user.name +
    " Age: " +
    user["age"] +
    " gender: " +
    user["gender"] +
    " address: " +
    user["address"]["india"] +
    " address in nz: " +
    user["address"]["nz"][1],
);

let users = [
  {
    username: "Ramu",
    age: 19,
    gender: "male",
  },
  {
    username: "sita",
    age: 23,
    gender: "female",
  },
  {
    username: "Krishna",
    age: 20,
    gender: "male",
  },
  {
    username: "Lakshman",
    age: 14,
    gender: "male",
  },
];

function maleAndAdult(users) {
  let age, gender;
  let ansArr = [];
  for (let i = 0; i < users.length; i++) {
    age = users[i]["age"];
    gender = users[i]["gender"];

    if (age > 18 && gender == "male") {
      //console.log("Name of male and adult user is: " + users[i]["username"]);
      ansArr.push(users[i]["username"]);
    }
  }

  return ansArr;
}

console.log("The list of male Adult users: " + maleAndAdult(users));
