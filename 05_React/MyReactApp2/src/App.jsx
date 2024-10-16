import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  return (
    <>
      <div className="grid-container">
        <div className="item1">MY REACT APP 2</div>
        <div className="item2">
          <h2>Counter with increment, decrement and reset buttons</h2>
          <IncrementDecrement></IncrementDecrement>
        </div>
        <div className="item3">
          <h2>Timer</h2>
          <Timer></Timer>
        </div>
        <div className="item4">
          <h2>Timer that only displays even counts</h2>
          <DisplayFor5Secs></DisplayFor5Secs>
        </div>
        <div className="item5">
          <h2>Text that can be toggled in display</h2>
          <ToggleText></ToggleText>
        </div>
        <div className="item6">
          <h2>Add posts with button</h2>
          <AddPosts></AddPosts>
        </div>
        <div className="item7">
          <h2>Notification Counter</h2>
          <NotificationCounter></NotificationCounter>
        </div>
      </div>
    </>
  );
}

function IncrementDecrement() {
  const [count, setCount] = useState(0);

  function incrementCounter() {
    setCount((count) => count + 1);
  }

  function decrementCounter() {
    setCount((count) => count - 1);
  }

  function resetCounter() {
    setCount((count) => 0);
  }

  return (
    <>
      <div>
        <span>
          <h3>Counter: </h3>
          <h3>{count}</h3>
        </span>
      </div>
      <div>
        <button onClick={incrementCounter} style={{ margin: "5px" }}>
          Increment
        </button>
        <button onClick={decrementCounter} style={{ margin: "5px" }}>
          Decrement
        </button>
        <button onClick={resetCounter} style={{ margin: "5px" }}>
          Reset
        </button>
      </div>
    </>
  );
}

function Timer() {
  // const [countTimer, setCountTimer] = useState(0);
  //
  // function increaseCount() {
  //   setCountTimer((countTimer) => countTimer + 1);
  // }
  //
  // useEffect(function () {
  //   setInterval(increaseCount, 1000);
  // }, []);
  //
  // return (
  //   <>
  //     <div>
  //       <h3>Timer: </h3>
  //       <h3>{countTimer}</h3>
  //     </div>
  //   </>
  // );

  return (
    <>
      <div>Does not work as expected</div>
    </>
  );
}

function ToggleText() {
  const [isVisible, setIsVisible] = useState(true);

  function toggle_text() {
    setIsVisible((isVisible) => !isVisible);
  }

  return (
    <>
      {isVisible == true ? <div>Text to be toggled</div> : null}
      <button onClick={toggle_text}>Toggle Text</button>
    </>
  );
}

function DisplayFor5Secs() {
  return (
    <>
      <div>Display timer every 5 seconds - not implemented</div>
    </>
  );
}

function AddPosts() {
  const [posts, setPosts] = useState([]);
  let postCount = 0;

  function add_posts() {
    postCount++;
    setPosts((posts) => [...posts, `This is post number: ${postCount}`]);
  }

  function delete_posts() {
    postCount--;
    setPosts((posts) => posts.slice(0, -1));
  }

  const showAllPosts = posts.map((post) => <div>{post}</div>);

  return (
    <>
      <button onClick={add_posts}>Add Post</button>
      <button onClick={delete_posts}>Delete Post</button>
      <div>{showAllPosts}</div>
    </>
  );
}

function NotificationCounter() {
  const [count, setCount] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  function notification_counter() {
    setCount((c) => c + 1);
    setIsVisible((isVisible) => true);
  }

  function clear_notifications() {
    setIsVisible((isVisible) => false);
    setCount((c) => 0);
  }

  return (
    <>
      <div>
        <div>
          <img
            style={{ cursor: "pointer" }}
            src="https://cdn-icons-png.flaticon.com/512/3239/3239958.png"
            width={40}
            onClick={clear_notifications}
          />
          {isVisible ? (
            <div
              style={{
                background: "red",
                borderRadius: "20px",
                width: "20px",
                height: "20px",
              }}
            >
              {count}
            </div>
          ) : null}
        </div>

        <button onClick={notification_counter}>Notify</button>
      </div>
    </>
  );
}
