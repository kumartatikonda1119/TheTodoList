import React, { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function Home() {
  const [todos, setTodos] = React.useState([]);
  const [errors, setErrors] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [newTodo, setNewTodo] = React.useState("");
  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://thetodolistbackend.onrender.com/todo/fetch", {
          withCredentials: true,
        });
        console.log(response.data.todos);
        setTodos(response.data.todos);
        setErrors(null);
      } catch (error) {
        setErrors("failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);
  const todoCreate = async () => {
    if (!newTodo) return;
    try {
      const response = await axios.post(
        "https://thetodolistbackend.onrender.com/todo/create",
        {
          text: newTodo,
          completed: false,
        },
        {
          withCredentials: true,
        }
      );
      setTodos([...todos, response.data.newTodo]);
      setNewTodo("");
      console.log(response.data);
    } catch (error) {
      setErrors("failed to create todo");
    }
  };
  const todoStatus = async (id) => {
    const todo = todos.find((t) => t._id === id);
    try {
      const response = await axios.put(
        `https://thetodolistbackend.onrender.com/todo/update/${id}`,
        {
          ...todo,
          completed: !todo.completed,
        },
        {
          withCredentials: true,
        }
      );
      setTodos(todos.map((t) => (t._id === id ? response.data.todo : t)));
      console.log(response.data);
    } catch (error) {
      setErrors("failed to update todo status");
    }
  };
  const todoDelete = async (id) => {
    try {
      await axios.delete(`https://thetodolistbackend.onrender.com/todo/delete/${id}`, {
        withCredentials: true,
      });
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      setErrors("failed to delete todo");
    }
  };
  const navigateTo = useNavigate();

  const logout = async () => {
    try {
      await axios.get("https://thetodolistbackend.onrender.com/user/logout", {
        withCredentials: true,
      });
      toast.success("User logged out successfully");
      navigateTo("/login");
      localStorage.removeItem("jwt");
    } catch (error) {
      toast.error("Error logging out");
    }
  };
  const remainingTodos = todos.filter((t) => !t.completed).length;
  return (
    <div className="bg-gray-200 max-w-lg lg:max-w-xl rounded shadow-lg mx-8 sm:mx-auto p-6 mt-10">
      <h1 className="text-2xl font-semibold text-center">ToDo List</h1>
      <div className="flex mb-4 ">
        <input
          className="flex-grow border border-gray-300 rounded-l px-4 py-2 "
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && todoCreate()}
        />
        <button
          className="bg-blue-600 border rounded-r-md text-white py-2 px-4 hover:bg-blue-800 duration-300 "
          onClick={todoCreate}
        >
          Add Todo
        </button>
      </div>
      {loading ? (
        <div className="text-center justify-center"> loading.... </div>
      ) : errors ? (
        <div className="text-center text-red-400 font-semibold"> {errors} </div>
      ) : (
        <ul className="space-y-2 ">
          {todos.map((todo, index) => (
            <li
              key={todo._id || index}
              className="flex items-center justify-between p-4 rounded bg-gray-200"
            >
              <div className="flex items-center ">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  className="mr-2"
                  checked={todo.completed}
                  onChange={() => todoStatus(todo._id)}
                />
                <span
                  className={`${
                    todo.completed ? "line-through text-gray-700 " : ""
                  }`}
                >
                  {todo.text}
                </span>
              </div>
              <button
                className="bg-red-500 border rounded text-white py-2 px-2 hover:bg-red-600 duration-300"
                onClick={() => todoDelete(todo._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-4 text-center   text-gray-700 text-xl">
        {remainingTodos} todo remaining
      </p>
      <center>
        <button
          className="bg-red-600 border  text-center rounded text-white py-2 px-4 hover:bg-red-800 duration-300"
          onClick={() => logout()}
        >
          logout
        </button>
      </center>
    </div>
  );
}
export default Home;
