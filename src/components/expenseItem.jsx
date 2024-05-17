import { useContext, useState } from "react";
import { UserContext } from "../expense";
const ExpenseItem = ({ title, amount, id, deleteExpense}) => {
  // const [showUpdateForm, setShowUpdateForm] = useState(false);
  // const [updatedTitle, setUpdatedTitle] = useState(title);
  // const [updatedAmount, setUpdatedAmount] = useState(amount);
  const {setTitle,setAmount,setShowUpdateForm,setId}=useContext(UserContext);
  const handleUpdateContext = () => {
    setTitle(title);
    setAmount(amount);
    setId(id);
    // updateExpense(updatedTitle, updatedAmount,id);
    setShowUpdateForm(true);
  };
  // const handleUpdate = () => {
  //   updateExpense(updatedTitle, updatedAmount,id);
  //   setShowUpdateForm(false);
  // };

  return (
    <div>
    <div className="expense-item-container">
      <div className={`expense-item ${amount > 0 ? "positive" : "negative"}`}>
        <div className="expense-title">{title}</div>
        <div className="expense-amount">{amount}</div>
      </div>
      <button className="update-btn" onClick={() =>handleUpdateContext()}>Update</button>
      <button
        className="delete-btn"
        onClick={() => {
          if (confirm("Are you sure!") == true) {
            deleteExpense(id);
          } else {
            console.log("cancelled");
          }
        }}
      >
        Delete
      </button>
    </div>
     {/* {showUpdateForm && (
        <div className="popup-overlay">
        <div className="popup">
        <div className="inputbox">
        <input
          type="text"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          type="number"
          value={updatedAmount}
          onChange={(e) => setUpdatedAmount(e.target.value)}
          placeholder="Amount"
        />
        </div>
        <div className="updatebtn">
        <button onClick={handleUpdate}>Update</button>
        <button onClick={() => setShowUpdateForm(false)}>Cancel</button>
        </div>
      </div>
      </div>
    )} */}
    </div>
  );
};

export { ExpenseItem };
