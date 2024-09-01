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
  const todo_content = req.body;
  todos.push(todo_content["todo"]);
  res.send("Todo Created!");
});

//Update todo
app.post("/update-todo/", function (req, res) {
  const id = req.body.id;
  const new_content = req.body.todo;
  if (id == "") {
    console.log("Id value not provided..");
    res.send("Please provide the id to update");
  } else {
    todos[id] = new_content;
    res.send("Update successful!");
    console.log(`Updating todo with id: ${id}`);
  }
});

//Delete Todo
app.get("/delete-todo/", function (req, res) {
  const id = req.query.id;
  if (id == "") {
    console.log("Id value not provided..");
    res.send("Please provide the id to delete");
  } else {
    console.log(`Deleting todo with id: ${id}`);
    todos.splice(id, 1);
    res.send("Deletion successful!");
  }
});

//LISTEN ON PORT
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
