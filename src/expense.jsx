import { useEffect, useState } from "react";
import ExpenseItem from "./components/expenseItem";
import ExpenseForm from "./components/expenseForm";

export default function Expense() {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState(0);
  const [outgoing, setOutgoing] = useState(0);
  const [balance, setBalance] = useState(0);
  const [dummy, setDummy] = useState(false);
  useEffect(() => {
    fetch("http://localhost:8080/expense/all/6624f10e362f7c4e11f9dab9")
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
    fetch(`http://localhost:8080/expense/delete/${id}`, {
      method: "DELETE"
    })
      .then(() => setDummy((prev) => !prev))
      .catch((error) => {
        console.log(error);
      });
  };
  const addExpense = (title, amount) => {
    // console.log({title,amount});
    // if(expenses.length!=0){
    // var newId=expenses[expenses.length-1].id+1;
    // setExpenses([...expenses,{
    //   id:newId,
    //   title:title,
    //   amount:amount
    // }])}
    // else{
    // setExpenses([{
    //   id:1,
    //   title:title,
    //   amount:amount
    // }])
    // }
    fetch("http://localhost:8080/expense/new/6624f10e362f7c4e11f9dab9", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount,
        category: title,
        userID: "6624f10e362f7c4e11f9dab9",
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
        <div>Expense Tracker</div>
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
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense._id}
          title={expense.category}
          amount={expense.amount}
          id={expense._id}
          deleteExpense={deleteExpense}
        />
      ))}
    </>
  );
}
