//javascript
let x = 10;
console.log(x);

//typescript
let y: number = 11;
console.log(y);

//types in ts
//number, string, any
let z: any = 1;
console.log(z);
z = "test";
console.log(z);

//simple greeter
function greeting(myname: string) {
  console.log("Hello " + myname);
}

greeting("Earth");

//sum
function sumit(a: number, b: number) {
  return a + b;
}
let ans = sumit(1, 2); //notice that the type of ans is being inferred implicitly. it takes the type of the return value.
console.log(ans);
ans = sumit(1, -1);
console.log(ans);

//age
function isAdult(age: number) {
  if (age >= 18) {
    return true;
  }
  return false;
}

let ans1 = isAdult(40); //type of ans1 is automatically inferred by the type of returned
console.log("Is adult?: " + ans1);

//return type inferencing
function sum2(a: number, b: string) {
  return a + b;
}
let ans2 = sum2(1, "2");
console.log(typeof ans2);

//explicitly mentioning the type
function sum3(a: number, b: number): number {
  //specifying the type of return
  return a + b;
}
let ans3: number = sum3(1, 23); //specifying type of variable ans3

//write a function that excutes a funtion after 5 seconts
function greetAfter5Sec(fun: () => void) {
  //to tell ts that the type of 'fun' is a function. The function does not return anything, hence the return type is void. If function returns, put the retrun type
  console.log("Starting timer for 5 secs");
  setTimeout(fun, 5000);
}
function fnToRun() {
  console.log("Hi there! after 5 seconds");
}
greetAfter5Sec(fnToRun);

//more complex example
function greetAfter2secs(fun: (() => number) | ((a: number) => number)) {
  console.log("print 1st");
  setTimeout(fun, 2000);
}

function fn1() {
  console.log(
    "coming from function that does not take any args and returns a number",
  );
  console.log("Returned value: 1");
  return 1;
}

function fn2(t: number) {
  console.log("coming from function that takes 1 arg and returns a number");
  console.log("Returned value: " + t);
  return t;
}

greetAfter2secs(fn1);
console.log("---------");
greetAfter2secs(fn2);

//Passing objects as arguements to a function
function greeting1(user: { fname: string; age: number }) {
  console.log(`User has name: ${user.fname} and age: ${user.age}`);
}
greeting1({ fname: "Ram", age: 10 });
const user = { fname: "Sita", age: 11 };
greeting1(user);

//Type of an object
//provide the type explicitly
const user1: {
  firstName: string;
  age: number;
  address: { streetname: string; pin: number };
} = {
  firstName: "ram",
  age: 10,
  address: { streetname: "ayodhya", pin: 100001 },
};

//typscript can guess implecitly (hover over the user2 to see the type information(shift k on the word))
const user2 = {
  firstName: "Sita",
  age: 11,
  address: { streename: "Mithila", pin: 100002 },
};

//INTERFACES
//===========
interface UserType {
  firstName: string;
  age: number;
  isAdult: boolean;
}

function greeting2(user: UserType) {
  console.log(
    `User has name: ${user.firstName} and age: ${user.age} and isAdult: ${user.isAdult}`,
  );
}

const user3: UserType = { firstName: "sdlfkj", age: 12, isAdult: false };

//Address parameter in below interface is optional. make it optional by using ? in declaration
interface MyUser {
  fname: string;
  age: number;
  dob: Date;
  address?: {
    streetName: string;
    pin: number;
  };
}
let u1: MyUser = {
  fname: "abc",
  age: 10,
  dob: new Date(),
  address: {
    streetName: "abc street",
    pin: 987388,
  },
};

let u2: MyUser = {
  //address not used
  fname: "def",
  age: 21,
  dob: new Date(),
};

//Todo using interfaces
interface TodoInput {
  todo: {
    title: string;
    description: string;
    isDone: boolean;
  };
  lastDoneAt: Date;
}

function Todo(props: TodoInput) {
  //some code here
}

//calling from app.jsx
// <Todo todo={{
//   title: "Go to gym",
//   description: "gym is good",
//   isDone: false,
// }},
// lastDoneAt={new Date()} />

//Abstract classes using interfaces
interface Person {
  fname: string;
  age: number;
  greet: () => string;
}

let onePerson: Person = {
  fname: "adi",
  age: 12,
  greet: () => {
    return "Hi";
  },
};
console.log(onePerson.greet()); //"Hi"

class People implements Person {
  fname: string;
  age: number;
  id: string; //adding additional fields is allowed

  constructor(fname: string, age: number) {
    this.fname = fname;
    this.age = age;
    this.id = "12981792";
  }

  greet() {
    return "Hi" + this.fname;
  }

  getName() {
    console.log("first name: " + this.fname);
  }
}

let twoPerson = new People("adi", 19);

// TYPES
//UNION OF TYPES
type stringOrNumber = string | number; //union of types

function getUserId(testid: stringOrNumber) {
  console.log(`Userid of the user is ${testid}`);
}

getUserId(101); //Userid of the user is 101
getUserId("A101BXC"); //userid of the user is A101BXC
getUserId("100"); //Userid of the user is 100

//INTERSECTION OF TYPES
type Employee = {
  name: string;
  startDate: Date;
};

type Manager = {
  name: string;
  department: string;
};

type TeamLead = Employee & Manager; //intersection of types

const lead1: TeamLead = {
  name: "testlead",
  startDate: new Date(),
  department: "software department",
};
