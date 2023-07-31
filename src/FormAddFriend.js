import { useState } from "react";
import  Button  from "./Button";

export default function FormAddFriend({ onAddFriend }) {
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
