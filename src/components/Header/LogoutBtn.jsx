import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
function LogoutBtn() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    authService.logout()
      .then(() => {
        dispatch(logout());
        console.log("Logged out");
      })
      .catch((error) => {
        console.log("Logout Error", error);
      });
  };

  return <button className="inline-block px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-600 border border-transparent rounded-lg active:bg-gray-600 hover:bg-gray-700 focus:outline-none focus:shadow-outline-gray"
  onClick={handleLogout}>LogoutBtn</button>;
}

export default LogoutBtn;
