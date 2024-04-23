const ExpenseItem = () => {

  return (
    <div className="expense-item-container">
      <div className={`expense-item positive`}>
        <div className="expense-title">title</div>
        <div className="expense-amount">amount</div>
      </div>
      <button className="delete-btn">Delete</button>
    </div>
  )
}

export default ExpenseItem