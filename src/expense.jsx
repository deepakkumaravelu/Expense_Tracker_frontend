export default function Expense() {
  
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
      </div>
      {/* list expenses */}
    </>
  );
}
