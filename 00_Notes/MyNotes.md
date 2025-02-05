# MY NOTES

## GENERIC

- Taking arguement as env variable in a javascript

```bash
MYNUMBER=100 node index.js
#  Now read the env variable in the script as: console.log(process.env.MYNUMBER)
```

## MISC

- Use <https://httpdump.app/> to create fake endpoints to check your api/ routes.

## Javascript Basics

- Maps:

```javascript
//double each element
const input = [1, 2, 3, 4, 5];

function transform(i) {
  return i * 2;
}

const output = input.map(transform);
console.log(output);
```

- Filters:

```javascript
//filter and display only even values
const input = [1, 2, 3, 4, 5, 6, 7, 8];

function myFilter(i) {
  if (i % 2 == 0) {
    return true;
  } else {
    return false;
  }
}

const output = input.filter(myFilter);
console.log(output);

//alternate way using anonymous function
const output2 = input.filter((n) => {
  if (n % 2 == 0) {
    return true;
  } else {
    return false;
  }
});

console.log(ouptut2);
```

## Async Functions

- Examples - IO Operations(read/ writing to files), timeout/ wait/ timing operations, HTTP Requests
- Architecture for Async Functions
  - Call Stack
    - Data structure to keep track of function calls in the program.
    - It operates in 'Last In First Out' manner. When a function is called, it gets added to call stack and once it completes it is moved out of the stack.
  - Web APIs
    - Provided by Web browser or Node.js runtime.
    - Allows to do activities outside of java-script scope like making network calls, setting timers, or handling DOM events.
  - Callback Queue
    - It is a list of tasks (callbacks) that are waiting to be picked up by Call Stack.
    - These are added by Web APIs
  - Event Loop
    - Constantly checks if Call Stack is empty, if it is, it pushes first call from Callback Queue for execution in Call Stack

## Promises

- Example:
  - Promisified version - setTimeoutPromisified(3000).then(functionToCallback) ;
  - Callback version - setTimeout(fuctionToCallback, 3000);
- A promisified version of an async function does the same thing as the async function itself, it just has better syntax and readability.

```javascript
//Promises

//setTimeout(fuctionToCallback, 3000);

function setTimeoutPromisified(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function functionToCallback() {
  console.log("Wait completed");
}

setTimeoutPromisified(3000).then(functionToCallback);

//Following happens on execution
//1. setTimeoutPromisified function is called.
//2. This inturn creates and returns a Promise Object
//3. The Promise object does the following:
//    - It executes the async operation (wating, IO operation , network call etc.) with the provide wait time as arguement.
//    - once the waiting is completed, it calls a 'resolve' object/function. This 'resolve' will actually be the function that is passed in the 'then()'
```

## DOM Manipulation

- DOM = Document Object Model
- Represents the structure of the webpage as a 'tree of objects'
- This was used to create dynamic website before React is included.
- DOM allows manipulation of structure and content of the webpages dynamically.

![Dom_Structure](./images/DOM_01.png);

## NODEJS

- It is an open-source JS runtime that allows to execute js code outside of a browser (or in a server).
- Build on Chrome's V8 engine
- Browser engines to run js:
  - chrome - V8
  - firefox - spidermonkey
  - safari - javascriptCore
- BUN
  - Alternate to Node.js (it is also a js runtime.)
  - Completely built from ground up.

### Intializing a project in Node.js

- create project folder
- navigate inside folder
- run - `npm init -y` (you should see some message for package.json)
  - Package.json:
    - name - name of the project
    - version - versioning
      - Format - MAJOR.MINOR.PATCH
        - MAJOR: major version changes or breaking changes from previous version.
        - MINOR: New feature addition or improvements in backward compatible manner.
        - PATCH: Backward compatible bug fixes or improvements.
      - The `^` sign in-front: it means npm will install any version compatible with this version (eg - "^5.3.1" means it can install any version from 5.3.1 to 5.9.9999 but not 6.0.0 because it will be a breaking change)
    - main - which file should be the entry point for the code.
    - scripts - developer specified scripts.
      - Example- Add `"start": "node index.js",` to scripts section. Now you can run `npm run start` in terminal to execute node index.js.
    - keywords - Metadata
    - author - Metadata
    - license - Metadata
    - description - Metadata
    - dependencies - Lists the packages required for the project to run. As the project user installs new packages, it gets added to this section
  - package.json-lock: even though, package.json provides a compatible version to install, sometimes minor version change between 2 developer machines/ local and server may arise due to package updates. This may cause code failures for our project. Hence, lock will automatically, lock to a single version of packages for whoever installs the project locally.
- open the folder in code editor
- create `index.js` in this folder
- Installing external package - `npm install <package name>`
  - This adds a folder `node_modules` in the project folder. node_modules contains the code and dependencies of the package itself.
- Setup project - `npm install`

### Update scripts in `package.json`

- update scripts like below in package.json file

```json
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start" : "node --env-file .env index.js",
    "dev":"nodemon --env-file .env index.js"
  },
```

- install nodemon - `npm install nodemon`
- run in dev mode (nodemon monitors file changes and automatically restarts server if there are changes) - `npm run dev`
- run in production mode(not using nodemon here) - `npm run start`

### Working with env files

- If node verion is > 20.6, you can use the following instead of installing dotenv module
- Create `.env` file in the project folder.
- Run the file - `node --env-file .env index.js` or `node --env-file=.env index.js`
- For multiple envs, create separate .env_local or .env_prod and call that file when running the file

```javascript
//.env file contents
API_KEY = "YOUR_API_KEY";
JWT_SECRET = "YOUR JWT SECRET";

//index.js contents to use the data from env file.
const key = process.env.API_KEY;
const secret = process.env.JWT_SECRET;
```

### Some concepts in node.js/ javascript

```javascript
let x = '{"a": "test", "b":"other"}';
typeof x; //string

let y = JSON.parse(x); //convert string to json
typeof y; //object
console.log(y.a); //test
console.log(x.a); //undefined

let z = JSON.stringify(y); //convert json to string
typeof z; //string
console.log(z.b); //undefined
console.log(y.b); //other
```

### Try-Catch block

```javascript
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
```

## HTTP / HTTPS SERVERS

- whenever we use https, port is set to 443 by default
- whenever we use http, port is set to 80 by default
- whenever we use ssh, port is set to 22 by default

### Express

- Js library that lets us create http servers
- Routes: GET, POST, PUT, DELETE etc
- Boilerplate code for express server

```javascript
const express = require("express");
const app = express(); //initialize the app

app.use(express.json()); //allows access to request body

//APPLICATION LOGIC
//some code

//ROUTE HANDLERS
app.get("/", function (req, res){
  console.log("welcome");
  res.status(200).json("{
    "msg": "Welcome to the app!",
  })
});

//Dynamic route parameters in URL
app.get("/add/:a/:b", function(req, res){
  console.log("This is how to read dynamic routes");
  const a = req.params.a;
  const b = req.params.b;

  res.send(200).json("sum": (parseInt(a)+parseInt(b)));
})

app.post("/create-entry", function(req, res){
  console.log("In Post route");
  let data_id = req.query.id; //when url is - https://myapp/create-entry?id=123
  let data_content = req.body; //when body has some data

  res.code(200).send(`Successfully created entry with id: ${id} and data: ${data}`);
});

//LISTEN ON PORT
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
})

```

### Middlewares

- Middlewares are functions that are usually common functions in the server that can handle some common tasks.
- Middlewares need to have next() in their declaration.
- 2 ways to declare:
  - Like a normal function (with additional next() arguement)
  - Like `app.use()`
- Any route below the `app.use()` middleware will use the middleware by default.
- Error middlewares:
  - Special type of middleware.
  - Declared below all the routes.
  - Express will ensure this middleware is run whenever uncaught exception occurs
  - This middleware needs to have an additional arguement `err` in the declaration.

```javascript
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
```

### Express Router

- Clean up the index.js file.
- Make the code more modular
- Makes it easy to update the api routes later on. eg - you can have '/api/v1/user' as the top level route in index.js. If you want to change all you have to do is update the index.js file ot '/api/v2/user'.
- If another team is building new APIs for the same product, you can continue to use the old one in production. eg- we can create new top level routes while the existing routes are running in parallel

```text
Folder structure
<project root>
  - routes/
    - users.js
    - courses.js
    - admin.js
- index.js
```

```javascript
//index.js
const express = require("express");

//routers
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

const app = express();

//Define Routes
app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);
```

```javascript
//File = <projectRoot>/routes/users.js

const { Router } = require("express");
const userRouter = Router();

//following route can be accessed using http://localhost:port/user/signup
userRouter.post("/signup", function (req, res) {
  res.status(200).json({
    message: "/user/signup route",
  });
});

//following route can be accessed using http://localhost:port/user/signin
userRouter.post("/signin", function (req, res) {
  res.status(200).json({
    message: "/user/signin route",
  });
});

//following route can be accessed using http://localhost:port/user/purchases
userRouter.get("/purchases", function (req, res) {
  res.status(200).json({
    message: "/user/purchases route",
  });
});
```

### Some API

- Some webpages send background requests after the main call.
- Fetch

```html
<html>
  <head> </head>
  <body>
    <div id="posts"></div>
    <script>
      async function getRecentPost() {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts/1",
        );
        const data = await response.json();
        console.log(data);
        document.getElementById("posts").innerHTML = data.title;
      }
      getRecentPost();
    </script>
  </body>
</html>
```

- Fetch can also be used to make post calls

```javascript
async function sendPostRequest() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    method: POST,
    headers: {
      "Cookie": "tersitn",
      "content-Type":"application/json"
    }
    ...(more details)
  });
}
```

- AXIOS (external library)

```html
<!doctype html>
<html>
  <head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.7.6/axios.min.js"></script>
  </head>

  <body>
    <div id="posts"></div>
    <script>
      async function fetchPosts() {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/posts/1",
        );
        document.getElementById("posts").innerHTML = res.data.title;
      }
      fetchPosts();
    </script>
  </body>
</html>
```

#### ZOD

```javascript
//npm install zod --> to install the lib

const jwt = require("jsonwebtoken");
const JWT_PASSWORD = "123456abcde";
const zod = require("zod");

//create zod schema
const usernameSchema = zod.string().email(); //when username should be valid email
const passwordSchema = zod.string().min(6); //when password should be atleast 6 chars long

function signJwt(username, password) {
  const usernameResponse = usernameSchema.safeParse(username);
  const passwordResponse = passwordSchema.safeParse(password);

  if (!usernameResponse.success || !passwordResponse.success) {
    console.log("Username or password does not match required criteria");
    return null;
  }

  console.log("Generating signature");
  const signature = jwt.sign(
    {
      username,
    },
    JWT_PASSWORD,
  );

  return signature;
}

console.log(signJwt("invalidUsername", "invPa")); //returns null
console.log(signJwt("proper@email.com", "validPass")); // returns signature token
```

```javascript
//install - `npm install zod`

const zod = require("zod"); //<---------import library

app.post("/login", async function (req, res) {
  //<------------Create zod object
  const requriedBody = zod.object({
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
```

### Connecting Front-End and Back-End

#### Different domains for FrontEnd and Backend

```javascript
//FOLDER STRUCTURE
/*
app
  public/
    index.html ----> frontend
  index.js ---> backend
  package.json
  package-lock.json
*/
```

- Serving Backend

  - Navigate to project folder and run --> `node index.js`
  - The server will start running on the port specified in index.js --> `http://localhost:PORT`

- Serving Frontend
  - Navigate to public folder and run --> `npx serve`
  - The front end (index.html) will run localhost at the port specified in the output of the command above.

#### Same domain for Frontend and Backend

```javascript
//FOLDER STRUCTURE
/*
app
  index.html ----> frontend
  index.js ---> backend
  package.json
  package-lock.json
*/


//index.js
const express = require("experess");

const app = express();

app.get("/", function(req, res)=>{
  res.sendFile(process.env.PWD+"/index.html"); //--> Sends the html on the same domain as the backend server
})

app.listen(3000);

//both front end and back end are on http://localhost:3000
```

### CORS

- CORS - Cross Origin Request Sharing
- This is a security feature that controls how resource on one webserver can be requested from another domain.
- Example:
  - User goes to <www.google.com/>
  - The page triggers a `background` request to another domain - <www.api.facebook.com/> ---> should not be allowed by <www.facebook.com>
  - But background request to <www.api.google.com/> should be allowed (as it is from google itself)
- Browser by default inserts `Referrer` into the background request when such background requests are send
- By default such cross origin requests(specially post or put requests) are denied by the called server.
- But most modern sites have different servers for frontend and backend code. In this case, we need to allow background requests between the two.
- If front-end and back-end are in same domain, then CORS issues will not happen(cors middleware is not required). Requests are accepted by default.

```html
<!doctype html>
<html>
  <head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.7.6/axios.min.js"></script>
  </head>

  <body>
    <script>
      async function fetchPosts() {
        const res = await axios.post("https://api.anotherDomain.com/", {
          Authorization: "TestAPIKey",
        });
      }
    </script>
  </body>
</html>
```

```javascript
//index.js (backend code for accepting background reqests from certain domains only)
const express = require("express");
const cors = require("cors"); //---> Import the cors library. Need to do 'npm install cors'

const app = express();

app.use(express.json())
//app.use(cors()) //---> allows background requests from any domains.
app.use(cors({
  domains: ["http://google.com","http://facebook.com"] //---> domains that are allowed to make background request
}));

app.get("/", function(req, res_{
  console.log("Welcome!");
}));

app.listen(3000);
```

### JSONWEBTOKEN(jwt)

```javascript
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

//Routes
app.get("/", function (req, res) {
  console.log("Welcome!");

  res.status(200).send("Welcome to my app!");
});

app.post("/signup", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  //check if user is already signed to
  if (users.find((user) => user.username === username)) {
    console.log(`Account with username ${username} already exists.`);
    res.status(400).send(`Account with username ${username} already exists.`);
  }

  //create entry into db
  user = {
    username: username,
    password: password,
  };
  users.push(user);
  console.log(`User registered successfully!`);
  res.status(200).send(`User registration successful!`);
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

app.get("/me", function (req, res) {
  const token = req.headers.authorization; //jwt token will be provided in request
  const decodedInfoFromToken = jwt.verify(token, JWT_SECRET); //STEP 4 (returns {username: username})
  const usernameFromToken = decodedInfoFromToken.username;

  //get the user from db
  const foundUser = users.find((user) => user.username === usernameFromToken);

  if (foundUser) {
    console.log("Displaying user information");
    res.status(200).json({
      username: foundUser.username,
      password: foundUser.password,
    });
  } else {
    console.log(
      `User with username: ${username} not found! This should not have happened with jwt implemented`,
    );

    res.status(500).send("Something went wrong");
  }
});

//LISTEN
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

#### jwt vs cookies

- jwts need to be stored in the browser explicitly. Cookies are stored automatically.
- Cookies are set by the application by using the header `Set-Cookie` and the browser automatically sends the cookie in the `cookie` header in all subsequent requests.
- Cookies only work in webapp/ browser. Wont work in Mobile.

## DATABASE BASICS

### MongoDB Setup

- create account in mongodb site.
- Create an org.
- Select a Project(or create one)
- Click 'Build a Database'
- Select M0 (free).
- Select provider (anyone)
- Select region (anyone, select one that is closer to you)
- Give it a name
- Click 'Create'
- Create credentials for the new DB (choose username/ password)
- Add entries to your IP access List
  - IP Address = 0.0.0.0/0
  - Description = everywhere
- Finish and close
- You should see your database
- Click on connect in the database.
- Select 'Mongodb for VS Code'
  - install extension 'Mongodb for VS code'
  - open command palatte and select mongodb - connect with connection string
  - Copy the connection string from mongodb site, replace with your username and password (created earlier) and paste in VS code.
  - _Keep the Connection string safe(dont upload to github)_
  - Click on Create new playground.

### Basics

- Structure:
  - Select cluster > create DB > create collections(tables) inside this db > each collection can have documents(rows) that contain data.
- Each document(row) contains a unique id called 'object id' provided by Mongodb(unique key for mongodb).
- Advantages of NoSQl:
  - Schema flexibility (very hard to change in SQL DBs)
  - Scalability. NoSQl can scale horizontally. Multiple instances can be setup as required in an easier way than SQL DBs.

### Example project

```javascript
//DB.js FILE
/**
 * STEPS:
 * - import mongoose module
 * - import Schema object from mongoose
 * - MongoDb has its own unique key to identify individual records called ObjectId. we need to import that.
 * - Create schemas for each collections tobe used
 * - Connect the schma and the collection it should belong to.
 * - Export the models so that they can be imported in index.js
 * - Import the models in index.js using `const {UserCollection, TodoCollection} = require("./db");`
 * - In `index.js` file:
 *   - Add connection with mongodb database
 *    - `mongoose.connect("mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER_STRING>/<DB NAME>");
 *   - convert the functions interacting with DB into async-await format
 *
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

//create schema for all collections
const UserSchema = new Schema({
  email: { type: String, unique: true }, //email will be unique
  password: String,
  username: String,
});

const TodoSchema = new Schema({
  title: String,
  isCompleted: Boolean,
  userId: ObjectId,
});

//Connect the schema and the collection(table) it should belong to
const UserCollection = mongoose.model("users_table", UserSchema);
const TodoCollection = mongoose.model("todos_table", TodoSchema);

//Export the models so that they can be imported in index.js
module.exports = {
  UserCollection: UserCollection,
  TodoCollection: TodoCollection,
};
```

```javascript
//INDEX.js FILE
const express = require("express");

//SETUP JSONWEBTOKEN INFORMATION
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_KEY;

//IMPORT DATABASE MODELS AND CONNECT TO DB
const { UserCollection, TodoCollection } = require("./db"); //<----------Importing models from db.js file
const mongoose = require("mongoose");
//<----------------------Connecting to database (basic way - dont use)
//mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING);

//<----------------------Connecting to the database - ok ok way
//(async () => {
//  try {
//    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
//    console.log(`Successfully connected to DB.`);
//  } catch (err) {
//    console.log(`Error in db connection. Error: [${err.stack}]`);
//  }
//})();

const app = express();
app.use(express.json());

//Middlewares
function auth(req, res, next) {
  const token = req.headers.authorization;
  const decodedData = jwt.verify(token, JWT_SECRET);

  if (decodedData) {
    req.userId = decodedData.id; //add the userid into req object to be used later
    console.log(`user with userid: [${decodedData.id}] is authenticated.`);
    next();
  } else {
    console.log(`User with token: [${token}] is not authenticated`);

    res.status(403).json({
      message: "User is not authenticated.",
    });
  }
}

//ROUTES
app.post("/signup", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  //<---------------INSERT 1 DATA INTO DB
  const isUserCreated = await UserCollection.create({
    email: email,
    password: password,
    username: username,
  });

  console.log(`Is User Created? :[${isUserCreated}]`);

  res.status(200).json({
    message: "Sign up successful",
  });

  console.log(`New user [${username}] registered successfully!`);
});

app.post("/login", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  //validate that the email/ password combination is valid
  //<------------- GET 1 ITEM FORM DB
  const user = await UserCollection.findOne({
    email: email,
    password: password,
  });

  console.log(`User data found to db : [${user}]`);

  if (user) {
    const token = jwt.sign(
      {
        id: user._id.toString(), //<---------- this is mongodb unique key for each user
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

//<---------------------------Connecting to database - better way (ensures app starts listening only when db is connected)
//Do mandatory steps that should complete before starting the app here
async function main() {
  //CONNECT TO DATABASE
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
  console.log(`Successfully connected to DB.`);

  //LISTEN
  app.listen(process.env.PORT, () => {
    console.log(`Server started on port: [${PORT}]`);
  });
}

main();
```

## PASSWORD ENCRYPTION

### Hashing

- Storing user passwords in database as plaintext is NOT a good practice.
- Hashing can be used.
  u- Hashing is a 1-way algorithm that converts a String into another random string.
- eg - Ram -> lksdjfi938027
- It is deterministic, i.e, everytime hashing is applied to 'Ram' it will lead to 'lksdjfi938027'
- Process:
  - User signsup with password 'Ram'.
  - Backend applied hashing and converts Ram into a hash 'asdf1234'
  - This hashed password is stored in DB.
  - Next time user logs in with password 'Ram', the backend again applies hashing algorithm and converts it to 'asdf1234' and compares with DB, thereby authenticating the user successfully.
- But Hashing has a problem.
  - if 2 users have same password, their hashed password will also be same.
  - So if 1 users password is desiphered(eg- by social engineering the user), all the users who have the same password are also at risk
  - To avoid this, 'Salting' is used.

#### Salting

- Process:
  - User signs up with password 'Ram'.
  - Backend adds a random string at the end of password 'poiu12' and make it 'Rampoiu12'.
  - This new string is then hashed to generate 'asdf1234' as hashed password.
  - DB now stores both the hashed password 'asdf1234' and salting string 'poiu12' for the user.
  - Next time user logs in with password 'Ram', backend retrieves both the hashed password and the salting string.
  - Backed appends the salting string to the password and applies the hashing algorithm, then compares the output to what is retrieved from DB.
- This way even though 2 users may have the same password, their hash saved in the DB will be different.
- This approach also helps guard against rainbow tables (Pre-created table that contains a list of common passwords and their hashed counterpart. When DB gets leaked, hackers can just compare the hashes and derive the actual password used)

```javascript
//NOTES:
//* 'bcrypt' is an npm module that provides hashing with salting inbuilt
//* install - `npm install bcrypt`
//* bcrypt.hash(password, 5) takes user provided password and a number to generate hashed pass and slat. The number represents the number of times the hash should be applied. The higher the number the longer it takes to generate the hashed password.
//* The generated hash contains both the salt and the hashed password.
//* eg - output will be of format like $2b$05$sdlkfeowijw98792ldfkgldfklrildklkdligrjdligjdrlij
//  - $02b represents the algorithm used
//  - $05 represents the number used in the hash() function
//  - $xxxxx contains both the salt and the actual hashed password (first 16 or some digits are salt string and the rest are hashed password)
//bcrypt.compare() automatically retrieves the algorithm, number and salt values form the db string and applies hash() on the provided password again for comparision

//PASSWORD ENCRYPTION
const bcrypt = require("bcrypt"); //<---------Import the module

//ROUTES
app.post("/signup", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  const hashedPassword = await bcrypt.hash(password, 5); //<------- Hashing the password (salt is also generated in it.)

  const isUserCreated = await UserCollection.create({
    email: email,
    password: hashedPassword, //<------ hashedpassword contains both the password and the salt string
    username: username,
  });

  console.log(`Is User Created? :[${isUserCreated}]`);

  res.status(200).json({
    message: "Sign up successful",
  });

  console.log(`New user [${username}] registered successfully!`);
});

app.post("/login", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  //retrive the user based on the email match only(email is also unique but the password entered by user will not match DB password)
  const user = await UserCollection.findOne({
    email: email,
  });
  console.log(`User data found to db : [${user}]`);

  const comparePassword = await bcrypt.compare(password, user.password); //<---auto compares the user entered password and hashed DB password
  console.log(`Compare Passwrord Result: [${comparePassword}]`);

  //validate based on comparePassword
  //<---- respond based on compared password
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
```

## REACT

- Introduced by facebook when they became too big for managing frontend
- React is an easier way to write normal HTML/CSS/JS. It is a new syntax that gets converted to HTML/ CSS and JS under the hood.
- React code -> `npm run build` -> converts the code to HTML/CSS/JS that gets deployed into the server

```html
<html>
  <script>
    function onButtonPress() {
      const currVal = document.getElementById("button1").innerHTML;
      const countVal = currVal.split(" ")[1];
      const newCountVal = parseInt(countVal) + 1;

      document.getElementById("button 1").innerHTML = "Counter " + newCountVal;
    }
  </script>

  <body>
    <button onclick="onButtonPress()" id="button1">Counter 0</button>
  </body>
</html>
```

- 3 parts - state, component, re-rendering
- State:
  - object that represents the current state of the app.
  - represents the dynamic things in the app (value of the counter above)
- Component:
  - re-usable, dynamic snippet that changes given the state
  - determines how a dom element should look like given the state
- Re-render
  - A state change triggers a re-render.
  - A re-render represents the dom change when dom is being manipulated.
- Basically in a react app:
  - Create components
  - Create state variables
  - Associate state to the components
  - React will take care of updating(re-rendering) the UI/dom when state changes

```html
<!-- same example as above but including the react logic. we are writing ourlogic as well as react logic together-->
<!doctype html>
<html>
  <body>
    <div id="buttonparent"></div>

    <script>
      let state = {
        count: 0,
      };

      function onButtonPress() {
        state.count++;
        buttonComponentReRender();
      }

      function buttonComponentReRender() {
        document.getElementById("buttonparent").innerHTML = ""; //remove current elements
        const component = buttonComponent(state.count); //select the component to rerender
        document.getElementById("buttonparent").appendChild(component); //render the button on the UI
      }

      function buttonComponent(count) {
        const button = document.createElement("button"); //create button element
        button.innerHTML = `Counter: ${count}`;
        button.setAttribute("onclick", "onButtonPress()"); //add attributes to it
      }

      buttonComponentReRender(); //call it once so that it renders the button first time the page loads
    </script>
  </body>
</html>
```

- jsx is a javascript XML. it is a syntax extension to javascript. Can be used to write HTML like code directly in javascript.

```jsx
<!-- same example in react -->
<!-- FILE NAME - App.jsx -->
import {useState} from 'react';

export default App(){
  const [count, setCount] = useState(0); //initialize state variable 'count' with val=0. 'setCount' is the function to update count
  //'count' should be updated using 'setState' function only otherwise, react will not trigger re-render.

  function onButtonPress(){
    setState(count+1);
  }

  //notice the syntax changes below. It is not html, it is xml
  return(
  <div>
      <button id="btn" onClick={onButtonPress}>Counter {count}</button>
  </div>
  )
}
```

```jsx
<!-- same example. This time in react -->
<!-- FILE NAME - App.jsx-->
import React from 'react'

function App(){
  const [count, setCount ] = React.useState(0); //initializing state. 'state' is the variable(value set to 0 here), 'setState' is the function to control it

  //Note - it is 'Button' and not 'button'
  return (
    <div>
      <Button count={count} setCount={setCount}></Button>
    </div>
  )
}

//
function Button(props){
  function onButtonPress(){
    props.setCount(props.count + 1); //state management logic goes here.
  }

  return <button onClick={onButtonPress}>Counter {props.count}</button>
}

export default App

```

- Some terms to read about - diffing, VDOM, Bulk updates, Reconcilliation, context api, prop drilling

### Creating REACT app locally

- Using Vite(most popular)
  - navigate to folder 1 level above the project folder
  - run `npm create vite@latest`
  - follow the prompts and create project
    - enter project name
    - package name can be same
    - framework - react
    - language - javascript
  - `cd <projectName>`
  - `npm install`
  - `npm run dev`
  - app will start locally and will provide url to access.
  - Killing running app:
    - `ctrl+c` if you have access to terminal where the process is running
    - if you do not have access to the terminal where the app was started:
      - `px -ax | grep vite`
      - `kill -9 <pid>` get the pid from above command

### Control flow in React App

- Folder structure

```Text
- ProjectRoot
  - public/
  - src/
    - index.css
    - App.css
    - main.jsx
    - App.jsx
  - index.js
  - eslint.config.js
  - package.json
  - package-lock.json
  - vite.config.js
  - Readme.md
```

- Start in `index.html`. it provides the basic structure to the webapp. The script being called in `script` is /src/main.jsx
- main.jsx -> This file points to the html tag that will be controlled by React in App. (document.getElementById("root"))
- App.jsx -> All the code to be handled by React goes here. Most of the code goes here.
- There can be multiple html tags that are controlled by React in the main.jsx. You need to have the tags present in index.html, have entry in the main.jsx and have currosponding jsx file imported.

### Children prop

- Can be used to create a template for the HTML elements
- What ever is within the tag will automatically become the child(see 2nd 'Child' element in example below)
- It is like a wrapper component
- Can use multiple elements of the same component for having different children

```jsx
export default function App() {
  return (
    <>
      <div className="item9">
        <h2>Children prop</h2>
        <Child
          children={<div>I am also a child and will be displayed</div>}
        ></Child>
        <Child>
          <div style={{ color: "red" }}>
            <div>Post your thoughts</div>
            <input type="text" />
          </div>
        </Child>
      </div>
    </>
  );
}

function Child({ children }) {
  return (
    <>
      <div
        style={{
          background: "lightblue",
          borderRadius: 10,
          color: "balck",
          padding: 10,
          margin: 10,
        }}
      >
        {children}
      </div>
    </>
  );
}
```

### Adding keys to lists

- when using dynamically generated lists, provide keys or react will show warning message
- React uses keys to optimize the re-rendering.

```jsx
function MyTodos() {
  let mytodos = [
    {
      title: "gym",
      done: false,
      id: 1,
    },
    {
      id: 2,
      title: "eat",
      done: true,
    },
  ];
  const [todos, setTodos] = setState(mytodos);

  const showall = todos.map(todo => <div key={todo.id}>{todo.title} -- {todo.done}<div>);

  return (
  <div>{showAll}</div>
  )

}
```

### Inline styling

- Some syntax differences between normal HTML styling and react styling
- double `{{}}` are required in react

```jsx
<Child>
  <div style={{ color: "red" }}>
    <div>Post your thoughts</div>
  </div>
</Child>

const componentStyle = {colour: "blue"}
<MyComponent>
  <div style={componentStyle}>
    My colour is blue
  </div>
</MyComponent>

function MyComponent(){
    return (
      <div style={componentStyle}>
        Test
      </div>
      </div style={{color:"black"}}>
        double brackets again
      </div>
    )
}

```

### Error Boundary

- Without this, if there is an error in 1 component, the entire page does not display/ app crashes.
- Error boundary allows the error to stay in the component and other components display normally.
- But the error boundary has to be implemented in old way in React using `class based Components`.
- Most companies have the following code as black box and just use it till error boundary is introduced in new React way `function based Components`

```jsx
export default function App(){
  return (<>
    <ErrorBoundary>
      <Card1 />
    </ErrorBoundary>
    <Card 2/>
  </>)
}

function Card1(){

  //throw new Error("Error while rendering");

  return (
  <div style={{background: "blue", borderRadius: 20, padding: 20, margin: 20}}>
    data in card 1
  </div>
  );
}

function Card2(){
  return (
    <div style={{background: "blue", borderRadius: 20, padding: 20, margin: 20}}>
      data in card 1
    </div>
  );
}

class ErrorBoundary extends React.Component {
  constructor(porps){
    super(props);
    this.state = {hasError: false}
  }

  static getDerivedStateFromError(error){
    return {hasError : true}
  }

  componentDidCatch(error, info){
    console.error("Error caught: ",error, info);
  }

  render(){
    if(this.state.hasError){
      return (
        <div style={{background: "blue", borderRadius: 20, padding: 20, margin: 20}}>
          Some error occured
        </div>)
    }
    return this.props.children;
  }
}
```

### Fragments in react

- helps to avoid unnecessary element tags
- if you want your component to be right below the root element return with <></>

```jsx

function MyComponent(){
  return (
    <div>
      <div>Element 1</div>
      <div>Element 2</div>
    </div>
  )
}

gives final html-->
<html>
  <body>
    <div id="root">
      <div>
        <div>Element 1</div>
        <div>Element 2</div>
      </div>
    </div>
  </body>
</html>

but using fragment
function MyComponent(){
  return (
    <>
      <div>Element 1</div>
      <div>Element 2</div>
    </>
  )
}

gives final html-->
<html>
  <body>
    <div id="root">
      <div>Element 1</div>
      <div>Element 2</div>
    </div>
  </body>
</html>

```

### React Lifecycle events

#### Mounting

- The following code will not run properly in the long run. The app tries to run a timer that increases the count every second. The reason the app does not run properly in the long run is the following:

  - The counter function called everytime the setCount function is called. This means setInterval is re-called every time the state changes(setCount is called). Each setInterval then tries to update the state every second causing a recursive loop.

- The solution to this problem is to utilize lifecycle events of React.
- Mounting happens when Counter function is called for the first time.
- Mounting is done using `useEffect()` hook
- useEffect is used to avoid `side effects`. side effects are operations that interact with the outside world and have effects other than rendering(eg: starting a clock, fetching data from API)

```jsx
import { useState } from "react";

export default function App() {
  function Counter() {
    const [count, setCount] = useState(0);

    setInterval(function () {
      setCount(count + 1);
    }, 1000);

    return (
      <>
        <div>
          <h1>{count}</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <div>My App</div>
      <Counter></Counter>
    </>
  );
}
```

- Code using `useEffect()` hook

```jsx
import { useState, useEffect } from "react";

export default function App() {
  function Counter() {
    console.log("this function run on every re-render");

    const [count, setCount] = useState(0);

    //useEffect takes 2 args, a function and dependencies
    useEffect(function () {
      const clock = setInterval(function () {
        setCount((count) => count + 1);
        //below line will not work without passing dependency
        //setCount(count+1);
      }, 1000);
      console.log("This hood runs only once. On mounting/ first render");

      return function () {
        console.log("This returns only when un-mounting");
        clearInterval(clock); //builtin function to stop running setInterval
      };
    }, []);

    return (
      <>
        <div>
          <h1>{count}</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <div>My App</div>
      <Counter></Counter>
    </>
  );
}
```

- Dependency Array:
  - it tells useEffect when to run.
  - if empty, useEffect runs only once.
  - on providing a state variable, useEffect will run whenever the state variable changes
  - the return statement inside useEffect is used to clean up the code. It will run when react knows the useEffect needs to be cleared/ when the component effected by useEffect is no longer needed to be rendered.

```jsx
import { useState, useEffect } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(100);

  function increaseCount1() {
    setCount((c) => c + 1);
  }

  function decreaseCount2() {
    setCount2((c) => c - 1);
  }

  return (
    <>
      <h1>My Sample React App</h1>
      <Counter count={count} count2={count2}></Counter>
      <button onClick={increaseCount1}>Increase Count 1</button>
      <button onClick={decreaseCount2}>Decrease Count 2</button>
    </>
  );
}

function Counter(props) {
  useEffect(function () {
    console.log("runs when mounting");

    return function () {
      console.log("runs when unmounting");
    };
  }, []);

  useEffect(
    function () {
      console.log("when mounting - count");

      return function () {
        console.log("when unmounting - count");
      };
    },
    [props.count],
  );

  useEffect(
    function () {
      console.log("when mounting - count2");

      return function () {
        console.log("when unmounting - count2");
      };
    },
    [props.count2],
  );

  return (
    <>
      <div>Counter 1: {props.count}</div>
      <div>Counter 2: {props.count2}</div>
    </>
  );
}
```

- The above code will give following output:

  - when app is initialized

    ```text
    runs when mounting
    when mounting - count
    when mounting - count2
    ```

  - when 'increase count 1' button is clicked

    ```text
    when unmounting - count
    when mounting - count
    //here clean up will run first and then the next round.
    //the clean up will be called everytime the button is press and useEffect is called.
    ```

  - when 'decrease count 2' button is clicked

  ```text
  when unmounting - count2
  when mounting - count2
  ```

#### Re-rendering

- normal behaviour.
- Counter function will keep rerendering if setCount is called.

##### Conditional re-rendering

- re-render based on a condition

```jsx
import { useState, useEffect } from "react";

export default function App() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(function () {
    setInterval(function () {
      setIsVisible((c) => !c);
    }, 5000);
  }, []);

  function Counter() {
    const [count, setCount] = useState(0);

    useEffect(function () {
      const clock = setInterval(function () {
        setCount((count) => count + 1);
      }, 1000);

      return fucntion(){
        console.log("on unmount");
        clearInterval(clock);
      }
    }, []);

    return (
      <div>
        <h1>{count}</h1>
      </div>
    );
  }

  return (
    <>
      <div>My App </div>
      {isVisible ? <Counter></Counter> : null}
    </>
  );
}
```

### Single Page Applications in React

- Single Page Applications (SPAs) are web applications that load a single HTML page and dynamically update that page as the user interacts with the app. This approach allows for a smoother user experience compared to traditional multi-page applications (MPAs), where each interaction often requires a full page reload.
- Setup:

  - Follow previous steps to create a React app.
  - Install package - `npm install react-router-dom`

- Below is the basic webapp. The navigation to different routes requires a network call to fetch the entire HTML again and again. This leads to the display of a loader in the title section of the browser.

```jsx
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  //cloning - https://allen.in
  return (
    <>
      <div>
        <a href="/">Allen</a>
        <a href="/neet/online-class-11">NEET Class11</a>
        <a href="/neet/online-class-12">NEET Class12</a>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/neet/online-coaching-class-11"
            element={<Class11Program />}
          />
          <Route
            path="/neet/online-coaching-class-12"
            element={<Class12Program />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

function Landing() {
  return (
    <>
      <div>Welcome to clone of Allen.in</div>
    </>
  );
}

function Class11Program() {
  return (
    <>
      <div>You are in NEET - Class 11 Program</div>
    </>
  );
}

function Class12Program() {
  return (
    <>
      <div>You are in NEET - Class 12 Program</div>
    </>
  );
}
```

- To make the application a truly SinglePageApplication, React should only load the required/ changed content only. Then there will not be any loader at the browser title and no unnecessary network calls will be sent out. Use the inbuilt `Link` in side browserRouter component

```jsx
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  //cloning - https://allen.in
  return (
    <>
      <BrowserRouter>
        <div>
          <Link to="/" style={{ padding: 10 }}>
            HomePage
          </Link>
          <Link to="/neet/online-coaching-class-11" style={{ padding: 10 }}>
            NEET Class 11
          </Link>
          <Link to="/neet/online-coaching-class-12" style={{ padding: 10 }}>
            NEET Class 12
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/neet/online-coaching-class-11"
            element={<Class11Program />}
          />
          <Route
            path="/neet/online-coaching-class-12"
            element={<Class12Program />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

function Landing() {
  return (
    <>
      <div>Welcome to clone of Allen.in</div>
    </>
  );
}

function Class11Program() {
  return (
    <>
      <div>You are in NEET - Class 11 Program</div>
    </>
  );
}

function Class12Program() {
  return (
    <>
      <div>You are in NEET - Class 12 Program</div>
    </>
  );
}
```

#### useNavigate

- another way for users to navigate the routes

```jsx
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <Link to="/" style={{ padding: 10 }}>
            HomePage
          </Link>
          <Link to="/neet/online-coaching-class-11" style={{ padding: 10 }}>
            NEET Class 11
          </Link>
          <Link to="/neet/online-coaching-class-12" style={{ padding: 10 }}>
            NEET Class 12
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/neet/online-coaching-class-11"
            element={<Class11Program />}
          />
          <Route
            path="/neet/online-coaching-class-12"
            element={<Class12Program />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

function Landing() {
  return (
    <>
      <div>Welcome to clone of Allen.in</div>
    </>
  );
}

function Class12Program() {
  const navigate = useNavigate();

  function goToHome() {
    navigate("/");
  }

  return (
    <>
      <div>You are in NEET - Class 12 Program</div>
      <button onClick={goToHome}>Go Home</button>
    </>
  );
}
```

#### Layouts in react

- Application should have a layout. A layout provides structure to the app.
- Example layout - Header/ navbar at the top > content in the middle > footer in the bottom of the app

```jsx
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";

export default function App() {
  //cloning - https://allen.in
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/*Single route that implements layout in react. all other routes are its children*/}
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Landing />} />
            <Route
              path="/neet/online-coaching-class-11"
              element={<Class11Program />}
            />
            <Route
              path="/neet/online-coaching-class-12"
              element={<Class12Program />}
            />
            {/*If any route other than the above is accessed, we should display page not found*/}
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

function Layout() {
  return (
    <>
      <div style={{ height: "100vh" }}>
        {/*HEADER*/}
        <div style={{ height: "10vh" }}>WEBSITE LOGO</div>
        {/*NAVBAR*/}
        <div style={{ height: "10vh" }}>
          <Link to="/" style={{ padding: 10 }}>
            HomePage
          </Link>
          <Link to="/neet/online-coaching-class-11" style={{ padding: 10 }}>
            NEET Class 11
          </Link>
          <Link to="/neet/online-coaching-class-12" style={{ padding: 10 }}>
            NEET Class 12
          </Link>
        </div>
        {/*CONTENT*/}
        <div style={{ height: "70vh" }}>
          {/*Outlet is builtin component that will display the children fo the Layout component*/}
          <Outlet />
        </div>
        {/*FOOTER*/}
        <div style={{ height: "10vh" }}>Footer | Contact Us</div>
      </div>
    </>
  );
}

function Landing() {
  return (
    <>
      <div>Welcome to clone of Allen.in</div>
    </>
  );
}

function Class11Program() {
  return (
    <>
      <div>You are in NEET - Class 11 Program</div>
    </>
  );
}

function Class12Program() {
  return (
    <>
      <div>You are in NEET - Class 12 Program</div>
    </>
  );
}

function PageNotFound() {
  return (
    <>
      <div>Sorry page not found 404</div>
    </>
  );
}
```

#### useRef

- It creates a reference to a dom element that persists when re-render happens.
- It does not trigger a re-render when the value changes. It can update the values without triggering re-render

```jsx
{
  /*REFERENCE TO AN ELEMENT*/
  /*The focus is put on username field whenever user clicks on submit*/
}
import { useRef } from "react";
import "./App.css";

export default function App() {
  return (
    <>
      <Landing />
    </>
  );
}

function Landing() {
  const inputRef = useRef();
  function focusOnInput() {
    // document.getElementById("id_username").focus();
    inputRef.current.focus();
  }

  return (
    <>
      <div>Welcome to clone of Allen.in</div>
      <div>
        <input
          ref={inputRef}
          id="id_username"
          type="text"
          placeholder="Username"
        />
        <input type="text" placeholder="Password" />
        <button onClick={focusOnInput}>Submit</button>
      </div>
    </>
  );
}
```

```jsx
{
  /*REFERENCE TO A VALUE*/
  /*A clock that has a pause and unpause button*/
}
import { useState, useEffect, useRef } from "react";

export default function App() {
  return (
    <>
      <div className="grid-container">
        <div className="item10">
          <h2>useRef - Reference by value</h2>
          <RefTimer></RefTimer>
        </div>
      </div>
    </>
  );
}

function RefTimer() {
  const [clock, setClock] = useState(0);
  //let timerval = 0; //will not work - timerval will be reset on every re-render of RefTimer.
  //const [timerval,setTimerval] =useState(0); //will not work - 1 exra re-render will happen when setTimerval is called. It will make timer incorrect
  const timerval = useRef();

  function startClock() {
    let value = setInterval(function () {
      setClock((c) => c + 1);
    }, 1000);
    //timerval = value;
    //setTimerval(value);
    timerval.current = value;
  }

  function pauseClock() {
    clearInterval(timerval.current);
  }

  return (
    <>
      <div>{clock}</div>
      <button onClick={startClock}>Start</button>
      <button onClick={pauseClock}>Pause</button>
    </>
  );
}
```

### Context API

- The Problem -- PROP DRILLING: Happens when state variables are defined in the top level Component but are actually needed in some component that is defined some levels deeper. The state variables will have to be passed on to each component in between the top and the actual component. This makes the code hard to understand and difficult to maintain.

```jsx
{
  /*Example of passing props. NOT and example of prop-drilling problem*/
}
import { useState } from "react";
import "./App.css";

export default function App() {
  return (
    <>
      <div>MY REACT APP - STATE EXPERIMENTS</div>
      <LightBulb></LightBulb>
    </>
  );
}

function LightBulb() {
  const [isBulbOn, setIsBulbOn] = useState(true);

  return (
    <>
      <ShowBulb isBulbOn={isBulbOn}></ShowBulb>
      <ControlBulb isBulbOn={isBulbOn} setIsBulbOn={setIsBulbOn}></ControlBulb>
    </>
  );
}

function ShowBulb({ isBulbOn }) {
  return (
    <>
      <div>Is bulb on?: {isBulbOn ? "Yes" : "No"}</div>
    </>
  );
}

function ControlBulb({ isBulbOn, setIsBulbOn }) {
  function toggleBulb() {
    //setIsBulbOn((toggle) => !toggle);
    setIsBulbOn(!isBulbOn);
  }

  return (
    <>
      <button onClick={toggleBulb}>Toggle Bulb</button>
    </>
  );
}
```

- The Solution - Context API
  - Context.provider wraps the parent component. All the children of this parent will have access to this context.
  - No need to pass the state variables as props.
  - No need for the children to accept the props as function arguments.

```jsx
//STEP 1 - Create Context
import { createContext, useContext, useState } from "react";
const BulbContext = createContext();

//STEP 1.5 - Create a function to pass the state variables to the context
function BulbProvider({ childred }) {
  const [isBulbOn, setIsBulbOn] = useState(true);

  return (
    <>
      <BulbContext.Provider
        value={{ isBulbOn: isBulbOn, setIsBulbOn: setIsBulbOn }}
      >
        {children}
      </BulbContext.Provider>
      ;
    </>
  );
}

function App() {
  const [isBulbOn, setIsBulbOn] = useState(true);
  return (
    <>
      <div>MY REACT APP - STATE EXPERIMENTS</div>
      {/*STEP 2 - Wrap the top level(parent component) with the context component */}
      <BulbProvider>
        <LightBulb></LightBulb>
      </BulbProvider>
    </>
  );
}

function LightBulb() {
  return (
    <>
      {/*STEP 2 - No need to pass the props anymore. All children of LightBulb have access to the context*/}
      <ShowBulb></ShowBulb>
      <ControlBulb></ControlBulb>
    </>
  );
}

function ShowBulb() {
  //STEP 3- No need to accept props in function args. Can directly use the variable from the context
  const { isBulbOn } = useContext(BulbContext);
  return (
    <>
      <div>Is bulb on?: {isBulbOn ? "Yes" : "No"}</div>
    </>
  );
}

function ControlBulb() {
  const { isBulbOn, setIsBulbOn } = useContext(BulbContext);

  function toggleBulb() {
    setIsBulbOn(!isBulbOn);
  }

  return (
    <>
      <button onClick={toggleBulb}>Toggle Bulb</button>
    </>
  );
}
```

### Custom Hooks

- should start with `use`
- it should another hook inside it
- Dont write normal function using a hook(useState, useEffect). Either write custom hooks or Components.
-

```jsx
import { useState } from "react";

export default function App() {
  const { mycount, customIncreaseCount } = useMyCustomCounter();
  return (
    <>
      <div>
        <h2>My Custom Hooks App</h2>
        <CounterWithoutCustomHooks></CounterWithoutCustomHooks>
        <CounterWithCustomHooks></CounterWithCustomHooks>
        <button onClick={customIncreaseCount}>With custom: {mycount}</button>
      </div>
    </>
  );
}

//Custom Hook Creation
//must start with 'use'
//must call another hook inside
function useMyCustomCounter() {
  const [mycount, setMyCount] = useState(0);

  function customIncreaseCount() {
    setMyCount((c) => c + 1);
  }

  return {
    mycount: mycount,
    customIncreaseCount: customIncreaseCount,
  };
}

function CounterWithoutCustomHooks() {
  const [count1, setCount1] = useState(0);

  function increaseCount1() {
    setCount1((c) => c + 1);
  }

  return (
    <>
      <button onClick={increaseCount1}>
        Couter Without Custom Hooks {count1}
      </button>
    </>
  );
}

function CounterWithCustomHooks() {
  const { mycount, customIncreaseCount } = useMyCustomCounter(); //using the custom hook. notice the {} instead of[]

  return (
    <>
      <button onClick={customIncreaseCount}>
        Counter with Custom Hooks: {mycount}
      </button>
    </>
  );
}
```

```jsx
import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [postId, setPostId] = useState(1);
  const { post, isLoading } = useMyFetch(
    "https://jsonplaceholder.typicode.com/posts/" + postId,
  );

  return (
    <>
      <div>
        <h2>My Custom Hooks App</h2>
        <button onClick={() => setPostId(1)}>Get Post 1</button>
        <button onClick={() => setPostId(2)}>Get Post 2</button>
        <button onClick={() => setPostId(3)}>Get Post 3</button>
        {isLoading ? (
          "Loading..."
        ) : (
          <div>Post data: {JSON.stringify(post)}</div>
        )}
      </div>
    </>
  );
}

//Custom Hook
function useMyFetch(url) {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState({});

  async function getPost() {
    setIsLoading((s) => true);
    const response = await fetch(url);
    const jsonResp = await response.json();
    setPost(() => jsonResp);
    setIsLoading((s) => false);
  }

  useEffect(() => {
    getPost();
  }, [url]);

  return { post: post, isLoading: isLoading };
}
```

#### usePrev

- when currState is 0, prev = undefined
- when currState is 1, prev = 0.
- how does it work? - <https://giacomocerquone.com/blog/life-death-useprevious-hook/>

```jsx
function usePrev(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

function UsePrevImplementation() {
  const [currState, setCurrState] = useState(0);
  const prev = usePrev(currState);

  return (
    <>
      <button onClick={() => setCurrState((c) => c + 1)}>update</button>
      <div>Current State value: {currState}</div>
      <div>Previous State value: {prev}</div>
    </>
  );
}
```

#### useDebounce

- usually used in search boxes that search as the user types.
- we don't want to call the DB every time the user types a character in the field. We want to make the expensive call after user has stopped typing for a few milliseconds.
- For that we use debounce. Every time user enters a character, we want to call debouncedFn. This function will wait for some time (200ms here) before sending the data to backend. If user enters some more characters within 200ms, the current timer is stopped and new timer for 200 ms starts. Only once the user has stopped typing or waiting for more than 200ms, does the API call to backed is sent.

```jsx
function useDebounce(fnToRun) {
  const currentTimer = useRef();

  const fn = () => {
    clearTimeout(currentTimer.current); //clear the running timer
    currentTimer.current = setTimer(fnToRun, 200); //starts another timer for 200ms
  };

  return fn;
}

export default function App() {
  function sendDataToBackend() {
    console.log("sending data");
  }

  const debouncedFn = useDebounce(sendDataToBackend);

  return (
    <>
      <input type="text" onChange={debouncedFn}></input>
    </>
  );
}
```

- Another implementation. Capture the input value till user stops typing for 200ms and then make the call.

```jsx
const useDebounce = (value, delay) => {
  const [debouncedVal, setDebouncedVal] = useState(value);

  useEffect(() => {
    const timer = setInterval(() => {
      setDebouncedVal(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
};

export default function App() {
  const [inputVal, setInputVal] = useState();
  const debouncedVal = useDebounce(inputVal, 200);

  function updateVal(e) {
    //gets the event from input field
    setInputVal(e.target.value); //same as document.getElementById("input").value;
  }

  useEffect(() => {
    //expensive operation like API calls
    console.log("API call to backend");
  }, [debouncedVal]);

  return (
    <>
      <input type="text" onChange={updateVal}></input>
    </>
  );
}
```

### RECOIL

- State management library (like Redux,mobX, useState)
- useContext will rerender more than necessary, Recoil will only render the element being changed.

- `ATOM`

  - units of state that can be read and written to from any component.
  - when the state of an atom changes, all the components that subscribe to the atom will re-render
  - should have default value and a key

- Installation - `npm install recoil`
- wrap application inside recoil root component

```jsx
import { RecoilRoot } from "recoil";

export default function App() {
  return (
    <>
      <RecoilRoot>
        .. ..
        <Counter />
        .. ..
      </RecoilRoot>
    </>
  );
}
```

- Add atoms to your app

```jsx
//create atom files in `<ProjectRoot>/src/store/atoms/` folder
//atom file - counter.js
//add following in the counter.js file
import { atom } from "recoil";

export const counterAtom = atom({
  default: 0,
  key: "counter",
});
```

- Update application to use the atom

```jsx
import { counterAtom } form "./store/atoms/counter"
...
...
function Counter(){
  return(<>
    <IncreaseCount />
    <DisplayCount />
  </>);
}

function IncreaseCount(){
  const setCount = useSetRecoilState(counterAtom); //only needs the setstate function

  function inc(){
    setCount(c=>c+1);
  }

  return(<>
    <button onClick={inc}>Increase</button>
  </>)
}

function DisplayCount(){
  const count = useRecoilValue(counterAtom); //only requires the state variable

  return(<>
    <div>Count Value: {count}</div>
  </>)
}


```

### Memo

- React behavior - if a component re-renderds, all its children also re-render
- with memo, if a component re-renders, only the children that are sent the props re-render. Other children components do not re-render.
- React re-rendering - <https://whereisthemouse.com/react-components-when-do-children-re-render>

```jsx
import { memo } from "react";

const Buttons = memo(function () {
  const setCount = useSetRecoilState(counter);

  function increase() {
    setCount((c) => c + 1);
  }

  function decrease() {
    setCount((c) => c - 1);
  }

  return (
    <div>
      <button onClick={increase}>Increase</button>
      <button onClick={decrease}>Decrease</button>
    </div>
  );
});
```

### Selectors

- A selector represents a piece of derived state. You can think of derived state as the output of passing state to a pure function that derives a new value from the said state.

- Create a selector

```jsx
//create file <projectRoot>/src/selectors/isEvenSelector.js

import {counterAtom} from "../atoms/counter.js"
import {seletor} form "recoil";

export const isEvenSelector = selector({
  key: "isEvenSelector",
  get: function({get}){
        const currentCount = get(counterAtom); //get required data from atom
        const isEven = (currentCount %2 ==0);
        return isEven;
      }
});
```

- use selector in app

```jsx
import {RecoilRoot, useRecoilValue, useSetRecoilState} form "recoil";
import {counterAtom} from "./src/atoms/coutner.js";
import {isEvenSelector} from "./src/selectors/isEvenSelector.js";
export default App(){
  return (<>
    <RecoilRoot>
      <IncButtonSelector />
      <DecButtonSelector />
      <DisplayCounterValueSelector />
      <DisplayIsEvenValueSelector />
    </RecoilRoot>
  </>)
}

function IncButtonSeletor(){
  const setCount = useSetRecoilState(counterAtom);

  return (<>
    <button onClick={()=>{setCount(c=>c+2)}}>Increase By 2</button>
  </>)
}

function DecButtonSelector(){
  const setCount = useSetRecoilState(counterAtom);

  return (<>
    <button onClick={()=> {setCount(c=>c-1)}}>Decrease By 1</button>
  </>)
}

function DisplayCounterValueSelector(){
  const count = useRecoilValue(coutnerAtom);

  return (<>
    <div>Counter Value: {count}</div>
  </>)
}

function DisplayIsEvenValueSelector(){
  const isEven = useRecoilValue(isEvenSeletor); //<-----getting the selector value

  <div>{isEven ? "Even":"Odd"}</div>
}
```

### Asynchronous Data Queries using atoms

- Used in situations where data needs to be fetched and displayed.

```jsx
//Atom definition uses selector in this case.
import axios from "axios";
import { atom, selector } from "recoil";

export const dataAtom = atom({
  key: "dataAtom",
  default: selector({
    key: "dataSelector",
    get: async () => {
      //simulating delay
      //await new Promise((r) => setTimeout(r, 2000)); //sleeps for 2 sec -- stops the entire site from loading
      const resp = await axios.get(
        "https://jsonplaceholder.typicode.com/posts/1",
      );
      return resp.data;
    },
  }),
});
```

### Atom Family

- Used when components are generated dynamically and each component may require different atom data.
- Rather than creating a new atom dynamically for each component(this has other problems like duplicate components will create separate atoms rather than pointing to same atom), we can use AtomFamily.
- Example - Todo App

```jsx
//TODO data
export const TODOs = [
  {
    id: 1,
    title: "My todo 1",
    desc: "Description of todo 1",
    completed: false,
  },
  {
    id: 2,
    title: "My todo 2",
    desc: "Description of todo 2",
    completed: false,
  },
  {
    id: 3,
    title: "My todo 3",
    desc: "Description of todo 3",
    completed: true,
  },
];

//todosAtomFamily.js
import TODOs from "../../data/todos";
import { atomFamily } from "recoil";

export const todoAtomFamily = atomFamily({
  key: "todoAtomFamily",
  default: (id) => {
    return TODOs.find((x) => x.id === id);
  },
});

//App.jsx
import { todosAtomFamily } from "./store/atoms/todosAtomFamily.js";
function AtomFamilyRecoil() {
  return (
    <>
      <Todo id={1} />
      <Todo id={3} />
    </>
  );
}

function Todo(id) {
  const todoData = useRecoilValue(todosAtomFamily(id));

  return (
    <>
      <div>testing</div>
      <div>Displaying Todo with id: {id}</div>
      <div>Todo Title: {todoData.title}</div>
      <div>Todo Desc:{todoData.desc}</div>
      <div>{todoData.completed ? "Done" : "Not Done"}</div>
    </>
  );
}
```

- When asynchronous calls are required,like fetching data from DB, use `selectorFamily` in atomFamily definition. (see atom definition above). Notice the difference in get for selectorFamily definition

```jsx
export const todosAtomFamily = atomFamily({
  key: "todosatomfamily",
  default: selectorFamily({
    key: "todoselectorFamily",
    get:
      (id) =>
      async ({ get }) => {
        const res = await axios.get(
          `https://jsonplaceholder.typicode.com/todos/id=${id}`,
        );
        return res.json();
      },
  }),
});
```

### useRecoilStateLoadable/ useRecoilValueLoadable

- What happens when atomFamily has not returned the state variable yet?
- You can display loading... (or anything else) while we wait for the content to load.

- Useful for showing skeleton on ui while the data loads. (google - mui skeleton)

```jsx
//component displayed is <Todo>
//atomFamily is todoAtomFamily

function Todo() {
  const [todoObj, setTodoObj] = useRecoilStateLoadable(todosAtomFamily(id)); //if you also want to set todo
  const todoObj2 = useRecoilValueLoadable(todoAtomFamily(id)); //if you only care about the value of the todo
  //todoObj and todoObj2 are the same

  if (todoObj.state === "loading...") {
    return (
      <>
        <div> Please wait... </div>
      </>
    );
  } else if (todoObj.state === "hasValue") {
    return (
      <>
        <div>Todo Title: {todoObj.contents.title}</div>
        <div>Todo Desc: {todoObj.contents.desc}</div>
        <div>
          Todo Status: {todoObj.contents.completed ? "Done" : "Not Done"}
        </div>
      </>
    );
  } else if (todoObj.state === "hasError") {
    return (
      <>
        <div>Some error occured</div>
      </>
    );
  }
}
```

## TAILWIND

- Frontend/ Component library
- Things to know to work (to make you framework agnostic):
  - Flex
  - Grids
  - Responsiveness
  - Background Colour, Text Color, Hovering

### Flex

- A div tag takes the entire width usually

![div behavior](./images/Tailwind_01.png)

- adding flex will make children align in single line
  ![flex](./images/Tailwind_02.png)

- use justify content to properly space elements
  ![justifyContent1](./images/Tailwind_03.png)
  ![justifyContent_flexStart](./images/Tailwind_04.png)
  ![justifyContent_flexEnd](./images/Tailwind_05.png)
  ![justifyContent_center](./images/Tailwind_06.png)
  ![justifyContent_spaceBetween](./images/Tailwind_07.png)
  ![justifyContent_spaceAround](./images/Tailwind_08.png)

- to achieve the same in Tailwind

```html
<!--look for className tag. Tailwind uses specific class names to add styles. look up class names in their documentation-->

<html>
  <body style="background-color:black;">
    <div className="flex justify-between">
      <!-- tailwind above -->
      <!-- Normal HTML styling below -->
      <!-- <div style="display:flex; justify-content:space-between;"> -->
      <div style="background-color:green;">data in div 1</div>
      <div style="background-color:pink;">data in div 2</div>
      <div style="background-color:blue;">data in div 3</div>
    </div>
  </body>
</html>
```

### grids with Tailwind

```jsx
<html>
  <body style="background-color:black;">
    <div className="grid gird-cols-3">
      <!-- creates a grid with 3 columns. three children get distributed in 3 columns -->
      <div style="background-color:green;">data in div 1</div>
      <div style="background-color:pink;">data in div 2</div>
      <div style="background-color:blue;">data in div 3</div>
    </div>
  </body>
</html>


<html>
  <body style="background-color:black;">
    <div className="grid gird-cols-12">
      <!-- creates a grid with 3 columns. three children get distributed in 3 columns -->
      <div className="col-span-5" style="background-color:green;">data in div 1</div>
      <div className="col-span-6" style="background-color:pink;">data in div 2</div>
      <div className="col-span-1" style="background-color:blue;">data in div 3</div>
      <!-- different elements have different widths-->
    </div>
  </body>
</html>
```

### responsiveness

- `https://tailwindcss.com/docs/responseve-design`

- tailwind takes mobile first approach,i.e. default values in styling will apply to smaller/mobile screens. If we want the app to look different in bigger screens, we need to specify the same.
- In code below, mobile screens will have divs with column width as 12 by default. When screen width goes above sm(small size in pixels defined by tailwind. Check documentation.), the column width will change to 9, when width goes above md col width will become 7, when width is lg or above number of cols will be 5 and so on..

| size | min size |
| :--: | :------: |
|  sm  |  640px   |
|  md  |  768px   |
|  lg  |  1024px  |
|  xl  |  1280px  |
| 2xl  |  1536px  |

```HTML
<html>
  <body style="background-color:black;">
    <div className="grid gird-cols-12">
      <div className="col-span-12 sm:col-span-9 md:col-span-7 lg:col-span-5 xl:col-span-3 2xl:col-span-2" style="background-color:green;">data in div 1</div>
      <div className="col-span-12 sm:col-span-9 md:col-span-7 lg:col-span-5 xl:col-span-3 2xl:col-span-2" style="background-color:pink;">data in div 2</div>
      <div className="col-span-12 sm:col-span-9 md:col-span-7 lg:col-span-5 xl:col-span-3 2xl:col-span-2" style="background-color:blue;">data in div 3</div>
    </div>
  </body>
</html>

```

### Background, font, and other items in tailwind

- There are default colours in tailwind and each has a shade from 50 to 950 values(see documentation)
- You can define your own shades and save in config file.
- Fonts available with specific font sizes - xs,sm,base, lg, xl
- radius values = rounded-s-md, rounded-s-lg, rounded, rounded-s-lg,rounded-full, rounded-s-xl etc.

```HTML
<html>
  <body style="background-color:black;">
    <div className="grid gird-cols-12">
      <div className="col-span-5" style="bg-green-500 text-red-500 text-xs">data in div 1</div>
      <div className="col-span-6" style="bg-pink-50 text-blue-700 text-lg">data in div 2</div>
      <div className="col-span-1" style="bg-blue-700 text-yellow-300 text-xl">data in div 3</div>
    </div>
  </body>
</html>

```

### Installation

- use the official documentation - `www.tailwindcss.com`

- Create react app
- run `npm install`
- `npm install -D tailwindcss postcss autoprefixer`
- `npx tailwindcss init -p`

## TYPESCRIPT

|    Javascript    |   Typescript   |                                                        Comments                                                         |
| :--------------: | :------------: | :---------------------------------------------------------------------------------------------------------------------: |
|  Loosely typed   | Strongly typed | in strongly typed, language cannot change the variable type by itself `let x=10; x="test";` will not work in typescript |
| Interpreted only |    compiled    |            typescript will do 2 types of compiation, converts it to javascript which inturn runs on browsers            |

### Setup

- Global installation (NOT preferred) - `npm install -g typescript`
- Local installation

```bash
#initialization
mkdir <projName> #create project folder
cd projName #navigate inside the folder
npm init -y #initialize node project. Creates package.json file.
npm install -D typescript #installs typescript locally and creates package-lock.json. also adds node_modules folders and contents
npx tsc --init #creates a tsconfig.json file
#update tsconfig.json with following changes
# update outDir -> ./dist/
# update rootDir -->./src/
# remove comments from javascript file --> uncomment 'removeComments: true'

#Optional - installing other dependencies/libraries
npm install express
npm install -D @types/express #installing the declarations (required for libs that give error when importing as `import express from 'express'`)

#write code
touch index.ts #create a typescript file and write code in

#Compilation
npx tsc -b #compiles the ts file and creates a correspoinding js file (index.js)

#Running/ Execution
node index.js
```

### tsconfig.json

- This file contains the configuration defaults.
- `target` - contains the oldest version of ECMA script that should be supported. If you write ts code in the latest format but have the target parameter set to support some older format, during compilation, the js file created will use the syntax as per the older script(for example, let x will change to var x)
- `"rootDir": "./src",` --> where are the typescript files stored.
- `"outDir": "./dist" or "./build"` --> where will the javascript files be created. These files should not be pushed to gihub(as devs will work on typscript files only). They are required when you want to deploy the code. So add `./dist or ./build` folder into .gitignore.
- `removecomments` will remove comments from the javascript files that are created from typescript

### Notes

- Typescript converts .ts files to .js files internally at the time of compilation. This js file runs on the browser.
- Typescript compilers -

  - esbuild
  - tsc(official)
  - swc

- Typescript is a superset of javascript. Everything javascript does can be done in typescript, but not everything that can be done by typescript can be done by javascript.

- Types in typescript

```typescript
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
```

- Interfaces
  - should start with a Capital letter(convention)

```typescript
interface userType {
  firstName: string;
  age: number;
  isAdult: boolean;
}

function greeting2(user: userType) {
  console.log(
    `User has name: ${user.firstName} and age: ${user.age} and isAdult: ${user.isAdult}`,
  );
}

const user3: userType = { firstName: "sdlfkj", age: 12, isAdult: false };

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
```

```typescript
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
```

- TYPES

  - Similar to Interfaces but with additional functionality
  - Allows union of types
  - Allows intersection of types

  ```typescript
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
    name: stirng;
    startDate: Date;
  };

  type Manager = {
    name: stirng;
    department: string;
  };

  type TeamLead = Employee & Manager; //intersection of types

  const lead1: TeamLead = {
    name: "testlead",
    startDate: new Date(),
    department: "software department",
  };
  ```

## POSTGRES DATABASE

### Sql Vs No SQL DBs

- SQL DB
  - hard to setup and change
  - easier to scale
- No SQL DB
  - Easy to setup and change
  - Hard to scale
  - creates inconsistancies in app data
  - runtime errors
- Graph database
  - stores data in the form of graphs
  - for social media apps
  - eg - neo4j
- Vector Database
  - used in ML usecases
  - e.g. - Pinecone

### Postgress Notes

- It is a SQL database

### Setup

- Account creation:

  - in Neon.tech:
    - Create a database on the site and get the connection string.
  - docker(for local db creation):
    - `docker run --name my-postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres`
    - `postgresql://postgres:mysecretpassword@localhost:5432/postgres?sslmode=disable`

- Installing in node project
  - `npm install pg`
  - `npm install -D @types/pg`
- Connecting and operation in DB from project

```typescript
//import module
import { Client } from "pg";

//CREATE DB SCHEMA
CREATE TABLE users (
    id SERIAL PRIMARY KEY, // primary key, increments serially
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP //creates timestamp with timezone
);


//connecting to database
const connectionString = "MyDBConnectionString";
const connectionConfig = {
  user: "postgressUser",
  password: "dbuserPassword",
  port: "port where the DB is listening",
  host: "DB host",
  databse: "databaseName",
}; //add other parameters as required.

//2 ways to connect(use any ONE)
//Method 1:
const pgClient = new Client(connectionString);

//Method 2:
const pgClient = new Client(connectionConfig);

//actually connect. Asynchronous connection
async function connectToDB() {
  await pgClient.connect();
}
connectToDB();

//Read from database
async function readFromDB() {
  const response = await pgClient.query("select * from users;");
  console.log(response); // gets the full object
  consote.log(response.rows); //gets only the data
}

//Update database
async function updateDB() {
  const response = await pgClient.query(
    "update usersTable set username='test' where id='12'",
  );
  console.log(response);
}

//insert into database
async function insertIntoDB() {
  const response = await pgClient.query(
    "insert into usersTable (col1, col2, col3) values (val1, val2, val3);",
  );
  console.log(response);
}

//delete from database
async function deleteFromDB() {
  const response = await pgClient.query("delete from usersTable where id='12'");
  console.log(response);
}

//close DB connection
await client.end(); // Close the client connection
```

```typescript
import { Client } from "pg";
// Async function to fetch user data from the database given an email
async function getUser(email: string) {
  const client = new Client({
    host: "localhost",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "mysecretpassword",
  });

  try {
    await client.connect(); // Ensure client connection is established
    const query = "SELECT * FROM users WHERE email = $1";
    const values = [email];
    const result = await client.query(query, values);

    if (result.rows.length > 0) {
      console.log("User found:", result.rows[0]); // Output user data
      return result.rows[0]; // Return the user data
    } else {
      console.log("No user found with the given email.");
      return null; // Return null if no user was found
    }
  } catch (err) {
    console.error("Error during fetching user:", err);
    throw err; // Rethrow or handle error appropriately
  } finally {
    await client.end(); // Close the client connection
  }
}

// Example usage
getUser("user5@example.com").catch(console.error);
```

### More DB operation

- getting data from one db call for another db call
  ![SQLDatabase_operations_01](./images/sqldatabase_operations_01.png)
  ![SQLDatabase_operations_02](./images/sqldatabase_operations_02.png)

### Relationships in SQL

![Relationships_in_SQL](./images/SQL_Relationships_01.png)

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE addresses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    street VARCHAR(255) NOT NULL,
    pincode VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### Transactions in SQL

- when certain operations require multiple sql queries, it can happen that the connection goes down or server crashes before all queries are run. In this case, we should not be committing any changes and revert all changes made so far. Transactions can help achieve this

```sql
BEGIN; -- Start transaction

INSERT INTO users (username, email, password)
VALUES ('john_doe', 'john_doe1@example.com', 'securepassword123');

INSERT INTO addresses (user_id, city, country, street, pincode)
VALUES (currval('users_id_seq'), 'New York', 'USA', '123 Broadway St', '10001');

COMMIT;
```

```typescript
import { Client } from "pg";

async function insertUserAndAddress(
  username: string,
  email: string,
  password: string,
  city: string,
  country: string,
  street: string,
  pincode: string,
) {
  const client = new Client({
    host: "localhost",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "mysecretpassword",
  });

  try {
    await client.connect();

    // Start transaction
    await client.query("BEGIN");

    // Insert user
    const insertUserText = `
            INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING id;
        `;
    const userRes = await client.query(insertUserText, [
      username,
      email,
      password,
    ]);
    const userId = userRes.rows[0].id;

    // Insert address using the returned user ID
    const insertAddressText = `
            INSERT INTO addresses (user_id, city, country, street, pincode)
            VALUES ($1, $2, $3, $4, $5);
        `;
    await client.query(insertAddressText, [
      userId,
      city,
      country,
      street,
      pincode,
    ]);

    // Commit transaction
    await client.query("COMMIT");

    console.log("User and address inserted successfully");
  } catch (err) {
    await client.query("ROLLBACK"); // Roll back the transaction on error
    console.error("Error during transaction, rolled back.", err);
    throw err;
  } finally {
    await client.end(); // Close the client connection
  }
}

// Example usage
insertUserAndAddress(
  "johndoe",
  "john.doe@example.com",
  "securepassword123",
  "New York",
  "USA",
  "123 Broadway St",
  "10001",
);
```

### SQL injection and prevention

When sending a query to the database, if query is constructed like this:
`insert into tableName (username, password) values( ${username}, ${password});`
This can lead to sql injection when attacker provides password value as `'); DELETE FROM TABLENAME; Insert into tableName (username, password) values ('test123', 'eoiwru');'`

This will make the actual query sent to the database:
`insert into tableName (username, password) values ('someusername' , ''); DELETE FROM TABLENAME; Insert into tableName (username, password) vlaues ('test123', 'eoiwru');`

In the above query, 3 sql statemetns will be executed, 2nd statement will delete all data in the table.

To avoid such things, use the following format to write the query.

```typescript
const insertquery = `insert into tableName (username, password) values ($1, $2)`;
const response = await pgClient.query(insertquery, [username, password]);
```

This will ensure only 1 query is run by the db and complex password values will be taken as a password only.

### JOINS

```text
//INNER JOIN - Returns rows when there is at least one match in both tables. If there is no match, the rows are not returned. It's the most common type of join.
SELECT users.username, addresses.city, addresses.country, addresses.street, addresses.pincode
FROM users
INNER JOIN addresses ON users.id = addresses.user_id;

//LEFT JOIN - Returns all rows from the left table, and the matched rows from the right table.
SELECT users.username, addresses.city, addresses.country, addresses.street, addresses.pincode
FROM users
LEFT JOIN addresses ON users.id = addresses.user_id;

//RIGHT JOIN - Returns all rows from the right table, and the matched rows from the left table.
SELECT users.username, addresses.city, addresses.country, addresses.street, addresses.pincode
FROM users
RIGHT JOIN addresses ON users.id = addresses.user_id;

//FULL JOIN - Returns rows when there is a match in one of the tables. It effectively combines the results of both LEFT JOIN and RIGHT JOIN.
SELECT users.username, addresses.city, addresses.country, addresses.street, addresses.pincode
FROM users
FULL JOIN addresses ON users.id = addresses.user_id;
```

## ORM(Object Relationship Mapping)

- ORM stands for Object-Relational Mapping, a programming technique used in software development to convert data between incompatible type systems in object-oriented programming languages. This technique creates a "virtual object database" that can be used from within the programming language.
- ORMs are used to abstract the complexities of the underlying database into simpler, more easily managed objects within the code
- ORMs let you interact with the database without worrying about the syntax(like sql)
- eg= mongoose, prisma

### Why ORMs

- simpler syntax (no need to remember database specific syntax)
- Switching databases becomes easier (code is abstracted on app side so that similar / same command can be run on new database also)
- Provides type safety/Auto completion( useful in typescript where you can infer the response from database as an object. eg. const user = UserDb.find({email: "<abc@gmail.com>"}; const username = user.username))
- Automatic Migration tracking
  - It keeps a track of all the changes being made to the database schema(adding / removing a column from a table) from the begining of the database.
  - This helps new developers to set up database with the same changes as the original database.
  - The changes are tracked in a folder called `migrations` in the repository(automatically updated by the orms using commands)

### PRISMA

#### Setup

```bash
#base project setup
npm init -y #initialize empty node project
npm install typescript
npx tsc --init #initilize typescript. creates folders and files
#update outdir and rootdir in tsconfig file
touch ./src/index.js #create file and add a console.log statement in it
#update package.json file with script - "dev":"tsc -b && node dist/index.js"
npm run dev

#prisma installation
npm install prisma
npx prisma --init #creates folders required for prisma
#above command creates the following in prisma/schema.prisma file
  # 'generator.provider' is the type of project using the prisma library
  # 'db.provider' is the type of database (postgresql is default. can be mongodb, sql etc)
  # 'db.url' is the connection string that is added to .env file of the project(and is read from here)

# now add schema to prisma/schema.prisma file
```

- if npx prisma init does not work, you may have to downgrage node version. Run the following command to install the specific version on which prisma will work - `nvm install v22.11.0`. This will install the specified version of node in the project folder only(you should run the command in the project folder only)

#### Create /update schema

- in prisma/schema.prisma file, add the following to create schama

```text
.
.
.
model User {
  id        Int     @default(autoincrement()) @id
  username  String  @unique
  password  String
  age       Int?
}

model Todo{
  id          Int @unique
  title       String
  description String?
  completed   Boolean
  userId      Int
  time        DateTime
}

.
.
.
```

- Now migrate the schema to the database (migration here means any changes made to the database schema in the prisma.schema should be sent and executed in the actual database)

#### Migrate Prisma

```bash
npx prisma migrate dev --name 'Initializing the schema'
# this will ask for name. provide 1 word about what you are doing
# This will automatically create a file called prisma/migrations/ datatime_name.sql file

```

- what if a table has some data already and you are adding new columns as migration.
  - Either provide default value to the new column
  - Or make the column optional

```text
.
.
.
model User {
  .
  .
  .
  newCol1 String?  //<--- optional field
  newCol2 String @default("Sample String")  //<---- make default value
}
.
.
.

```

#### Generate Prisma Client

- This will generate a client(this client will give us functions like client.Users.create({name: "user", age: 19}) that will get converted to DB quries depending on the DB type like 'insert into Users (name, age) values(user, 19)')

- `npx prisma generate`

#### Using the client

```typescript
//index.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createUser() {
  const resp = await prisma.user.create({
    data: {
      username: "Testuser",
      password: "testing123",
      age: 20,
    },
  });
  console.log(resp);
}

//createUser();

async function deleteUser() {
  const resp = await prisma.user.delete({
    where: {
      id: 1,
    },
  });

  console.log(resp);
}

async function updateUser() {
  const resp = await prisma.user.update({
    where: { id: 1 },
    data: {
      password: "newpass123",
    },
  });

  console.log(resp);
}

async function findOneData() {
  const oneUser = await prisma.user.findFirst({ where: { id: 1 } });

  console.log(oneUser?.age, oneUser?.username);
}

async function findAll() {
  const allUsers = await prisma.user.findMany();

  console.log(
    allUsers.map((user) => {
      return [user.username, user.password];
    }),
  ); //print all username, password
}

async function findTen() {
  const tenUsers = await prisma.user.findMany({ take: 10 });

  console.log(
    tenUsers.map((user) => {
      return user;
    }),
  );
}

async function getAllUsernames() {
  const allUsernames = await prisma.user.findMany({
    select: {
      username: true, //selets only data that have username
    },
  });

  console.log(
    allUsernames.map((user) => {
      user.username;
    }),
  );
}

async function getTodoWithUser() {
  const resp = await prisma.user.findFirst({
    where: { id: 1 },
    // include: { todos: true },
  });

  console.log(resp);
}

findOneData();
findAll();
findTen();
getAllUsernames();

console.log("Hello Earth!");
}
```

## NextJS

### Overview

- NextJS was a framework that was introduced because of some minor inconveniences in React
- NextJS is both front end and back-end framework (react is a frontend only, so you have to maintain separate front-end and back-end framework)
- NextJS elemenates the requirement for implementing cors.
- Ease of deployment.
- In a React project, you cannot have routing out of the box. (you have to use react-router-dom)
- React is not SEO Optimised (not exactly true today because of React Server components)
- Waterfalling problem:
  - this is when there are many requests to the server before everything is displayed to the user on UI.
  - Eg: in react,
    - client requests for landing page.
    - server sends index.html
    - index.html points to app.jsx and client requests the server again for app.jsx.
    - server responds with this data.
- NextJS allows File based routing
- Bundle size optimizations, Static site Generation
- NextJS app cannot be distributed via CDN.(A server needs to run always to do 'server side rendering')
- Very opinionated (they want you to do some things in a specific way), so very hard to move away from it.

### Creating an App

```bash
npx create-next-app@latest #command to create next js app
#select Yes to all questions except ('would you like to use `src/` directory?', 'would you like to use Turbopac for next dev?' and 'would you like to customize the default import alias?')
```

### Some notes about the App defaults

- `next.config.mjs` - NextJS Confiruration file
- `app/` - contains all code/components/ layouts/routes/APIs
- Routing in NextJS

  - Uses file based routing
    - Eg: `app/page.tsx` can be accessed at `localhost:3000/`
    - `app/signup/page.tsx` can be accessed at `localhost:3000/signup`
    - `app/user/content/page.tsx` can be accessed at `localhost:3000/user/content`
  - Route Groups:
    - If folder structure is has () - `app/(auth)/signin/page.tsx`, `app/(auth)/signup/page.tsx`, then
    - `app/(auth)/signin/page.tsx` can be accessed at `localhost:3000/signin`
    - `app/(auth)/signup/page.tsx` can be accessed at `localhost:3000/signup`
    - This is especially useful when there is a layout.
  - Dynamic Routes:

    - slug: when the url routes are dynamic (eg - `www.example.com/123432` can be represented as `www.example.com/[id]`)
    - folder structure should be - app/blog/[postid]/page.tsx
    - all routes in following format will work(`http://localhost:3000/blog/1` or `http://localhost:3000/blog/sldkfjsldk`)
    - Any other routes will not work (`http://localhost:3000/blog/1/test/123`)
    - Following code will display the blog id in the body and some json placeholder content

    ```typescript
    //apps/blog/[postId]/page.tsx
    import axios from "axios";
    export default async function BlogPage({params}:undefined | string){
      const postId = params.postId;
      const resp = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      const data = resp.data;

      return <div>
        Blog Page {postId}
        <br/>
        Title: {data.title}
        <br />
        Description: {data.body}
      </div>
    }
    ```

  - CatchAll Segment

    - When folder structure has `[...slug]`
    - This will match anything - eg `app/[...posts]/test` or `app/[...posts]/test/user` or `app/[...posts]`
    - Folder structure - `app/[courseId]/[...courseFolders]/page.tsx`

    ```typescript
    //FOLDER STRUCTURE - app/[courseId]/[...courseFolders]/page.tsx
    export default function courseFolders({params}: undefined | string){
      const courseId = params.courseId;
      const folderList = params.courseFolders;

      return <div>
        Course Id: {courseId}
        <br />
        Folder List: {JSON.stringify(folderList)}
      </div>
    }
    ```

- `app/layout.tsx`

  - contains some defaults (like fonts)
  - contains main page layout that is applied to all child pages(child pages can override the setting)
  - individual folders can have their own layout.tsx file that will be applied to all pages in that folder.

  ```typescript
  import type { Metadata } from "next";
  import { Geist, Geist_Mono } from "next/font/google";
  import "./globals.css";

  const geistSans = Geist({ //<-------GET FONTS
    variable: "--font-geist-sans",
    subsets: ["latin"],
  });

  const geistMono = Geist_Mono({//<-------GET FONTS
    variable: "--font-geist-mono",
    subsets: ["latin"],
  });

  export const metadata: Metadata = { //<------- Metadata about the app
    title: "My todo App",
    description: "Description of my todo app",
  };

  export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) { //<--------- Default layout of the pages
    return (
       <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
           <div className = 'border-b p-4'>MyTodos</div>
           {children}
        </body>
      </html>
    );
  }
  ```

  ```typescript
  //LAYOUT FOR SPECIFIC FOLDERS (navbar appears for both signup and signin pages based on the layout.tsx from auth/ folder)

  //Folder structure
  //- app/
  // - auth/
  //  - signup/
  //   - page.tsx
  //  - signin/
  //   - page.tsx
  //  - layout.tsx
  //- components/
  // - navbar.tsx

  //navbar.tsx
  export function Navbar(){
    return <div className= "border-b p-4"> My Todo App </div>
  }

  //layout.tsx
  import {Navbar} from "../../components/navbar";

  export default function AuthLayout({children}){
    return <div>
      <Navbar />
      {children}
    </div>
  }

  //all pages inside auth/ will now have a navbar at the top by default. No need to add the code for it.
  //signup/page.tsx
  //sigin/page.tsx
  ```

### Running the app

- `npm run dev`
- Check all options in `<ProjectRoot>/package.json --> Scripts section`

### Fetching data in NextJS(loading.tsx)

- when FE makes a request, and the next js server needs to get the data from backend, the request is made by the server. The server will wait for the data to be received, it renders the data and then responds to the request from the frontend.
- This means that if there is a lag in receiving the response from backend, nothing is displayed to the user in the client. This could be handled in 2 ways.
  - You can display a loading bar/ text to the user when they wait. This is how it is handled in React. This approach is not SEO optimized(the crawlers from google will not wait for the loading to go await, they will simply think there is nothing being shown in the website and will not rank the site properly.)
  - make the user user wait till response is received(default behaviour in NextJS). The page does not load at all till the response is received and the rendering is completed in the server. This is the right approach for Home pages/ public pages where we need SEO optimization. For internal dashboards(like pages displayed after the user signs in, we should show loader while the user waits. Google crawlers do not need to crawl into such pages.)

```typescript
import axios from "axios";

async function getUserDetails() {
  const response = await axios.get("https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details")
 return response.data;
}

export default async function Home() {
  const userData = await getUserDetails();

  return (
    <div>
      {userData.email}
      {userData.name}
    </div>
  );
}
```

- Alternate approach is to show loading in NextJS

  - Create `loading.tsx` in the same folder as `page.tsx` and add the following code.

  ```typescript
  // app/signin/loading.tsx file

  export default function Loading() {
    return <div className="flex flex-col justify-center h-screen">
        <div className="flex justify-center">
            Loading...
        </div>
    </div>
  }
  ```

  - Now 'Loading...' will be displayed while user waits for the data to be fetched.

### Handling Backend Requests(routes.ts)

- in the code below, we are fetching data from an external backend (url is hitting another server)

```typescript
import axios from "axios";

async function getUserDetails() {
  const response = await axios.get("https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details")
 return response.data;
}

export default async function Home() {
  const userData = await getUserDetails();

  return (
    <div>
      {userData.email}
      {userData.name}
    </div>
  );
}
```

- NodeJS can also do the work of a backend server.

  - Create folder structure for the route (/api/v1/user/details in the api above)

  ```text
  app/
    - api/
      - v1/
        - user/
          - details/
            - route.ts

  ```

- Add following code inside `route.ts`

```typescript
import { NextResponse } from "next/server";

export function GET() {
  //<----------get route
  return NextResponse.json({
    message: "response for GET call",
  });
}

export function POST() {
  //<----------post route
  return NextResponse.json({
    user: "testing",
    emsil: "test@test.com",
  });
}

export function PUT() {
  //<----------put route
  return NextResponse.json({
    message: "data updated",
  });
}

//Other routes
```

- Now replace the initial page.tsx code with the following API route

```typescript
import axios from "axios";

async function getUserDetails() {
  const response = await axios.get("http://localhost:3000/api/v1/user/details"); //<------------------
 return response.data;
}

export default async function Home() {
  const userData = await getUserDetails();

  return (
    <div>
      {userData.email}
      {userData.name}
    </div>
  );
}
```

### Code till now

```typescript
//FOLDER STRUCTURE
/**
<projectName>
  - app/
    - page.tsx --> Home page / landing page
    - lib/
      - db.ts --> Db configuration
    - signin/
      - page.tsx --> signin front end code
    - signup/
      - page.tsx --> signup page frontend code
    - api/
      - v1
        - signup
          - route.ts ---> api routes from signup page
        - signin
          - route.ts ---> api routes from signin page

*/

//=======app/lib/db.ts========
import {PrismaClient} from '@prisma/client'
//following code ensures only 1 instance of db connection is created even if the app hot reloads again and again.
//this problem only occurs in non-prod during development where the app hot reloads everytime something is changed in the app.
const prismaClient: undefined | ReturnType<typeof PrismaClient> = globalThis.prismaClient ?? new PrismaClient();
if(process.env.NODE_ENV !== 'production') globalThis.prismaClient = prismaClient
export default prismaClient;

//=======app/page.tsx=========
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center">
        <h1 className="text-2xl">My Todo Application</h1>
          <Link className="text-md border m-2" href="/signin">Sign In</Link>
          <br />
          <Link className="text-md border m-2" href="/signup">Sign Up</Link>
      </div>
    </>
  );
}

//=======app/signin/page.tsx==
"use client"
import axios from "axios";
import {ChangeEventHandler, useState} from "react";
export default function signin(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return <>
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='broder p-2'>
        <input type="text" placeholder="Username" onChange={e=> {setUsername(e.target.value)}}></input>
        <input type="password" placeholder="Password" onChange={e=> {setPassword(e.target.value)}}></input>
        <button onClick={()=>{
          axios.post("http://localhost:3000/api/v1/signin",{
            username,
            password
          })
        }}>Sign In</button>
      </div>
    </div>
  </>
}

//=======app/signup/page.tsx==
"use client"
import axios from "axios";
import {ChangeEventHandler, useState} from "react";
import {useRouter} from "next/navigation";
export default function signup(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return <>
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='broder p-2'>
        <input type="text" placeholder="Username" onChange={e => {setUsername(e.target.value)}}></input>
        <input type="password" placeholder="Password" onChange={e => {setPassword(e.target.value)}}></input>
        <button onClick={async ()=>{
          await axios.post("http://localhost:3000/api/v1/signup",{
            username,
            password
          })
          router.push("/signin") //Redirect user to signin page after successful signup
        }}>Sign Up</button>
      </div>
    </div>
  </>
}

//=======app/api/v1/signin/route.ts===
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest){
  const requestData = await req.json();
  const username = requestData.username;
  const password = requestData.password;

  console.log(`Signing in with username: ${username} and password: ${password}`);

  return NextResponse.json({
    message:`Sign in successful with username: ${username} and password: ${password}`
  })
}

//=======app/api/v1/signup/route.ts===
import {NextRequest, NextResponse} from "next/server";
import prismaClient from "../../../lib/db.ts";

export async function POST(req: NextRequest){
  const requestData = await req.json();
  const username = requestData.username;
  const password = requestData.password;
  console.log(`Signing up with ${username} and ${password}`);

  await prismaClient.user.create({
    data:{
      username: username,
      password: password
    }
  });

  return NextResponse.json({
    message: `Sign up successful with username: ${username} and password: ${password}`
  })
}
```
