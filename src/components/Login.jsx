import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Input } from "./index";
import { login as authLogin } from "../store/authSlice";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const email = useRef(null);
  const password = useRef(null);

  const login = async (data) => {
    console.log("login"); 
    try {
      setError("");
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const test = () => {
    console.log("testing button");
  };

  return (
    <div className="p-8 rounded-lg shadow-lg">
      <form
        onSubmit={handleSubmit(login)}
        className="flex flex-col items-center justify-center gap-y-3"
      >
        <Input
          type="email"
          placeholder="Enter Email"
          ref={email}
          {...register("email", {
            required: true,
          })}
        />
        <Input
          type="password"
          placeholder="Enter Password"
          ref={password}
          {...register("password", {
            required: true,
            min: 8,
          })}
        />
        <Button type="submit">Submit</Button>
      </form>
      {error && <div className="text-red-400 text-2xl mt-4 text-center">{error}</div>}
      <div className="mt-4">
        Don't have an account
        <Link to={"/signup"} className="hover:underline duration-200">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Login;
