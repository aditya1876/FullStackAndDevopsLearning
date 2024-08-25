console.log("Running MY TODO APP");
let counter = 0;

function deleteTodo(c) {
  const elementId = "#todo_" + c;
  const elementToDelete = document.querySelector(elementId);

  //delete the element
  elementToDelete.parentNode.removeChild(elementToDelete);

  console.log("Deleted element with id: " + elementId);
}

function addTodo() {
  counter = counter + 1;
  //get text to add to todo
  const todoText = document.querySelector("#newTodo").value;

  //create new element, add text to it, attach to dom
  const newTodoElement = document.createElement("div");
  newTodoElement.setAttribute("id", "todo_" + counter);

  // newTodoElement.innerHTML = todoText; //simple
  newTodoElement.innerHTML =
    "<div>" +
    todoText +
    "</div><button onclick='deleteTodo(" +
    counter +
    ")'> Delete </button>";
  document.querySelector("body").appendChild(newTodoElement);

  console.log("Created a new todo item with text: " + todoText);
}
