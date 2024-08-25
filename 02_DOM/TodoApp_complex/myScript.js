console.log("RUNNING MY TODO APP - V3");

let counter = 0;
let todoList = [];

// function addTodo() {
//   const todoText = document.querySelector("input").value;
//
//   const spanEle = document.createElement("span");
//   spanEle.innerHTML = todoText;
//   const buttonEle = document.createElement("button");
//   buttonEle.innerHTML = "Delete";
//   const divEle = document.createElement("div");
//
//   divEle.appendChild(spanEle);
//   divEle.appendChild(buttonEle);
//
//   document.querySelector("body").appendChild(divEle);
//
//   console.log("Adding a Todo item with text: " + todoText);
// }

//Create HTML dynamically and display all Todos
function renderTodos() {
  let todoText;
  let spanEle, buttonEle, divEle;

  //remove all todos before rendering again otherwise todos will get appeded to existing data
  const wrapperDiv = document.querySelector("#wrapper");
  wrapperDiv.parentNode.removeChild(wrapperDiv);

  //create new wrapper element
  todowrapper = document.createElement("div");
  todowrapper.setAttribute("id", "wrapper");

  for (let i = 1; i <= todoList.length; i++) {
    todoText = todoList[i - 1];

    //create html elements to display
    spanEle = document.createElement("span");
    buttonEle = document.createElement("button");
    divEle = document.createElement("div");

    //add attributes to the elements
    spanEle.setAttribute("id", "span_" + i);
    spanEle.innerHTML = todoText;
    buttonEle.setAttribute("id", "button_" + i);
    buttonEle.setAttribute("onclick", "deleteTodo(todo_" + i + ")");
    buttonEle.innerHTML = "Delete";
    divEle.setAttribute("id", "todo_" + i);

    //create structure
    divEle.appendChild(spanEle);
    divEle.appendChild(buttonEle);
    todowrapper.appendChild(divEle);
  }

  //append all todos to document
  document.querySelector("#all_todos").appendChild(todowrapper);

  console.log("Displaying all todos. Total todos: [" + todoList.length + "].");
}

//Function to add a new Todo
function addTodo() {
  //capture the todo content from UI.
  const todoText = document.querySelector("input").value;

  //add to the list of todos
  todoList.push(todoText);

  console.log("Added new todo: [" + todoText + "]");

  //now render the complete list on UI
  renderTodos();
}

//Function to delete a todo
function deleteTodo(todo_id) {
  //delete the todo from the list
  const id = String(todo_id).split("_")[1];
  todoList.splice(id, 1);

  console.log("Deleted todo item: [" + todoList[id] + "]");

  //render all todos
  renderTodos();
}

///Function to Edit the todo
//function editTodo(todo_id){
//  const itemToEdit = document.getElementById(todo_id);
//
//
//}
