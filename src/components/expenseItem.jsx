
const ExpenseItem = ({ title, amount, id, deleteExpense }) => {
  return (
    <div className="expense-item-container">
      <div className={`expense-item ${amount > 0 ? "positive" : "negative"}`}>
        <div className="expense-title">{title}</div>
        <div className="expense-amount">{amount}</div>
      </div>
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
  );
};

export { ExpenseItem };
