import { useEffect, useState } from "react";
import {ExpenseItem} from "./components/expenseItem";
import {ExpenseForm} from "./components/expenseForm";
import {Link} from "react-router-dom"
import { useCookies } from "react-cookie";
import Logout from "./components/Logout";


export default function Expense() {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState(0);
  const [outgoing, setOutgoing] = useState(0);
  const [balance, setBalance] = useState(0);
  const [cookies]=useCookies(['token'])
  const [dummy, setDummy] = useState(false);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/expense/all/${cookies.userId}`,{
      headers:{
        'Authorization':`Bearer ${cookies.token}`
      }
    })
      .then((res) => res.json())
      .then((res) => setExpenses(res))
      .catch((error) => console.log(error));
  }, [dummy]);
  useEffect(() => {
    let income = 0;
    let expense = 0;
    expenses.forEach((exp) => {
      if (exp.amount > 0) {
        income += parseFloat(exp.amount);
      } else {
        expense += parseFloat(exp.amount);
      }
    });
    setBalance(income + expense);
    setIncome(income);
    setOutgoing(expense);
  }, [expenses]);
  const deleteExpense = (id) => {
    // setExpenses(expenses.filter((exp) => exp.id != id));
    fetch(`${import.meta.env.VITE_API_URL}/expense/delete/${id}`, {
      method: "DELETE",
      headers:{
        'Authorization':`Bearer ${cookies.token}`
      }
    })
      .then(() => setDummy((prev) => !prev))
      .catch((error) => {
        console.log(error);
      });
  };

  const addExpense = (title, amount) => {
 
    fetch(`${import.meta.env.VITE_API_URL}/expense/new/${cookies.userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization':`Bearer ${cookies.token}`
      },
      body: JSON.stringify({
        amount: amount,
        category: title,
        userID:cookies.userId,
        date: new Date(),
      }),
    })
      .then(() => setDummy((prev) => !prev))
      .catch((error) => {
        console.log(error);
      });
  };
  
  const updateExpense = (title,amount,id) => {
 
    fetch(`${import.meta.env.VITE_API_URL}/expense/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Authorization':`Bearer ${cookies.token}`
      },
      body: JSON.stringify({
        amount: amount,
        category: title,
        userID:cookies.userId,
        date: new Date(),
      }),
    })
      .then(() => setDummy((prev) => !prev))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div>
        <div className="navout">
        <div><h3>Expense Tracker</h3></div>
        <div><Logout/></div>
        </div>
        <div className="balance">Balance: {balance}</div>
        <div className="income-expense-container">
          <div className="income">
            <span className="title">Income</span>
            <span>{income}</span>
          </div>
          <div className="block"></div>
          <div className="expense">
            <span className="title">Expense</span>
            <span>{outgoing}</span>
          </div>
        </div>
        {/* form */}
        <ExpenseForm addExpense={addExpense} />
      </div>
      {/* <ExpenseItem title={"test"} amount={10}/> */}
      {expenses.slice().reverse().map((expense) => (
        <ExpenseItem
          key={expense._id}
          title={expense.category}
          amount={expense.amount}
          id={expense._id}
          deleteExpense={deleteExpense}
          updateExpense={updateExpense}
        />
      ))}

    </>
  );
}
