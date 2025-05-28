import React, { useState } from "react";
import Loader from "../Loader/Loader";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ForgotPassword = () => {
  const [emailSubmit, setEmailSubmit] = useState(false);

  const [otpValidate, setOtpValidate] = useState(false);
  const [loader, setLoader] = useState(false);

  const [contentValue, setContentValue] = useState("Submit Your Email");
  const [inputField, setInputField] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const handelSubmit = () => {
    if (!emailSubmit) {
      sendOtp();
    } else if (emailSubmit && !otpValidate) {
      verifyOtp();
    } else {
      changePassword();
    }
  };
  const changePassword = async () => {
    setLoader(true);
    await axios
      .post("http://localhost:3002/auth/reset-password/updatePassword", {
        email: inputField.email,
        newPassword: inputField.newPassword,
      })
      .then((res) => {
        toast.success(res.data.message);
        setLoader(false);
      })
      .catch((err) => {
        toast.error("Some technical issue while sending Mail");
        console.log(err);
        setLoader(false);
      });
  };
  const verifyOtp = async () => {
    setLoader(true);
    await axios
      .post("http://localhost:3002/auth/reset-password/verifyOtp", {
        email: inputField.email,
        otp: inputField.otp,
      })
      .then((res) => {
        setOtpValidate(true);
        setContentValue("Submit Your OTP");
        toast.success(res.data.message);
        setLoader(false);
        console.log(res);
      })
      .catch((err) => {
        toast.error("Some technical issue while sending Mail");
        console.log(err);
        setLoader(false);
      });
  };
  const sendOtp = async () => {
    setLoader(true);
    await axios
      .post("http://localhost:3002/auth/reset-password/sendOtp", {
        email: inputField.email,
      })
      .then((res) => {
        setEmailSubmit(true);
        setContentValue("Change Password");
        toast.success(res.data.message);
        setLoader(false);
      })
      .catch((err) => {
        toast.error("Some technical issue while sending Mail");
        console.log(err);
        setLoader(false);
      });
  };
  const handelOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };
  return (
    <div className="w-full">
      <div className="w-full mb-5">
        <div>Enter Your Email</div>
        <input
          type="text"
          className="w-1/2  p-2 rounded-lg border-2 border-slate-400"
          placeholder="Enter email"
          onChange={(event) => {
            handelOnChange(event, "email");
          }}
        />
      </div>
      {emailSubmit && (
        <div className="w-full mb-5">
          <div>Enter Your OTp</div>
          <input
            type="text"
            className="w-1/2  p-2 rounded-lg border-2 border-slate-400"
            placeholder="Enter OTP"
            onChange={(event) => {
              handelOnChange(event, "otp");
            }}
          />
        </div>
      )}
      {otpValidate && (
        <div className="w-full mb-5">
          <div>Enter New Password</div>
          <input
            type="text"
            className="w-1/2  p-2 rounded-lg border-2 border-slate-400"
            placeholder="Enter new Password"
            onChange={(event) => {
              handelOnChange(event, "newPassword");
            }}
          />
        </div>
      )}
      <div
        className="bg-slate-800 text-white mx-auto w-2/3 p-3 rounded-lg text-center font-semibold border-2 cursor-pointer hover:bg-white hover:text-black"
        onClick={handelSubmit}
      >
        {contentValue}
      </div>

      {loader && <Loader />}
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
