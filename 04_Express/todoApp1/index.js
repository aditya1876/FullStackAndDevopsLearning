//INITIALIZE AND IMPORT
const express = require("express");
const app = express();
app.use(express.json()); //allows access to request body

//APPLICATION LOGIC
let todos = [];

//ROUTES HANDLER
//welcome page
app.get("/", function (req, res) {
  console.log("Todo App 1 started.");
  res.send("Welcome to Todo App");
});

//see all todos
app.get("/todos", function (req, res) {
  console.log("Displaying all todos");
  res.json({
    "all todos": todos,
  });
});

//create todo
app.post("/create-todo", function (req, res) {
  console.log("Creating a todo...");
});

//LISTEN ON PORT
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
