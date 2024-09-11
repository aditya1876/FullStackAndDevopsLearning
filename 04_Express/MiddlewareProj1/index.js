const express = require("express");
const app = express();

app.use(express.json());

//APPLICATION LOGIC
let noOfRequests = 0;
let loggedIn = false;

//MIDDLEWARES
function getWelcomeMessage(req, res, next) {
  console.log("Welcome message from the middleware");
  next();
}

function getRequestCount(req, res, next) {
  noOfRequests = noOfRequests + 1;
  next();
}

function isLoggedIn(req, res, next) {
  if (loggedIn) {
    console.log("User is logged in. Continue...");
    next(); //this call is necessary for the control to go to next steps
  } else {
    res
      .status(401)
      .send("User is not logged in or is unauthorized. Terminate code here.");
  }
}

//ROUTES
//METHOD 1 - If middleware function is not passed, it will not be called.
app.get("/", getWelcomeMessage, function (req, res) {
  res.status(200).send("Hello!");
});

//METHOD 2 - All routes below the app.use() call will use the middleware passed here. The Routes do not need to call the middleware anymore
app.use(getRequestCount);

//below route calls getRequestCount automatically. getWelcomeMessage is not called.
app.get("/generic-data", function (req, res) {
  //get the request count after incrementing the counter in getRequestCount() middleware
  console.log(`This is request no: ${noOfRequests} to the server`);
  res.status(200).send("Showing generic content");
});

app.use(isLoggedIn);

//below route calls getRequestCount() and isLoggedIn() automatically.
app.get("/get-my-data", function (req, res) {
  //Below code is run only if both getRequestCount and isLoggedIn() run successfully.
  console.log("Showing only user specific data as the user is logged in");
  res.status(200).json({ msg: "user specific data for logged in user" });
});

//below route triggers error (Make `loggedIn=True`) after running getRequestCount and isLoggedIn()
app.get("/trigger-error", function (req, res) {
  console.log(
    "Triggering error. The error middleware will be called automatically",
  );
  throw new Error();
});

//ERROR MIDDLEWARE
function catchAllUncaughtExceptions(err, req, res, next) {
  console.log("Some uncaught exception occured");
}

//LISTEN TO PORT
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
