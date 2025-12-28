import axiosInstance from "../api/axiosInstance";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { GiBat } from "react-icons/gi";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axiosInstance.post(
        "/user/login",
        {
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

      console.log(data);
      toast.success(data.message || "User logged in successfully");

      // update localStorage + React state
      localStorage.setItem("jwt", data.token);
      setToken(data.token);

      navigateTo("/");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "User login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 transition-colors duration-200">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <GiBat className="text-6xl text-yellow-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            BatTask
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Organize your tasks, boost productivity
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 transition-colors duration-200">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
            Login
          </h2>
          <form onSubmit={handleRegister}>
            {/* Email */}
            <div className="mb-5">
              <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
                Email Address
              </label>
              <input
                className="w-full p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 dark:focus:ring-yellow-900 transition"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
                Password
              </label>
              <input
                className="w-full p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 dark:focus:ring-yellow-900 transition"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-4 rounded-lg transition duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Signup Link */}
          <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
            New user?{" "}
            <Link
              to="/signup"
              className="text-yellow-600 dark:text-yellow-400 font-semibold hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-6">
          © 2025 BatTask. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Login;
