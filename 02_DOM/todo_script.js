console.log("running todo script");

//accessing data from UI
//for input fields
const inputField = document.querySelector("input"); //gets the first input element
console.log("Value in input field:" + inputField.value);

//for non-input fields
const firstTodo = document.querySelector("h4"); //gets first h4 element
console.log(firstTodo.innerHTML);
console.log("Button text:" + document.querySelector("button").innerHTML);

//QuerySelectorAll
//Gets all the elements of the searched type
const all = document.querySelectorAll("h4");
console.log("1st todo: " + all[0].innerHTML);
console.log("2nd todo: " + all[1].innerHTML);
// console.log("3rd todo: " + all[2].innerHTML); //gives error as element does not exist

//Get the value of the todo provided in input vbox on click of button
function getTodo() {
  const todoItemVal = document.querySelector("#getTodo").value;
  console.log("Adding a new TODO item: " + todoItemVal);
}

//getElementById(), getElementByClassName(), getElementsByClassName()
console.log(
  "Todo Heading using querySelector: " +
    document.querySelector("#heading").innerHTML,
);
console.log(
  "Todo Heading using getElementById: " +
    document.getElementById("heading").innerHTML,
);
console.log(
  "Title using querySelector: " +
    document.querySelector(".titleClass").innerHTML,
);
console.log(
  "Title using getElementByClassName: " +
    document.getElementsByClassName("titleClass").innerHTML,
);
//both of the above lines do the same thing. So, it may be better to use querySelector with
//"#id_value" than remembering another function for selecting by id or selecting by class.

//Adding a counter to the page that udates dynamically
let c = 0;
function count() {
  c = c + 1;
  document.querySelector("#counter").innerHTML = c;
  console.log("Counter value: " + c);
}
setInterval(count, 1000);

//DELETING ELEMENTS
//Cannot delete the element directly. YOu can only delete the
//child of an element. so to delete a particular element, select
//the parent of the element and then delete the child.

function deleteTodo(index) {
  const elementTodelete = document.querySelector("#todo-" + index);

  //go to parent and then delete the child matching the condition
  // elementTodelete.parentNode.removeChild(elementTodelete);

  //another option below
  document.querySelector("#parent").removeChild(elementTodelete);

  console.log("Element is deleted");
}

//CREATING ELEMENTS
//involves 2 steps. Step 1: create the element. Step 2: Append the element
//to the dom

function addTodo() {
  //get todo text from input
  const todoText = document.querySelector("#newTodo").innerHTML;
  //add it as a todo item
  const newEle = document.createElement("div");
  // newEle.innerHTML = "new todo data";
  newEle.innerHTML = document.querySelector("#newTodo").value;
  console.log("adding new todo with content: " + newEle.innerHTML);
  //append the newly created element to the dom
  document.querySelector("body").appendChild(newEle);
}
