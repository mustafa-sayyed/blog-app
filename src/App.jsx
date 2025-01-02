import React, { useEffect, useState } from "react";
import "./App.css";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import { Footer, Header, Login } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((err) => {
        console.log("User not found: ", err)
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-700 border-b-gray-900"></div>
        <div className="mt-4 text-lg">Loding......</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main>
        <Header />
        <Outlet />
        <Footer />
      </main>
    </div>
  );
}

export default App;
