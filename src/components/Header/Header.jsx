import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, LogoutBtn } from "../index";

function Header() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.status);

  console.log("authStatus", authStatus);

  const navItems = [
    {
      name: "Home",
      path: "/",
      active: true,
    },
    {
      name: "All Post",
      path: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      path: "/add-post",
      active: authStatus,
    },
    {
      name: "Login",
      path: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      path: "/signup",
      active: !authStatus,
    },
  ];
console.log("navItems", navItems[3]);
  return (
    <header>
      <Container>
        <nav className="flex justify-around items-center w-4/5">
          <div className="text-2xl font-bold italic">
            <Link to="/">Blog App</Link>
          </div>
          <ul className="flex justify-around items-center w-2/5">
            {navItems.map((item, index) =>
              item.active ? (
                <li key={index}>
                  <button onClick={() => navigate(item.path)}>{item.name}</button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
