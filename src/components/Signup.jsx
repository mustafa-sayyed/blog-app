import React, { useRef, useState } from "react";
import { Input, Button } from "./index";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const [error, setError] = useState("");

  const signup = async (data) => {
    console.log("data", data);
    console.log("signup called")
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const user = await authService.getCurrentUser();
        if (user) {
          dispatch(login(user));
          navigate("/");
        }
      }
    } catch (error) {
      setError("Error in signup", error);
    }
  };
  console.log("signup component")
  const show = () => { 
    console.log("show called")
  }
  return (
    <div className="p-8 rounded-lg shadow-lg">
      <form
        onSubmit={handleSubmit(signup)}
        className="flex flex-col items-center justify-center gap-y-3"
      >
        <Input
          type="text"
          placeholder="Enter Name"
          ref={name}
          {...register("name", {
            required: true,
          })}
        />
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
        <button type="submit" onClick={show} className="rounded-lg p-2 text-white bg-gray-500">Submit</button>
      </form>
      {error && <div className="text-red-400 text-2xl mt-4 text-center">{error}</div>}
      <div className="text-center mt-4">
        Already have an account?
        <Link to={"/login"} className="hover:underline duration-200">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
