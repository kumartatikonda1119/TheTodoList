import { useState } from "react";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import PageNotFound from "./components/PageNotFound.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("jwt"));
  console.log("token in App:", token);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={token ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
