/* JSON WEB TOKEN - JWT
 * Steps:
 * 1. Install(npm install jsonwebtoken) and import 'jsonwebtoken' library
 * 2. Create a variable to store a random key. `JWT_SECRET` variable
 * 3. Create a jwt token for a user by passing some parameter of the user (username in this case)
 * 4. Use `jwt.verify` to verify the token.
 */
const express = require("express");
const jwt = require("jsonwebtoken"); //STEP 1
const JWT_SECRET = "RandomStringForCreatingJWT1233289"; //STEP 2 (this should be moved to env)
const app = express();

app.use(express.json());

//application logic
let users = [];

//middleware
function auth(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    const decodedUser = jwt.verify(token, JWT_SECRET);

    if (!decodedUser) {
      res.status(401).json({
        message: "User not found. Unauthorized",
      });
    } else {
      console.log("User Auth successful.");
      req.user = decodedUser; //update request object and pass to next
      next();
    }
  } else {
    res.status(500).json({
      message: "Token not found. Something went wrong",
    });
  }
}

//Routes
app.get("/", function (req, res) {
  console.log("Welcome!");
  res.status(200).sendFile(process.env.PWD + "/public/index.html");
});

app.post("/signup", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  //check if user is already signed to
  if (users.find((user) => user.username === username)) {
    console.log(`Account with username ${username} already exists.`);
    res.status(400).send(`Account with username [${username}] already exists.`);
  } else {
    //create entry into db
    let user = {
      username: username,
      password: password,
    };
    users.push(user);
    console.log(`User registered successfully!`);
    res.status(200).send(`User registration successful!`);
  }
});

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  //Return token if signin successful;
  //TOKEN need not be saved in the db/users[] anymore as the token is `stateless`.
  //The token contains the information required for verification. See app.get("/me")
  if (
    users.find(
      (user) => user.username === username && user.password === password,
    )
  ) {
    console.log("Signin successful");
    res.status(200).json({
      msg: "Signin is successful",
      token: jwt.sign({ username: username }, JWT_SECRET), //STEP 3
    });
  } else {
    console.log(`Signin unsuccessful for user: ${username}`);
    res.status(401).send(`Username or password does not match our records`);
  }
});

app.get("/me", auth, function (req, res) {
  // const token = req.headers.authorization; //jwt token will be provided in request
  // const decodedInfoFromToken = jwt.verify(token, JWT_SECRET); //STEP 4 (returns {username: username})
  // const usernameFromToken = decodedInfoFromToken.username;

  //get the user from db
  // console.log(req);
  const usernameFromToken = req.user.username; //read the data from request object
  const foundUser = users.find((user) => user.username === usernameFromToken);

  if (foundUser) {
    console.log("Displaying user information");
    res.status(200).json({
      username: foundUser.username,
      password: foundUser.password,
    });
  } else {
    console.log(
      `User with username: ${usernameFromToken} not found! This should not have happened with jwt implemented`,
    );

    res.status(500).send("Something went wrong");
  }
});

//LISTEN
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
