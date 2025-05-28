import React, { useState } from "react";
import Model from "./Model/Model";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { ToastContainer, toast } from "react-toastify";

function Register({ onSwitch }) {
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [loaderImage, setLoaderImage] = useState(false);
  // const navigate = useNavigate();

  const [inputField, setInputField] = useState({
    userName: "",
    email: "",
    gymName: "",
    password: "",
    profilePic:
      "https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg",
  });

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };

  const handleRegister = async () => {
    await axios
      .post("http://localhost:3002/auth/register", inputField)
      .then((res) => {
        console.log(res);
        const successMsg = res.data.message;
        toast.success(successMsg);
      })
      .catch((err) => {
        const errorMessage = err.response.data.message;

        toast.error(errorMessage);
      });
    // console.log("Registering:", inputField);
    // sessionStorage.setItem("isRegistered", true);
    // navigate("/dashboard");
  };

  const handleClose = () => setForgotPassword((prev) => !prev);

  const uploadImage = async (event) => {
    setLoaderImage(true);
    const files = event.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "gym-gms"); // make sure this is UNSIGNED

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dehdpbk2h/image/upload",
        data
      );
      const imageUrl = response.data.url;
      setInputField({ ...inputField, profilePic: imageUrl });
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setLoaderImage(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white bg-opacity-95 rounded-lg shadow-lg p-6 max-h-[90vh] overflow-y-auto">
      <h2 className="text-xl font-bold text-center text-slate-800 mb-6">
        Register Your Gym
      </h2>

      {/* Username */}
      <InputField
        label="Enter Username"
        value={inputField.userName}
        onChange={(e) => handleOnChange(e, "userName")}
        type="text"
      />

      {/* Email */}
      <InputField
        label="Enter Email"
        value={inputField.email}
        onChange={(e) => handleOnChange(e, "email")}
        type="email"
      />

      {/* Gym Name */}
      <InputField
        label="Enter Gym Name"
        value={inputField.gymName}
        onChange={(e) => handleOnChange(e, "gymName")}
        type="text"
      />

      {/* Password */}
      <div className="relative mb-4">
        <input
          type={showPassword ? "text" : "password"}
          required
          value={inputField.password}
          onChange={(e) => handleOnChange(e, "password")}
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

      {/* File Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={uploadImage}
        className="w-full mb-4 p-3 rounded border"
      />

      {/* Loader */}
      {loaderImage && (
        <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
          <LinearProgress color="secondary" />
        </Stack>
      )}

      {/* Image Preview */}
      <img
        src={inputField.profilePic}
        alt="Profile Preview"
        className="h-[120px] w-[110px] object-cover mx-auto mb-4 rounded"
      />

      {/* Register Button */}
      <button
        className="p-3 w-full bg-slate-800 text-white text-center rounded hover:bg-white hover:text-black border-2 font-semibold mb-3"
        onClick={handleRegister}
      >
        Register
      </button>

      {/* Forgot Password */}
      <button
        className="p-3 w-full bg-slate-800 text-white text-center rounded hover:bg-white hover:text-black border-2 font-semibold mb-3"
        onClick={handleClose}
      >
        Forgot Password
      </button>

      {forgotPassword && (
        <Model
          header="Forgot Password"
          handleClose={handleClose} // ✅ Corrected spelling
          content={<ForgotPassword handleClose= {handleClose} />}
        />
      )}

      {/* Switch to Login */}
      <p className="text-center text-sm">
        Already have an account?{" "}
        <span className="text-blue-600 cursor-pointer" onClick={onSwitch}>
          Login
        </span>
      </p>
    </div>
  );
}

// Reusable input field
function InputField({ label, value, onChange, type }) {
  return (
    <div className="relative mb-4">
      <input
        type={type}
        required
        value={value}
        onChange={onChange}
        placeholder=" "
        className="w-full p-3 rounded border peer placeholder-transparent focus:outline-none"
      />
      <label className="absolute left-3 top-3 text-gray-500 peer-placeholder-shown:top-3 peer-focus:top-[-10px] peer-focus:text-blue-600 transition-all bg-white px-1">
        {label}
      </label>
      <ToastContainer />
    </div>
  );
}

export default Register;
