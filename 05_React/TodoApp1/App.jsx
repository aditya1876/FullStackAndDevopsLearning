import { useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([]); //initialize with empty todos array

  function addTodo() {
    let todoList = [];
    //capture all the existing todos in local array todoList
    if (todos.length > 0) {
      for (let i = 0; i < todos.length; i++) {
        todoList.push(todos[i]);
      }
    }

    //add new todo to the local array todoList
    todoList.push({
      title: document.getElementById("id_title").value,
      description: document.getElementById("id_desc").value,
      done: false,
    });

    //set the state variable with local array containing new todo
    setTodos(todoList);

    //alternate way to do everything above(better way!)
    // setTodos([
    //   ...todos,
    //   {
    //     title: document.getElementById("id_title").value,
    //     description: document.getElementById("id_desc").value,
    //     done: false,
    //   },
    // ]);
  }

  return (
    <div>
      <input id="id_title" type="text" placeholder="Title"></input>
      <input id="id_desc" type="text" placeholder="Description"></input>
      <br />
      <button onClick={addTodo}>Add Todo</button>

      {todos.map((todo) => (
        <DisplayTodo
          title={todo.title}
          description={todo.description}
          done={todo.done}
        />
      ))}
    </div>
  );
}

function DisplayTodo(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.description}</h2>
      <h3>{props.done ? "Task completed" : "Task not completed"}</h3>
    </div>
  );
}
