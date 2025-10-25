import React, { useState, useEffect } from "react";
import Create from "./Create";
import axios from "axios";
import "./Home.css";
import todo from "./assets/icon.png";

function Home() {
  const [task, setTask] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:3001/get");
      setTask(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const toggleComplete = async (id) => {
    try {
      await axios.put(`http://localhost:3001/toggle/${id}`);
      fetchTasks(); // refresh tasks
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/delete/${id}`);
      setTask(task.filter((t) => t._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="todo-container">
      <div className="main-container">
        <div className="heading">
          <h2>ToDo List</h2>
          <img src={todo} alt="todo icon" />
        </div>

        <Create onAdd={fetchTasks} />

        <ul>
          {task.map((item) => (
            <li
              key={item._id}
              onClick={() => toggleComplete(item._id)}
              className={item.completed ? "checked" : ""}
            >
              {item.task}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(item._id);
                }}
              >
                x
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
