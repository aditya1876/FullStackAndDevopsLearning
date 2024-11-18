interface User {
  name: string;
  age: number;
  email: string;
  id: string;
  password: string;
}

function addAges(user1: User, user2: User): number {
  return user1.age + user2.age;
}

const u1: User = {
  name: "abc",
  age: 10,
  email: "test@test.com",
  id: "A101",
  password: "testing",
};
const u2: User = {
  name: "def",
  age: 12,
  email: "test2@test.com",
  id: "A102",
  password: "testing",
};

const ans = addAges(u1, u2);
console.log(ans);

//PICK=============================
type UpdateProps = Pick<User, "name" | "age" | "email">;

function updateUser(updatedProps: UpdateProps) {
  //code to update the user details in db.
  //Using UpdateProps type ensures that only the required paramteres are sent for udpate. Other parameter (that should not be updated) are not allowed to be sent.
  console.log(
    `Updating the user with following prporties: ${updatedProps.name} and ${updatedProps.age} and ${updatedProps.email}`,
  );
}
updateUser({ name: "abc", age: 12, email: "test@tes.com" }); //need to provide all args
//=================================
//PARTIAL=========================
//in Pick all the selected properties need to be provided while calling the function, this may not be what we want. We should allow user to only send the properties that they actually want to update
//using partial, all properties in pick will become optional so they may or maynot be sent
type UpdateProps1 = Pick<User, "name" | "age" | "email">;
type UpdatePropsOptional = Partial<UpdateProps1>; //makes all args as optional

function updateUser1(updatedPropsOptional: UpdatePropsOptional) {
  //make db call and update the property that is actually provided
}
//every arg is now optional. No error even if nothing is provided
updateUser1({ name: "updatedName" });
updateUser1({ age: 20 });
updateUser1({ name: "tesuitn", email: "test@tes.com" });
updateUser1({});
//=================================
//READONLY=========================
//const in typescript only makes the whole object immutable, not the individual elements
const a = [1, 2, 3];
a[0] = 4; //allowed. no error;
// a = [4, 5, 6]; //not allowed. error.

//use readonly keyword
type User2 = {
  readonly userName: string; //username cannot beupdated after declaration now
  age: number;
};

const userreadonly: User2 = {
  userName: "adi",
  age: 12,
};
//userreadonly.userName = "scf"; //NOT allowed. Error
userreadonly.age = 20; //allowed. No error

//another way to declare readonly
const userread2: Readonly<User2> = {
  userName: "test",
  age: 12,
};
//userread2.userName = "def"; // error
//=================================
//COMPLEX OBJECT===================
type Users3 = {
  [key: string]: {
    fname: string;
    age: Number;
  };
};

const usergroup: Users3 = {
  key1: {
    fname: "k1u1",
    age: 10,
  },
  key2: {
    fname: "k2u2",
    age: 20,
  },
  key3: {
    fname: "k3u3",
    age: 30,
  },
};
//=================================
//RECODS===========================
//cleaner way to set the type of objects
interface User4 {
  id: string;
  fname: string;
}

type users4 = { [key: string]: User4 }; //ugly way
type users5 = Record<string, User4>; // cleaner way

const userObj1: users4 = {
  key1: { id: "A101", fname: "test1" },
  key2: { id: "A102", fname: "test2" },
};

const userObj2: users5 = {
  key1: { id: "B101", fname: "test3" },
  key2: { id: "B102", fname: "test4" },
};
//=================================
//MAPS=============================\

type UserType = {
  id: string;
  fname: string;
};
const usersmap1 = new Map<string, UserType>();
usersmap1.set("key1", { id: "A101", fname: "Adi" });
usersmap1.set("key2", { id: "A102", fname: "abc" });

console.log(usersmap1.get("key1"));
usersmap1.delete("key2");
//=================================
//EXCLUDE==========================
type EventType = "click" | "scroll" | "mousemove";
type ExcludeEvent = Exclude<EventType, "scroll">;

const handleEvent = (event: ExcludeEvent) => {
  console.log(`Excluding event: ${event}`);
};

handleEvent("click"); //works ok.
//=================================
//TYPE INFERENCE IN ZOD============
// import { z } from "zod";
// import express from "express";
//
// const app = express();
//
// //zod schema
// const userProfileSchema = z.object({
//   name: z.string().min(1, { message: "Name cannot be empty" }),
//   email: z.string().email({ message: "Invalid email provided" }),
//   age: z
//     .number()
//     .min(18, { message: "User should be atleast 18 years old" })
//     .optional(),
// });
//
// type FinalUserSchema = z.infer<typeof userProfileSchema>; //inferring the type
//
// app.put("/user", (req, res) => {
//   const { success } = userProfileSchema.safeparse(req.body);
//   const updatedBody: FinalUserSchema = req.body; //using the type
// });
//=================================
