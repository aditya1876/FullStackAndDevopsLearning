import "./App.css";

//STEP 1 - Create Context
import { createContext, useContext, useState } from "react";
const BulbContext = createContext();

function App() {
  const [isBulbOn, setIsBulbOn] = useState(true);
  return (
    <>
      <div>MY REACT APP - STATE EXPERIMENTS</div>
      {/*STEP 2 - Wrap the top level(parent component) with the context component */}
      <BulbContext.Provider
        value={{ isBulbOn: isBulbOn, setIsBulbOn: setIsBulbOn }}
      >
        <LightBulb></LightBulb>
      </BulbContext.Provider>
    </>
  );
}

function LightBulb() {
  return (
    <>
      {/*No need to pass the props anymore. all children of LightBulb have access to the context*/}
      <ShowBulb></ShowBulb>
      <ControlBulb></ControlBulb>
    </>
  );
}

function ShowBulb() {
  //STEP 3- No need to accept props in function args. Can directly use the variable from the context
  const { isBulbOn } = useContext(BulbContext);
  return (
    <>
      <div>Is bulb on?: {isBulbOn ? "Yes" : "No"}</div>
    </>
  );
}

function ControlBulb() {
  const { isBulbOn, setIsBulbOn } = useContext(BulbContext);

  function toggleBulb() {
    setIsBulbOn(!isBulbOn);
  }

  return (
    <>
      <button onClick={toggleBulb}>Toggle Bulb</button>
    </>
  );
}

export default App;
