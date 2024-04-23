const ExpenseForm = () => {
 

  return (
    <form >
      <div className="input-container">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
        />
      </div>
      <div className="input-container">
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
        />
      </div>
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default ExpenseForm;
