import { useState } from "react";

const ExpenseForm = ({addExpense}) => {
 const [title,setTitle]=useState("");
 const [amount,setAmount]=useState(0);
const handleSubmit=(e)=>{
e.preventDefault();
addExpense(title,amount);
setTitle("");
setAmount(0);
console.log("submitted");
}
const handleTitleChange=(e)=>{
  // console.log(e.target.value)
  setTitle(e.target.value);
}
const handleAmountChange=(e)=>{
  // console.log(e.target.value);
  setAmount(e.target.value);
}
  return (
    <form >
      <div className="input-container">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div className="input-container">
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
        />
      </div>
      <button type="submit" onClick={handleSubmit}>Add Transaction</button>
    </form>
  );
};

export default ExpenseForm;
