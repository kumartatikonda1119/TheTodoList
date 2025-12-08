import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";
function Signup() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://thetodolist.onrender.com/user/signup",
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("signup successful");
      const data = response.data;
      toast.success(data.message || "signup successful");
      localStorage.setItem("jwt", data.token);
      navigate("/login");
      setUsername("");
      setEmail("");
      setPassword("");
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "signup failed");
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded shadow">
      <h2 className="text-2xl font-bold mb-4"> Signup </h2>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 mb-2 w-full"
      />
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 mb-2 w-full"
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleRegister}
      >
        Signup
      </button>
      <p className="mt-4 text-center text-gray-500">
        already have an account ?
        <Link to="/login" className="text-blue-500 hover:underline">
          login
        </Link>
      </p>
    </div>
  );
}

export default Signup;
