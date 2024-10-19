import { useRef } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";

export default function App() {
  //cloning - https://allen.in
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/*Single route that implements layout in react. all other routes are its children*/}
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Landing />} />
            <Route
              path="/neet/online-coaching-class-11"
              element={<Class11Program />}
            />
            <Route
              path="/neet/online-coaching-class-12"
              element={<Class12Program />}
            />
            {/*If any route other than the above is accessed, we should display page not found*/}
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

function Layout() {
  return (
    <>
      <div style={{ height: "100vh" }}>
        {/*HEADER*/}
        <div style={{ height: "10vh" }}>WEBSITE LOGO</div>
        {/*NAVBAR*/}
        <div style={{ height: "10vh" }}>
          <Link to="/" style={{ padding: 10 }}>
            HomePage
          </Link>
          <Link to="/neet/online-coaching-class-11" style={{ padding: 10 }}>
            NEET Class 11
          </Link>
          <Link to="/neet/online-coaching-class-12" style={{ padding: 10 }}>
            NEET Class 12
          </Link>
        </div>
        {/*CONTENT*/}
        <div style={{ height: "70vh" }}>
          {/*Outlet is builtin component that will display the children fo the Layout component*/}
          <Outlet />
        </div>
        {/*FOOTER*/}
        <div style={{ height: "10vh" }}>Footer | Contact Us</div>
      </div>
    </>
  );
}

function Landing() {
  const inputRef = useRef();
  function focusOnInput() {
    // document.getElementById("id_username").focus();
    inputRef.current.focus();
  }

  return (
    <>
      <div>Welcome to clone of Allen.in</div>
      <div>
        <input
          ref={inputRef}
          id="id_username"
          type="text"
          placeholder="Username"
        />
        <input type="text" placeholder="Password" />
        <button onClick={focusOnInput}>Submit</button>
      </div>
    </>
  );
}

function Class11Program() {
  return (
    <>
      <div>You are in NEET - Class 11 Program</div>
    </>
  );
}

function Class12Program() {
  return (
    <>
      <div>You are in NEET - Class 12 Program</div>
    </>
  );
}

function PageNotFound() {
  return (
    <>
      <div>Sorry page not found 404</div>
    </>
  );
}
