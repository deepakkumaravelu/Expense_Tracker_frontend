import { useEffect, useState } from "react";
import { ExpenseItem } from "./components/expenseItem";
import { ExpenseForm } from "./components/expenseForm";
import { useCookies } from "react-cookie";
import Logout from "./components/Logout";
import { createContext } from "react";
import "./App.css";
const UserContext = createContext();
function Expense() {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState(0);
  const [outgoing, setOutgoing] = useState(0);
  const [balance, setBalance] = useState(0);
  const [cookies] = useCookies(["token"]);
  const [dummy, setDummy] = useState(false);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/expense/all/${cookies.userId}`, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
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
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
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
        Authorization: `Bearer ${cookies.token}`,
      },
      body: JSON.stringify({
        amount: amount,
        category: title,
        userID: cookies.userId,
        date: new Date(),
      }),
    })
      .then(() => setDummy((prev) => !prev))
      .catch((error) => {
        console.log(error);
      });
  };

  const updateExpense = (title, amount, id) => {
    fetch(`${import.meta.env.VITE_API_URL}/expense/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
      body: JSON.stringify({
        amount: amount,
        category: title,
        userID: cookies.userId,
        date: new Date(),
      }),
    })
      .then(() => setDummy((prev) => !prev))
      .catch((error) => {
        console.log(error);
      });
  };

  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
    if (toggle) {
      document.body.style.backgroundColor = "rgb(138, 138, 138)";
    } else {
      document.body.style.backgroundColor = "ghostwhite";
    }
  };

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [id, setId] = useState(0);
  const [net, setNet] = useState(navigator.onLine);

  useEffect(() => {
    const updateOnlineStatus = () => {
      setNet(navigator.onLine);
    };
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);
  return (
    <UserContext.Provider
      value={{
        title,
        setTitle,
        amount,
        setAmount,
        showUpdateForm,
        setShowUpdateForm,
        id,
        setId,
      }}
    >
      <>
        <div>
          <div className="navout">
            <div>
              <h3>Expense Tracker</h3>
            </div>
            <div>
              <Logout />
            </div>
          </div>
          <div className={`offline-message ${!net ? "active" : ""}`}>
            <center>Offline</center>
          </div>

          {/* <span><button onClick={handleToggle}>toggle</button></span> */}
          <div className="balance">Balance: {balance}</div>
          <div className="income-expense-container" >
            <div className="income"  id="top">
              <span className="title">Income</span>
              <span>{income}</span>
            </div>
            <div className="block"></div>
            <div className="expense">
              <span className="title">Expense</span>
              <span>{outgoing}</span>
            </div>
          </div>
          <ExpenseForm addExpense={addExpense} updateExpense={updateExpense} />
        </div>
        {expenses
          .slice()
          .reverse()
          .map((expense) => (
            <ExpenseItem
              key={expense._id}
              title={expense.category}
              amount={expense.amount}
              id={expense._id}
              deleteExpense={deleteExpense}
            />
          ))}
      </>
    </UserContext.Provider>
  );
}
export { Expense, UserContext };
