const express = require("express");

//SETUP JSONWEBTOKEN INFORMATION
const { auth, JWT_SECRET } = require("./auth");
const jwt = require("jsonwebtoken");

//IMPORT DATABASE MODELS AND CONNECT TO DB
const { UserCollection, TodoCollection } = require("./db"); //<----------Importing models from db.js file
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING); //<------------Connecting to the database

const app = express();
app.use(express.json());

//PASSWORD ENCRYPTION
const bcrypt = require("bcrypt"); //<---------Import the module

//ROUTES
app.post("/signup", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  const hashedPassword = await bcrypt.hash(password, 5); //<------- Hashing the password (salt is also generated in it.)

  try {
    const isUserCreated = await UserCollection.create({
      email: email,
      password: hashedPassword,
      username: username,
    });
    console.log(`Is User Created? :[${isUserCreated}]`);

    res.status(200).json({
      message: "Sign up successful",
    });
    console.log(`New user [${username}] registered successfully!`);
  } catch (e) {
    console.log("Error during user registration!");

    res.status(403).json({
      message: "User already exists",
    });
  }
});

const zod = require("zod"); //<---------import library

app.post("/login", async function (req, res) {
  //<------------Create zod object
  const requiredBody = zod.object({
    email: zod.string().min(3).max(20).email(),
    password: zod.string().min(3).max(10),
  });

  //const parsedData = requiredBody.parse(req.body);
  const safeParsedData = requiredBody.safeParse(req.body);

  //<--------- check if data is in correct format
  if (!safeParsedData.success) {
    console.log(`Data provided is not in expected format`);
    res.status(403).json({
      message: "Invalid data format",
      error: safeParsedData.error,
    });
  }

  //<------ contiue if validation passed
  const email = req.body.email;
  const password = req.body.password;

  //retrive the user based on the email match only(email is also unique but the password entered by user will not match DB password)
  const user = await UserCollection.findOne({
    email: email,
  });
  console.log(`User data found to db : [${user}]`);

  const comparePassword = await bcrypt.compare(password, user.password);
  console.log(`Compare Passwrord Result: [${comparePassword}]`);

  //validate based on comparePassword
  if (comparePassword) {
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      JWT_SECRET,
    );

    res.status(200).json({
      token: token,
    });

    console.log(`User with email [${email}] successfully logged in!`);
  } else {
    console.log(`Signin failed for user with email [${email}]!`);
    res.status(403).json({
      message: "Incorrect Credentials",
    });
  }
});

app.post("/todo", auth, async function (req, res) {
  const title = req.body.title;
  const isCompleted = req.body.isCompleted;

  //add new todo item for user in DB
  //<------------------ adding new entry to database.
  const isTodoAdded = await TodoCollection.create({
    title: title,
    isCompleted: isCompleted,
    userId: req.userId, //read data from udpated request
  });

  console.log(`Todo item added: [${isTodoAdded}]`);

  res.status(200).json({
    message: "Todo item added!",
  });
});

app.get("/todos", auth, async function (req, res) {
  //get all the todos for the specified user from todos collection
  //<------------------- Get all data for particular user
  const allTodos = await TodoCollection.find({
    userId: req.userId,
  });

  console.log(`All Todos are displayed: [${allTodos}]`);

  res.status(200).json({
    allTodos: allTodos,
  });
});

//LISTEN
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
