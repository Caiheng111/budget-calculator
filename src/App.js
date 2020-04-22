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
// edit
const [edit, setEdit]=useState(false);

const [id, setId] =useState(0);











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

//clear all items

const clearItems =()=>{
  setExpenses([]); 
  handleAlert({type:'danger', text:'All item deleted!'})

}

// delete one item
const handleDelete=(id) =>{
  const tempExpense = expenses.filter(item=> item.id !==id)
  setExpenses(tempExpense);
  handleAlert({type:'danger', text:'Item deleted!'})

}

// edit one item
const handleEdit=(id) =>{
const expense= expenses.find(item=>item.id ===id)
const {charge, amount}= expense;
setCharge(charge)
setAmount(amount)
setEdit(true)
setId(id)
}



const handleSubmit = e =>{
  e.preventDefault(); 
  if(charge !== "" && amount > 0){
    if(edit){
      const tempExpenses= expenses.map(item =>{
        return  item.id ===id ? {...item,charge,amount}: item 
      })
      setExpenses(tempExpenses)
      setEdit(false)
      handleAlert({type:'success', text:'Item edited Successfully!'})
    }
    else{
      const singleExpense = {id:uuid(),charge, amount};
      setExpenses([...expenses, singleExpense])
      handleAlert({type:'success', text:'Item added Successfully!'})

    }
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
        handleSubmit={handleSubmit}
        edit={edit}/>
        <ExpenseList 
        expenses = {expenses} 
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        clearItems={clearItems}
        />
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
