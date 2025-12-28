import React, { useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { MdAddCircleOutline } from "react-icons/md";

function Home({ setToken }) {
  const [username, setUsername] = React.useState("");
  const [todos, setTodos] = React.useState([]);
  const [errors, setErrors] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [newTodo, setNewTodo] = React.useState("");

  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/todo/fetch");
        console.log(response.data);
        setTodos(response.data.todos);
        if (response.data.user && response.data.user.username) {
          setUsername(response.data.user.username);
        }
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
      const response = await axiosInstance.post("/todo/create", {
        text: newTodo,
        completed: false,
      });
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
      const response = await axiosInstance.put(`/todo/update/${id}`, {
        ...todo,
        completed: !todo.completed,
      });
      setTodos(todos.map((t) => (t._id === id ? response.data.todo : t)));
      console.log(response.data);
    } catch (error) {
      setErrors("failed to update todo status");
    }
  };

  const todoDelete = async (id) => {
    try {
      await axiosInstance.delete(`/todo/delete/${id}`);
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      setErrors("failed to delete todo");
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.get("/user/logout");
      toast.success("User logged out successfully");

      localStorage.removeItem("jwt");
      setToken(null);

      navigateTo("/login");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const remainingTodos = todos.filter((t) => !t.completed).length;

  return (
    <div className="min-h-screen bg-white dark:from-gray-900 dark:to-gray-800 dark:bg-gradient-to-br transition-colors duration-200">
      <Navbar username={username} onLogout={logout} />

      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Main Container */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 sm:p-6 lg:p-8 transition-colors duration-200">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 dark:text-white mb-2">
            My Tasks
          </h1>
          <p className="text-center text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-6 sm:mb-8">
            {remainingTodos} task{remainingTodos !== 1 ? "s" : ""} remaining
          </p>

          {/* Add Todo Section */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                className="flex-grow border-2 border-gray-300 dark:border-gray-600 rounded-lg px-3 sm:px-4 py-2 sm:py-3 bg-white dark:bg-gray-700 text-sm sm:text-base text-gray-800 dark:text-white focus:outline-none focus:border-yellow-400 dark:focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 dark:focus:ring-yellow-900 transition"
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && todoCreate()}
                placeholder="Add a new task..."
              />
              <button
                className="bg-yellow-400 hover:bg-yellow-400 text-gray-900 py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition duration-300 shadow-md hover:shadow-lg w-full sm:w-auto"
                onClick={todoCreate}
              >
                <MdAddCircleOutline className="text-lg sm:text-xl" />
                <span className="text-sm sm:text-base">Add</span>
              </button>
            </div>
          </div>

          {/* Todos List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
                <p className="text-gray-500 dark:text-gray-400 mt-4">
                  Loading tasks...
                </p>
              </div>
            </div>
          ) : errors ? (
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded text-red-700 dark:text-red-400 font-semibold">
              {errors}
            </div>
          ) : todos.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-gray-400 dark:text-gray-500 text-lg">
                No tasks yet. Add one to get started!
              </p>
            </div>
          ) : (
            <ul className="space-y-2 sm:space-y-3">
              {todos.map((todo, index) => (
                <li
                  key={todo._id || index}
                  className="flex items-center justify-between gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition group"
                >
                  <div className="flex items-center gap-2 sm:gap-4 flex-grow min-w-0">
                    <input
                      type="checkbox"
                      className="w-4 h-4 sm:w-5 sm:h-5 rounded cursor-pointer accent-yellow-400 flex-shrink-0"
                      checked={todo.completed}
                      onChange={() => todoStatus(todo._id)}
                    />
                    <span
                      className={`text-sm sm:text-base lg:text-lg break-words ${
                        todo.completed
                          ? "line-through text-gray-400 dark:text-gray-500"
                          : "text-gray-700 dark:text-gray-200"
                      }`}
                    >
                      {todo.text}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                    {todo.completed && (
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-green-500 text-base sm:text-lg lg:text-xl hidden sm:block"
                      />
                    )}
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg transition duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                      onClick={() => todoDelete(todo._id)}
                      title="Delete task"
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-sm sm:text-base lg:text-lg"
                      />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
