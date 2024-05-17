import { useContext,useEffect} from "react";
import { UserContext } from "../expense";
const ExpenseForm = ({ addExpense, updateExpense }) => {
  //  const [title,setTitle]=useState("");
  //  const [amount,setAmount]=useState(0);
  const {
    title,
    setTitle,
    amount,
    setAmount,
    showUpdateForm,
    setShowUpdateForm,
    id
  } = useContext(UserContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(title, amount);
    setTitle("");
    setAmount(0);
    console.log("submitted");
  };
  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    updateExpense(title, amount,id);
    setTitle("");
    setAmount(0);
    console.log("updated");
    setShowUpdateForm(false);
  };
  useEffect(() => {
    setTitle(title);
    setAmount(amount);
  }, [showUpdateForm]);
  const handleTitleChange = (e) => {
    // console.log(e.target.value)
    setTitle(e.target.value);
  };
  const handleAmountChange = (e) => {
    // console.log(e.target.value);
    setAmount(e.target.value);
  };
  return (
    <form>
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
      {showUpdateForm ? (
        <button type="submit" onClick={handleSubmitUpdate} disabled={!title}>
          Update Transaction
        </button>
      ) : (
        <button type="submit" onClick={handleSubmit} disabled={!title}>
          Add Transaction
        </button>
      )}
    </form>
  );
};

export { ExpenseForm };
