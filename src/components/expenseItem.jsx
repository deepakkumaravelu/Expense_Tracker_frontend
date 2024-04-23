const ExpenseItem = ({title,amount,id,deleteExpense}) => {

  return (
    <div className="expense-item-container">
      <div className={`expense-item ${amount>0?"positive":"negative"}`}>
        <div className="expense-title">{title}</div>
        <div className="expense-amount">{amount}</div>
      </div>
      <button className="delete-btn" onClick={()=>deleteExpense(id)}>Delete</button>
    </div>
  )
}

export default ExpenseItem