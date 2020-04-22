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
// alert

const [alert, setAlert] = useState({show:false});




// functionality

const handleCharge = e =>{
  
  setCharge(e.target.value)
}
const handleAmount = e =>{
  setAmount(e.target.value)
}

const handleAlert = ({type, text}) =>{
  setAlert({show:true,type,text})
  setTimeout(()=>{
    setAlert({show:false})
  },3000)
}

const handleSubmit = e =>{
  e.preventDefault(); 
  if(charge !== "" && amount > 0){
    const singleExpense = {id:uuid(),charge, amount};
    setExpenses([...expenses, singleExpense])
    handleAlert({type:'success', text:'Item added Successfully!'})
    setCharge("")
    setAmount("")
  }else{
    setAlert({type:'danger', text:'charge can not be empty value, has to be bigger than'})
  }
}

  return (
    <>
    {alert.show && <Alert type={alert.type} text={alert.text}/>}
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
