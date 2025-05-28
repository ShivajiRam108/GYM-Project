import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function Login({ onSwitch }) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); //  useNavigate properly
  const [loginField, setLoginField] = useState({ userName: "", password: "" });

  const handleLogin = async () => {
    // 1. Basic validation
    if (!loginField.userName || !loginField.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      //  Step 2: Send login request
      const res = await axios.post(
        "http://localhost:3002/auth/login",
        loginField,
        { withCredentials: true }
      );

      //  Step 3: Handle success

      localStorage.setItem("gymName", res.data.gym.gymName);
      localStorage.setItem("gymPic", res.data.gym.profilePic);
      sessionStorage.setItem("isLogin", true);
      localStorage.setItem("token", res.data.token);

      //  Step 4: Redirect after success
      toast.success("Login Successful!", {
        onClose: () => {
          navigate("/dashboard");
        },
        autoClose: 2000, // 2 seconds
      });
    } catch (err) {
      //  Step 5: Handle error
      const errorMessage = err.response?.data?.message || "Login Failed.";
      toast.error(errorMessage);
    }
  };
  const handleOnChange = async (event, name) => {
    setLoginField({ ...loginField, [name]: event.target.value });
  };
  // console.log(loginField);

  return (
    <div className="w-full max-w-sm bg-white bg-opacity-95 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-center text-slate-800 mb-6">
        Login
      </h2>

      {/* Username Input */}
      <div className="relative mb-4">
        <input
          onChange={(event) => {
            handleOnChange(event, "userName");
          }}
          value={loginField.userName}
          type="text"
          required
          placeholder=" "
          className="w-full p-3 rounded border peer placeholder-transparent focus:outline-none"
        />
        <label className="absolute left-3 top-3 text-gray-500 peer-placeholder-shown:top-3 peer-focus:top-[-10px] peer-focus:text-blue-600 transition-all bg-white px-1">
          Enter Username
        </label>
      </div>

      {/* Password Input */}
      <div className="relative mb-4">
        <input
          onChange={(event) => {
            handleOnChange(event, "password");
          }}
          value={loginField.password}
          type={showPassword ? "text" : "password"}
          required
          placeholder=" "
          className="w-full p-3 rounded border peer placeholder-transparent focus:outline-none pr-10"
        />
        <label className="absolute left-3 top-3 text-gray-500 peer-placeholder-shown:top-3 peer-focus:top-[-10px] peer-focus:text-blue-600 transition-all bg-white px-1">
          Password
        </label>
        <span
          className="absolute right-3 top-3 text-sm text-blue-600 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Hide" : "Show"}
        </span>
      </div>

      {/* Login Button */}
      <div
        className="p-3 w-full bg-slate-800 text-white text-center rounded hover:bg-white hover:text-black border-2 font-semibold cursor-pointer mb-3"
        onClick={handleLogin}
      >
        Login
      </div>

      {/* Switch to Register */}
      <p className="text-center text-sm">
        Don’t have an account?{" "}
        <span className="text-blue-600 cursor-pointer" onClick={onSwitch}>
          Register
        </span>
      </p>
      <ToastContainer />
    </div>
  );
}

export default Login;
