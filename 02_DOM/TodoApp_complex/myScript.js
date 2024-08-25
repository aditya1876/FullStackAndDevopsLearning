console.log("RUNNING MY TODO APP - V3");

let counter = 0;

function addTodo() {
  const todoText = document.querySelector("input").value;

  const spanEle = document.createElement("span");
  spanEle.innerHTML = todoText;
  const buttonEle = document.createElement("button");
  buttonEle.innerHTML = "Delete";
  const divEle = document.createElement("div");

  divEle.appendChild(spanEle);
  divEle.appendChild(buttonEle);

  document.querySelector("body").appendChild(divEle);

  console.log("Adding a Todo item with text: " + todoText);
}
