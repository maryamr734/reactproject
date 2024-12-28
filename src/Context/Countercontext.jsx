import { createContext, useState } from "react";
import Home from "../components/Home/Home";
import Products from "../components/Products/Products";


  export let CounterContext=createContext(0);


  export default function CounterContextProvider(props){

 const[Counter,setCounter]=useState(0);
 const[Username,setUsername]=useState('');



 function changeCounter(){
 setCounter(Math.random)
 }

 return (
  <CounterContext.Provider value={{ Counter, Username , setCounter}}>
    {props.children}
  </CounterContext.Provider>
);

 }

 