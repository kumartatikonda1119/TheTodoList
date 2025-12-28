import { useState } from "react";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import PageNotFound from "./components/PageNotFound.jsx";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext.jsx";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("jwt"));

  console.log("token in App:", token);

  return (
    <ThemeProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              token ? <Home setToken={setToken} /> : <Navigate to="/login" />
            }
          />

          <Route
            path="/login"
            element={
              token ? <Navigate to="/" /> : <Login setToken={setToken} />
            }
          />

          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
