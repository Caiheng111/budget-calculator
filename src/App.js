import React from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert';
import uuid from 'uuid/v4';


const initialExpenses=[
  {id:uuid(), charge:"rent",amount:1600},
  {id:uuid(), charge:"car",amount:1200},
  {id:uuid(), charge:"credit card bill",amount:1100},
]
console.log(initialExpenses);



function App() {
  return (
    <>
      <Alert/>
      <ExpenseForm/>
      <ExpenseList/>
    </>
  );
}

export default App;
