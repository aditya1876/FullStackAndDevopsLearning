import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <h1>My Sample React App</h1>
      <Counter></Counter>
    </>
  );

  function Counter() {
    //state
    const [count, setCount] = useState(0); //create state variable. initialize 'count' to 0

    function increaseCount() {
      setCount(count + 1);
    }

    function decreaseCount() {
      setCount(count - 1);
    }

    function resetCount() {
      setCount(0);
    }

    //Component
    return (
      <div>
        <span>
          <h2>My Counter: </h2>
          <h3>{count}</h3>
        </span>
        <span>
          <button onClick={increaseCount}>Increment</button>
          <button onClick={decreaseCount}>Decrement</button>
          <button onClick={resetCount}>Reset</button>
        </span>
      </div>
    );
  }
}

export default App;
