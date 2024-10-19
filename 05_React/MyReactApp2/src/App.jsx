import { useState, useEffect, useRef } from "react";
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
        <div className="item8">
          <h2>Buttons as tabs</h2>
          <ButtonTabs></ButtonTabs>
        </div>
        <div className="item9">
          <h2>Children prop</h2>
          <Child
            children={<div>I am also a child and will be displayed</div>}
          ></Child>
          <Child>
            <div style={{ color: "red" }}>
              <div>Post your thoughts</div>
              <input type="text" />
            </div>
          </Child>
        </div>
        <div className="item10">
          <h2>useRef - Reference by value</h2>
          <RefTimer></RefTimer>
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
  //works when 'strict mode is turned off'
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
      <div>Uncomment code and remove StrictMode to make it work</div>
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
  // const [counter5sec, setCounter5Secs] = useState(0);
  // const [isTimerVisible, setIsTimerVisible] = useState(true);
  //
  // function toggle5Secs() {
  //   setIsTimerVisible((isTimerVisible) => !isTimerVisible);
  // }
  //
  // function countTracker() {
  //   setCounter5Secs((counter5sec) => counter5sec + 1);
  // }
  //
  // useEffect(
  //   function () {
  //     const myclock = setInterval(function(){
  //     setCounter5Secs(counter5secs => counter5Secs + 1);
  //     }, 1000);
  //
  //     return function(){
  //      clearInterval(myclock);
  //     }
  //   }
  //   [counter5sec],
  // );
  //
  // useEffect(function () {
  //   setInterval(toggle5Secs, 5000);
  // }, []);
  //
  // return (
  //   <>
  //     <div>Display timer every 5 seconds:</div>
  //     {isTimerVisible ? <div>{counter5sec}</div> : null}
  //   </>
  // );

  return (
    <>
      <div>Not working as expected</div>
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

function ButtonTabs() {
  const [currentTab, setCurrentTab] = useState("Feed");
  const [tabData, setTabData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let linkToFetch = "";

  useEffect(
    function () {
      setIsLoading((isLoading) => (isLoading = true)); //page will be loading till fetch gets a response, we should show loader till then
      console.log("Fetching data for Tab: " + currentTab);
      if (currentTab === "Feed") {
        linkToFetch = "https://jsonplaceholder.typicode.com/posts/1";
      } else if (currentTab === "Notifications") {
        linkToFetch = "https://jsonplaceholder.typicode.com/posts/2";
      } else if (currentTab === "Messages") {
        linkToFetch = "https://jsonplaceholder.typicode.com/posts/3";
      } else if (currentTab === "Jobs") {
        linkToFetch = "https://jsonplaceholder.typicode.com/posts/4";
      }

      fetch(linkToFetch).then(async (res) => {
        const jsonData = await res.json();
        setTabData(jsonData);
        setIsLoading((isLoading) => (isLoading = false));
      });
    },
    [currentTab],
  );

  return (
    <>
      <button
        onClick={() => {
          setCurrentTab("Feed");
        }}
        style={{ color: currentTab == "Feed" ? "red" : "black" }}
      >
        Feed
      </button>
      <button
        onClick={() => {
          setCurrentTab("Notifications");
        }}
        style={{ color: currentTab == "Notifications" ? "red" : "black" }}
      >
        Notifications
      </button>
      <button
        onClick={() => {
          setCurrentTab("Messages");
        }}
        style={{ color: currentTab == "Messages" ? "red" : "black" }}
      >
        Messages
      </button>
      <button
        onClick={() => {
          setCurrentTab("Jobs");
        }}
        style={{ color: currentTab == "Jobs" ? "red" : "black" }}
      >
        Jobs
      </button>
      <div>{isLoading ? "Loading..." : tabData.title}</div>
    </>
  );
}

function Child({ children }) {
  return (
    <>
      <div
        style={{
          background: "lightblue",
          borderRadius: 10,
          color: "balck",
          padding: 10,
          margin: 10,
        }}
      >
        {children}
      </div>
    </>
  );
}

function RefTimer() {
  const [clock, setClock] = useState(0);
  //let timerval = 0; //will not work - timerval will be reset on every re-render of RefTimer.
  //const [timerval,setTimerval] =useState(0); //will not work - 1 exra re-render will happen when setTimerval is called. It will make timer incorrect
  const timerval = useRef();

  function startClock() {
    let value = setInterval(function () {
      setClock((c) => c + 1);
    }, 1000);
    //timerval = value;
    //setTimerval(value);
    timerval.current = value;
  }

  function pauseClock() {
    clearInterval(timerval.current);
  }

  return (
    <>
      <div>{clock}</div>
      <button onClick={startClock}>Start</button>
      <button onClick={pauseClock}>Pause</button>
    </>
  );
}
