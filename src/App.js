import React, {useState,useRef, useEffect} from 'react';
import ResultsList from './ResultsList';
import { v4 as uuidv4 } from 'uuid'

function App() {

  //Variables
  const input = useRef();
  const [items,addItems] = useState([])
  const [answer,updateAnswer] = useState(0)
  const [results,addResults] = useState([])

  //Functions

  //Type number into input with button press
  /*function typeNumberTwo(n){

    const number = Number(input.current.value);

    if(typeof number != 'number'){
      console.log(input.current.value);
      input.current.value = 'Enter a Number Please';
    }
    else if(typeof number === 'number'){
      if(n === 1){
        const currentNum = '' + number + 1
        input.current.value = currentNum
      }
      if(n === 2){
        const currentNum = '' + number + 2
        input.current.value = currentNum
      }
      if(n === 3){
        const currentNum = '' + number + 3
        input.current.value = currentNum
      }
    }

  }*/

  function typeNumber(n){
    const number = Number(input.current.value);
    if(typeof number != 'number'){
      console.log(input.current.value);
      input.current.value = 'Enter a Number Please';
    }
    else{
      const currentNum = '' + number + n;
      input.current.value = currentNum;
    }
  }

  //Operators update active mathematical expression 
  function updateExpression(n){
    if(input.current.value === ""){
      if(n === "+"){
        addItems(prev => [...prev.slice(0,-1),"+"]);
      }
      if(n === "-"){
        addItems(prev => [...prev.slice(0,-1),"-"]);
      }
      if(n === "/"){
        addItems(prev => [...prev.slice(0,-1),"/"]);
      }
      if(n === "*"){
        addItems(prev => [...prev.slice(0,-1),"*"]);
      }
    }
    else{
      if(n === '+'){
        const number = Number(input.current.value);
        input.current.value = "";
        addItems(prev => [...prev,number,"+"]);
      }
      if(n === '-'){
        const number = Number(input.current.value);
        input.current.value = "";
        addItems(prev => [...prev,number,"-"]);
      }
      if(n === '/'){
        const number = Number(input.current.value);
        input.current.value = "";
        addItems(prev => [...prev,number,"/"]);
      }
      if(n === '*'){
        const number = Number(input.current.value);
        input.current.value = "";
        addItems(prev => [...prev,number,"*"]);
      }
    }
  }

  //initiates solving of mathematical sequence 
  function giveAnswer(){
    const number = Number(input.current.value);
    addItems(prev => [...prev,number]);
    input.current.value = "";
  }

  function parse(str) {
    /*jslint evil: true */
    return Function(`'use strict'; return (${str})`)()
  }

  //Solves mathematical sequence on update of "items" array when ending with a number
  useEffect(() => {

    if(!isNaN(items[items.length - 1])){
      const newList = items.join('');
      //const answer = eval(newList)
      let answer = parse(newList);
      console.log(answer);
      updateAnswer(answer);
      addItems([answer,"+"]);
    }

  },[items]);

  //Stores answer in "addResults" array to be used for ResultsList
  function saveAnswer(){
    const number = answer
    addResults(prev => [...prev,{id:uuidv4() ,number:number}])
  }

  //Function passed down to Results in order to reuse previous answers 
  function reuse(n){
    input.current.value = n;
  }

  //Resets mathematical expression to 0 to allow for new calculations
  function resetExpression(){
    addItems([]);
  }

  //Deletes most recently types number from input one at a time 
  function deleteNumber(){
    const knat = input.current.value
    const knot = knat.substring(0, knat.length - 1);
    input.current.value = knot
  }

  //UI Elements
  return (
    <>
    <div className='calculator'>
    <input className='' ref={input} placeholder={0} onKeyDown={(event) => event.preventDefault()}></input>
    <div className='number-panel'>
    <button className='number-button' onClick={() => typeNumber(1)}>1</button>
    <button className='number-button' onClick={() => typeNumber(2)}>2</button>
    <button className='number-button' onClick={() => typeNumber(3)}>3</button>
    <button className='number-button' onClick={() => typeNumber(4)}>4</button>
    <button className='number-button' onClick={() => typeNumber(5)}>5</button>
    <button className='number-button' onClick={() => typeNumber(6)}>6</button>
    <button className='number-button' onClick={() => typeNumber(7)}>7</button>
    <button className='number-button' onClick={() => typeNumber(8)}>8</button>
    <button className='number-button' onClick={() => typeNumber(9)}>9</button>
    <button className='number-button' onClick={() => typeNumber(0)}>0</button>
    </div>
    </div>
    <div className='calc-panel'>
    <button className='calc-button' onClick={() => updateExpression('+')}>+</button>
    <button className='calc-button' onClick={() => updateExpression('-')}>-</button>
    <button className='calc-button' onClick={() => updateExpression('/')}>/</button>
    <button className='calc-button' onClick={() => updateExpression('*')}>*</button>
    <button className='calc-button' onClick={() => giveAnswer()}>=</button>
    </div>
    <div className='action-panel'>
    <button className='action-button' onClick={() => deleteNumber()}>Delete</button>
    <button className='action-button' onClick={() => saveAnswer()}>Save</button>
    <button className='action-button' onClick={() => resetExpression()}>Reset</button>
    </div>
    {/*<span>{items}</span>*/}
    <br></br>
    <div className='answers'>
    <span className=''>{answer}</span>
    <br></br>
    <ResultsList results={results} reuse={reuse}/>
    </div>
    </>
  )
}

export default App;