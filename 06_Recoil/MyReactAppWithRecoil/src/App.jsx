import "./App.css";
import { createContext, useContext, useState } from "react";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";

export default function App() {
  return (
    <>
      <div className="grid-container">
        <div className="item1">
          <h2>MY REACT APP WITH RECOIL</h2>
        </div>
        <div className="item2">
          <h4>Counter with ContextAPI</h4>
          <Parent></Parent>
        </div>
        <div className="item3">
          <RecoilRoot>
            <h4>Counter with Recoil</h4>
            <RecoilParent></RecoilParent>
          </RecoilRoot>
        </div>
        <div className="item4">
          <RecoilRoot>
            <h4>Counter with Selector</h4>
            <CounterBySelector />
          </RecoilRoot>
        </div>
        <div className="item5">
          <RecoilRoot>
            <h4>Asynchronous Data queries in Recoil</h4>
            <AsyncDataQueries></AsyncDataQueries>
          </RecoilRoot>
        </div>
        {/* <div className="item6"> */}
        {/*   <RecoilRoot> */}
        {/*     <h4>Displaying mulitple items using AtomFamily</h4> */}
        {/*     <AtomFamilyRecoil></AtomFamilyRecoil> */}
        {/*   </RecoilRoot> */}
        {/* </div> */}
      </div>
    </>
  );
}

/*Item2>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
function Parent() {
  return (
    <>
      <CounterWithContextAPI>
        <IncCount></IncCount>
        <DecCount></DecCount>
        <ResetCount></ResetCount>
        <ValueCount></ValueCount>
      </CounterWithContextAPI>
    </>
  );
}

const CounterContext = createContext();
function CounterWithContextAPI({ children }) {
  const [count, setCount] = useState(0);

  return (
    <>
      <CounterContext.Provider value={{ count, setCount }}>
        {children}
      </CounterContext.Provider>
    </>
  );
}

function IncCount() {
  const { count, setCount } = useContext(CounterContext);

  return (
    <>
      <button
        onClick={() => {
          setCount((c) => c + 1);
        }}
      >
        Increase
      </button>
    </>
  );
}

function DecCount() {
  const { count, setCount } = useContext(CounterContext);

  return (
    <>
      <button
        onClick={() => {
          setCount((c) => c - 1);
        }}
      >
        Decrease
      </button>
    </>
  );
}

function ResetCount() {
  const { count, setCount } = useContext(CounterContext);

  return (
    <>
      <button
        onClick={() => {
          setCount((c) => 0);
        }}
      >
        Reset
      </button>
    </>
  );
}

function ValueCount() {
  const { count, setCount } = useContext(CounterContext);

  return (
    <>
      <div>Counter Value: {count}</div>
    </>
  );
}

/*Item2<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
/*Item3>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
/*Create atoms in <projectRoot>/src/store/atoms/counter.js*/
import { counterAtom } from "./store/atoms/counter.js";

function RecoilParent() {
  return (
    <>
      <IncRecoilCounter />
      <DecRecoilCounter />
      <ResetRecoilCounter />
      <DisplayValueRecoilCounter />
    </>
  );
}

function IncRecoilCounter() {
  const setCount = useSetRecoilState(counterAtom); //get function to set state for recoil atom

  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>Increase</button>
    </>
  );
}

function DecRecoilCounter() {
  const setCount = useSetRecoilState(counterAtom);

  return (
    <>
      <button onClick={() => setCount((c) => c - 1)}>Decrease</button>
    </>
  );
}

function ResetRecoilCounter() {
  const setCount = useSetRecoilState(counterAtom);

  return (
    <>
      <button onClick={() => setCount((c) => 0)}>Reset</button>
    </>
  );
}

function DisplayValueRecoilCounter() {
  const count = useRecoilValue(counterAtom); //function to get atom value from recoil

  return (
    <>
      <div>Count value: {count}</div>
    </>
  );
}
/*Item3<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
/*Item4>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
import { isEvenSelector } from "./store/selectors/isEvenSelector.js";
function CounterBySelector() {
  return (
    <>
      <IncButtonSelector />
      <DecButtonSelector />
      <DisplayCounterValueSelector />
      <DisplayIsEvenValueSelector />
      {/*
       */}
    </>
  );
}

function IncButtonSelector() {
  const setCount = useSetRecoilState(counterAtom);

  return (
    <>
      <button
        onClick={() => {
          setCount((c) => c + 2);
        }}
      >
        Increase By 2
      </button>
    </>
  );
}

function DecButtonSelector() {
  const setCount = useSetRecoilState(counterAtom);

  return (
    <>
      <button
        onClick={() => {
          setCount((c) => c - 1);
        }}
      >
        Decrease by 1
      </button>
    </>
  );
}

function DisplayCounterValueSelector() {
  const count = useRecoilValue(counterAtom);

  return (
    <>
      <div>Counter Value: {count}</div>
    </>
  );
}

function DisplayIsEvenValueSelector() {
  const isEven = useRecoilValue(isEvenSelector);

  return (
    <>
      <div>{isEven ? "Even" : "Odd"}</div>
    </>
  );
}
/*Item4<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
/*Item5>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
import { dataAtom } from "./store/atoms/dataAtom.js";
function AsyncDataQueries() {
  const postData = useRecoilValue(dataAtom);

  return (
    <>
      <div>Post Title: {postData.title}</div>
    </>
  );
}
/*Item5<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
/*Item6>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
// import { todosAtomFamily } from "./store/atoms/todosAtomFamily.js";
// function AtomFamilyRecoil() {
//   return (
//     <>
//       <Todo id={1} />
//       <Todo id={3} />
//     </>
//   );
// }
//
// function Todo(id) {
//   const todoData = useRecoilValue(todosAtomFamily(id));
//
//   return (
//     <>
//       <div>testing</div>
//       <div>Displaying Todo with id: {id}</div>
//       <div>Todo Title: {todoData.title}</div>
//       <div>Todo Desc:{todoData.desc}</div>
//       <div>{todoData.completed ? "Done" : "Not Done"}</div>
//     </>
//   );
// }
/*Item6<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
