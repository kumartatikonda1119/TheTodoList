import React, { useState } from "react";
import axios from "axios";
import "./Create.css";

function Create({ onAdd }) {
  const [task, setTask] = useState("");
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };
  const handleAdd = async () => {
    if (!task.trim()) {
      alert("Please write something to add!");
      return;
    }

    try {
      await axios.post("http://localhost:3001/add", { task });
      setTask(""); 
      onAdd(); 
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="text-insert-field">
      <input
        type="text"
        id="input-box"
        placeholder="Enter Your Input"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default Create;
