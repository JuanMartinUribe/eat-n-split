import { useState } from "react";
const initialFriends = [
  {
    id: 1,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 2,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 3,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend((saf) => false);
  }
  function handleSelectFriend(friend) {
    setSelectedFriend((curSelected) =>
      curSelected?.id === friend.id ? null : friend
    );
    setShowAddFriend(false);
  }
  function handleSplitBill(balance) {
    setFriends((friends) => {
      return friends.map((friend) => {
        return friend === selectedFriend
          ? { ...friend, balance: friend.balance + balance }
          : friend;
      });
    });
    setSelectedFriend(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelectFriend={handleSelectFriend}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button
          onClick={() => {
            setShowAddFriend((saf) => !saf);
          }}
        >
          {!showAddFriend ? "Add Friend" : "Hide"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
}

function FriendsList({ friends, onSelectFriend, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend, i) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelectFriend={onSelectFriend}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelectFriend, selectedFriend }) {
  const isSelected = friend.id === selectedFriend?.id;
  return (
    <li>
      <img src={friend.image} alt={friend.name}></img>
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          you owe {friend.name} a total of {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you a total of {friend.balance}$
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button onClick={() => onSelectFriend(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [img, setImg] = useState("https://i.pravatar.cc/48");
  const [name, setName] = useState("");

  function handleAddFriend(e) {
    e.preventDefault();
    if (!name || !img) return;
    const id = crypto.randomUUID();
    const newFriend = {
      image: `${img}?=${id}`,
      balance: 0,
      id,
      name,
    };
    onAddFriend(newFriend);
  }

  return (
    <form className="form-add-friend">
      <label>👪Friend Name</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
      />

      <label>📷Image URL</label>
      <input value={img} onChange={(e) => setImg(e.target.value)} type="text" />
      <Button onClick={handleAddFriend}>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
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
