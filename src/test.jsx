import { useRef, useState } from "react";
import "./App.css";
import { RiDeleteBin7Fill } from "react-icons/ri";

function App() {
  const [ExpenseDetails, setExpenseDetails] = useState([
    {
      details: "pen",
      category: "Stationery",
      Ammount: "20",
      date: "01 / 07 / 2024",
    },
  ]);
  const [editingExpense, setEditingExpense] = useState(null);
  const DetailRef = useRef();
  const AmmountRef = useRef();
  const CategoryRef = useRef();
  const DateRef = useRef();

  const handleformSubmit = (e) => {
    e.preventDefault();

    if (editingExpense !== null) {
      // Update existing expense
      const updatedExpenses = ExpenseDetails.map((item) =>
        item.details === editingExpense.details ? { ...item, ...getFormData() } : item
      );
      setExpenseDetails(updatedExpenses);
      setEditingExpense(null);
    } else {
      // Add new expense
      setExpenseDetails((prevExpenseDetails) => [
        ...prevExpenseDetails,
        getFormData(),
      ]);
    }

    // Clear form fields
    clearFormFields();
  };

  const handleEditExpense = (data) => {
    setEditingExpense(data);
    // Populate form fields with the details of the expense being edited
    DetailRef.current.value = data.details;
    CategoryRef.current.value = data.category;
    AmmountRef.current.value = data.Ammount;
    DateRef.current.value = data.date;
  };

  const handleDeleteExpense = (data) => {
    const updatedExpenses = ExpenseDetails.filter((item) => item.details !== data.details);
    setExpenseDetails(updatedExpenses);
  };

  const getFormData = () => {
    return {
      details: DetailRef.current.value,
      category: CategoryRef.current.value,
      Ammount: AmmountRef.current.value,
      date: DateRef.current.value,
    };
  };

  const clearFormFields = () => {
    DetailRef.current.value = "";
    CategoryRef.current.value = "";
    AmmountRef.current.value = "";
    DateRef.current.value = "";
  };

  return (
    <div className="Home">
      <h1>Expense Calculator</h1>
      <div className="container">
        <div className="left">
          <div className="LeftHead">Expense Details</div>
          {ExpenseDetails.map((data, index) => (
            <div className="details" key={index}>
              <div className="details">{data.details}</div>
              <div className="category">{data.category}</div>
              <div className="Ammount">{data.Ammount}</div>
              <div className="Date">{data.date}</div>
              <RiDeleteBin7Fill onClick={() => handleDeleteExpense(data)} />
              <button onClick={() => handleEditExpense(data)}>Edit</button>
            </div>
          ))}
        </div>
        <div className="right">
          <div className="TotalExpense">Total Expense: 500</div>
          <form action="" onSubmit={handleformSubmit}>
            <label htmlFor="Details">Details</label>
            <input type="text" ref={DetailRef} name="Details" />
            <label htmlFor="Category">Choose a Category:</label>
            <select className="Category" id="Category-select" ref={CategoryRef}>
              <option value="">--Please choose an option--</option>
              <option value="Food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="Rent">Rent</option>
              <option value="CardPayment">credit Card Payment</option>
              <option value="Entertainment">Entertainment</option>
            </select>
            <label htmlFor="">Amount</label>
            <input type="number" ref={AmmountRef} />
            <label htmlFor="">Date</label>
            <input type="date" ref={DateRef} />
            <button>{editingExpense ? "Update Details" : "Add Details"}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
