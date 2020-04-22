import React, {useState} from 'react';
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


function App() {
// all expenses
const [expenses, setExpenses] = useState(initialExpenses);
// single expense
const [charge, setCharge] = useState('');
// single amount
const [amount, setAmount] = useState('');

const handleCharge = e =>{
  
  setCharge(e.target.value)
}
const handleAmount = e =>{
  setAmount(e.target.value)
}
const handleSubmit = e =>{
  e.preventDefault(); 
  if(charge !== "" && amount > 0){
    const singleExpense = {id:uuid(),charge, amount};
    setExpenses([...expenses, singleExpense])
    setCharge("")
    setAmount("")
  }else{

  }
}

  return (
    <>
      <Alert/>
      <h1>Budgets calculators</h1>
      <main className="App">
        <ExpenseForm charge={charge} 
        amount ={amount}
        handleAmount={handleAmount}
        handleCharge={handleCharge}
        handleSubmit={handleSubmit}/>
        <ExpenseList expenses = {expenses}/>
      </main>
      <h1>
        Total spending : <span className="total">
          $ {expenses.reduce((acc,curr)=>{
            return (acc += parseInt(curr.amount))
          },0)}
        </span>
      </h1>
     
    </>
  );
}

export default App;
