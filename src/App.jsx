import { useRef, useState } from "react";
import "./App.css";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { RiEdit2Fill } from "react-icons/ri";
import { LiaRupeeSignSolid } from "react-icons/lia";


import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [ExpenseDetails, setExpenseDetails] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [totalExpense, setTotalExpense] = useState(0);
  const DetailRef = useRef();
  const AmmountRef = useRef();
  const CategoryRef = useRef();
  const DateRef = useRef();

  const handleformSubmit = (e) => {
    e.preventDefault();
    let newExpenseAmmount = parseFloat(AmmountRef.current.value);
    if (editingExpense !== null) {
      // Update existing expense
      const updatedExpense = {
        details: DetailRef.current.value,
        category: CategoryRef.current.value,
        Ammount: AmmountRef.current.value,
        date: DateRef.current.value,
      };
      const updatedExpenses = ExpenseDetails.map((item) =>
        item.details === editingExpense.details
          ? { ...item, ...updatedExpense }
          : item
      );
      setExpenseDetails(updatedExpenses);
      setEditingExpense(null);
      setTotalExpense(
        (prev) => prev - editingExpense.Ammount + newExpenseAmmount
      );
    } else {
      // Add new expense

      const newExpense = {
        details: DetailRef.current.value,
        category: CategoryRef.current.value,
        Ammount: AmmountRef.current.value,
        date: DateRef.current.value,
      };
      setExpenseDetails((prevExpenseDetails) => [
        ...prevExpenseDetails,
        newExpense,
      ]);
      setTotalExpense((prev) => prev + newExpenseAmmount);
    }
    clearFormFields();
  };

  const handleDeleteExpense = (data) => {
    let deleteExpense = parseFloat(data.Ammount);
    setTotalExpense((prev) => prev - deleteExpense);
    const updatedExpenses = ExpenseDetails.filter(
      (item) => item.details !== data.details
    );
    setExpenseDetails(updatedExpenses);
  };

  const handleEditExpense = (data) => {
    setEditingExpense(data);
    DetailRef.current.value = data.details;
    CategoryRef.current.value = data.category;
    AmmountRef.current.value = data.Ammount;
    DateRef.current.value = data.date;
  };

  const clearFormFields = () => {
    DetailRef.current.value = "";
    CategoryRef.current.value = "";
    AmmountRef.current.value = "";
    DateRef.current.value = "";
  };

  const handleFirstLetter = (inputString) => {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  };
  return (
    <div className="Home">
      <h1>Expense Calculator</h1>
      <div className="container">
        <div className="right">
          <div className="TotalExpense">Total Expense: {totalExpense}</div>
          <form action="" onSubmit={handleformSubmit}>
            <label htmlFor="Details">Details</label>
            <input type="text" ref={DetailRef} name="Details" />
            <label htmlFor="Category">Choose a Category:</label>
            <select className="Category" id="Category-select" ref={CategoryRef}>
              <option value="">--Please choose an option--</option>
              <option value="Food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="Rent">Rent</option>
              <option value="credit Card Payment">credit Card Payment</option>
              <option value="Enter - tainment">Entertainment</option>
            </select>
            <label htmlFor="">Ammount</label>
            <input type="number" ref={AmmountRef} />
            <label htmlFor="">Date</label>
            <input type="date" ref={DateRef} />
            <button>{editingExpense ? "Edit Expense" : "Add Expense"}</button>
          </form>
        </div>
        <div className="left">
          <div className="LeftHead">Expense Deatils</div>
          <div className="ExpenseDetails">
            <div className="firstcol col-5">
              <div className="details ">Details</div>
              <div className="Ammount ">Ammount</div>
            </div>
            <div className="secondcol col-5">
              <div className="category ">Category</div>
              <div className="Date ">Date</div>
            </div>
            <div className="button col-2">Actions</div>
          </div>
          {ExpenseDetails.map((data, index) => (
            <div className="ExpenseDetails" key={index}>
              <div className="firstcol col-5">
                <div className="details">{handleFirstLetter(data.details)}</div>
                <div className="Ammount">
                  {data.Ammount}
                  <LiaRupeeSignSolid />
                </div>
              </div>
              <div className="secondcol col-5">
              <div className="category">{data.category}</div>
              <div className="Date">{data.date}</div>
              </div>
              <div className="button col-2">
                <RiEdit2Fill onClick={() => handleEditExpense(data)} />
                <RiDeleteBin7Fill onClick={() => handleDeleteExpense(data)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
