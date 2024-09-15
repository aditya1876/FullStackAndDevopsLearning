const express = require("express");
const app = express();

app.use(express.json());

//APPLICATION LOGIC
let users = [];

function generateToken() {
  const options =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ012345689";

  let token = "";
  for (let i = 0; i < 32; i++) {
    // use a simple function here
    // Math.random() gives a random number between 0-1. multiply by the length of the array and floor it to get a random element from the options.
    // Do the above 32 times to generat a 32 char lenght token.
    token += options[Math.floor(Math.random() * options.length)];
  }
  return token;
}

app.post("/signup", function (req, res) {
  console.log("Signing up the user...");
  const username = req.body.username;
  const pass = req.body.password;

  //check that user is NOT present already (check the syntax below)
  if (users.find((u) => u.username === username)) {
    res.json({
      message: `You have already signed up with username: ${username}`,
    });
    return;
  }

  //when all checks are competed, add user to in-memory db
  users.push({
    username: username,
    password: pass,
  });

  //respond with a success message
  res.status(200).send("Signup successful!");
  console.log(`Full users length: ${users.length}`);
});

app.post("/signin", function (req, res) {
  const user = req.body.username;
  const pass = req.body.pass;

  //check if user exists (checking that the username and password combinations are correct)
  const foundUser = users.find(
    (u) => u.username === user && u.pasword === pass,
  );

  if (foundUser) {
    //generate a token
    const token = generateToken();
    foundUser.token = token; //adding token attribute to found user

    console.log(users);

    res
      .status(200)
      .json({ message: `Signin successful. Here is your token: ${token}` });
  } else {
    res.status(401).json({
      message: `Signin failed. No user found with combination of username: ${user} and password: ${pass}`,
    });
  }
});

app.get("/me", function (req, res) {
  const token = req.headers.authorization;

  //find the user info using token
  let foundUser = users.find((u) => u.token === token);

  console.log(foundUser);

  if (foundUser) {
    console.log("Displaying user information");
    res.status(200).json({
      "Your username": foundUser.username,
      "Your password": foundUser.password,
      "Your token": foundUser.token,
    });
  } else {
    console.log("Token invalid");

    res.status(401).json({
      message: "Token invalid",
    });
  }
});

//LISTEN
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
