import { useState } from "react";
import  Button  from "./Button";

export default function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [billValue, setBillValue] = useState("");
  const [yourExpense, setYourExpense] = useState("");
  const [isUserPaying, setIsUserPaying] = useState(true);
  const paidByFriend = billValue ? billValue - yourExpense : "";
  function handleSplitBill(e) {
    if (!billValue) return;
    e.preventDefault();
    onSplitBill(isUserPaying ? paidByFriend : -yourExpense);
  }

  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label> 📃 Bill Value</label>
      <input
        type="text"
        value={billValue}
        onChange={(e) => setBillValue(+e.target.value)}
      />

      <label> 💵 Your Expense</label>
      <input
        type="text"
        value={yourExpense}
        onChange={(e) =>
          setYourExpense(
            +e.target.value > billValue ? yourExpense : +e.target.value
          )
        }
      />

      <label> 🤑 Friend's Expense</label>
      <input type="text" disabled value={paidByFriend} />

      <label> ❌ Who is paying the bill</label>
      <select
        value={isUserPaying ? "user" : "friend"}
        onChange={(e) =>
          e.target.value === "user"
            ? setIsUserPaying(true)
            : setIsUserPaying(false)
        }
      >
        <option value="user">you</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button onClick={(e) => handleSplitBill(e)}>Split Bill</Button>
    </form>
  );
}
