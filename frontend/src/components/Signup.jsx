import axiosInstance from "../api/axiosInstance";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { GiBat } from "react-icons/gi";

function Signup() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post("/user/signup", {
        username,
        email,
        password,
      });
      // console.log("signup successful");
      const data = response.data;
      toast.success(data.message || "signup successful");
      localStorage.setItem("jwt", data.token);
      navigate("/login");
      setUsername("");
      setEmail("");
      setPassword("");
      // console.log(data);
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message || "signup failed");
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
            Join and organize your tasks
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 transition-colors duration-200">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
            Sign Up
          </h2>
          <form onSubmit={handleRegister}>
            {/* Username */}
            <div className="mb-5">
              <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
                Username
              </label>
              <input
                type="text"
                placeholder="choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 dark:focus:ring-yellow-900 transition"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-5">
              <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
                Email Address
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 dark:focus:ring-yellow-900 transition"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 dark:focus:ring-yellow-900 transition"
                required
              />
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-4 rounded-lg transition duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-yellow-600 dark:text-yellow-400 font-semibold hover:underline"
            >
              Log in
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

export default Signup;
