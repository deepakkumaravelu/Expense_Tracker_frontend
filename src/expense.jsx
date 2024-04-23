import { useState } from "react";
import ExpenseItem from "./components/expenseItem";
import ExpenseForm from "./components/expenseForm";

export default function Expense() {
  const[expenses,setExpenses]=useState([{
    id:1,
    title:"test",
    amount:10
  },{
    id:2,
    title:"test2",
    amount:20
  },{
    id:3,
    title:"test3",
    amount:30
  }])
  
  const deleteExpense=(id)=>{
      setExpenses(expenses.filter((exp)=>exp.id!=id));
  }
  const addExpense=(title,amount)=>{
    console.log({title,amount});
    if(expenses.length!=0){
    var newId=expenses[expenses.length-1].id+1;
    setExpenses([...expenses,{
      id:newId,
      title:title,
      amount:amount
    }])}
    else{
    setExpenses([{
      id:1,
      title:title,
      amount:amount
    }])
    }
  }
  return (
    <>
      <div>
        <div>Expense Tracker</div>
        <div className="balance">Balance: 0</div>
        <div className="income-expense-container">
          <div className="income">
            <span className="title">Income</span>
            <span>0</span>
          </div>
          <div className="block"></div>
          <div className="expense">
            <span className="title">Expense</span>
            <span>0</span>
          </div>
        </div>
       {/* form */}
       <ExpenseForm addExpense={addExpense}/>
      </div>
      {/* <ExpenseItem title={"test"} amount={10}/> */}
      {
        expenses.map(expense=><ExpenseItem
         key={expense.id}
         title={expense.title}
         amount={expense.amount}
         id={expense.id}
         deleteExpense={deleteExpense}/>)
      }
    </>
  );
}
