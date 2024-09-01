//INITIALIZE AND IMPORT
const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
app.use(express.json());

//APPLICATION LOGIC
function getAllTodos() {
  let filePath = path.resolve("TodoListSimple.json");
  let data = fs.readFileSync(filePath, "utf-8");
  dataJson = JSON.parse(data);
  return dataJson;
}

function createTodo(content) {
  let filePath = path.resolve("TodoListSimple.json");
  let data = fs.readFileSync(filePath, "utf-8");
  dataJson = JSON.parse(data); //convert read data to json
  dataJson["todos"].push(content); //add new todo to content
  const dataTowrite = JSON.stringify(dataJson, null, 2); //convert json data to string(required for writing into file)
  fs.writeFileSync(filePath, dataTowrite); //write to file

  console.log("Data Written back into the file");
  return true;
}

function updateTodo(id, content) {
  let filePath = path.resolve("TodoListSimple.json");
  let data = fs.readFileSync(filePath, "utf-8");
  dataJson = JSON.parse(data);
  dataJson["todos"][id] = content; //update todo at the id
  const dataTowrite = JSON.stringify(dataJson, null, 2);
  fs.writeFileSync(filePath, dataTowrite);

  console.log("Data updated in todo");
  return true;
}

function deleteTodo(id) {
  let filePath = path.resolve("TodoListSimple.json");
  let data = fs.readFileSync(filePath, "utf-8");
  dataJson = JSON.parse(data);
  dataJson["todos"].splice(id, 1);
  const dataToWrite = JSON.stringify(dataJson, null, 2);
  fs.writeFileSync(filePath, dataToWrite);

  console.log("Todo deleted!");
  return true;
}

//ROUTES HANDLER
app.get("/", function (req, res) {
  console.log("Welcome!");

  res.status(200).send("Welcome to the todo app v2");
});

app.get("/todos", function (req, res) {
  console.log("Displaying all todos");
  let todoList = getAllTodos();
  res.status(200).send(todoList["todos"]);
});

app.post("/create-todo", function (req, res) {
  console.log("Creating a todo");

  let content = req.body.todo;
  // content_parsed = JSON.parse(content);
  let result = createTodo(content);
  if (result == true) {
    res.status(200).send("todo created!");
  } else {
    res.status(400).send("Something went wrong in creating the todo!");
  }
});

app.post("/update-todo", function (req, res) {
  console.log("Updating a todo");

  let todo_id = req.body.id;
  let content = req.body.todo;
  let result = updateTodo(todo_id, content);
  if (result == true) {
    res.status(200).send("Todo updated!");
  } else {
    res.status(400).send("Something went wrong in updating the todo!");
  }
});

app.get("/delete-todo", function (req, res) {
  console.log("Deleting a todo...");

  let todo_id = req.query.id;
  let result = deleteTodo(todo_id);
  if (result == true) {
    res.status(200).send("Todo deleted!");
  } else {
    res.status(400).send("Something went wrong in deleting the todo!");
  }
});

//LISTEN ON PORT
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Started server at port: ${PORT}`);
});
