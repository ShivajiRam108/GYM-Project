import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import MemberCurd from "../../Components/MemberCurd/MemberCurd";
import {
  getMonthlyJoined,
  threeDaysExpire,
  fourToSevenDaysExpire,
  expiredData,
  inactiveMembers,
} from "./data";

function GeneralUser() {
  const [header, setHeader] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const func = sessionStorage.getItem("func");
    functionCall(func);
  }, []);

  const functionCall = async (func) => {
    switch (func) {
      case "MonthlyJoined":
        const thisMonthJioningNumber = await getMonthlyJoined();
        setHeader("Monthly Joined Members");
        setData(thisMonthJioningNumber.members);
        break;

      case "threeDaysExpire":
        setHeader("Expring In 3 Days Members");
        let threeDaysData = await threeDaysExpire();
        // console.log(threeDaysData);
        setData(threeDaysData.members);
        break;

      case "fourToSevenDaysExpire":
        setHeader("Expring In 4-7 days Members");
        let fourToSevenDaysExpireData = await fourToSevenDaysExpire();
        setData(fourToSevenDaysExpireData.members);
        break;

      case "expired":
        setHeader("Expired Members");
        let expiredResult = await expiredData();
        setData(expiredResult.members);
        break;

      case "inactiveMembers":
        setHeader("Inactive Members");
        let inactiveData = await inactiveMembers();
        setData(inactiveData.members);
        break;
    }
  };
 
  return (
    <div className="text-black p-5 w-3/4 flex-col">
      <div className="border-2 bg-slate-900 flex justify-between w-full text-white rounded-lg p-3 ">
        <Link
          to={"/dashboard"}
          className="border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  hover:text-black"
        >
          <ArrowBackIcon /> Back To dashboard
        </Link>
      </div>

      <div className="mt-5 text-xl text-slate-900">{header}</div>

      <div className="bg-slate-100 p-5 mt-5 rounded-lg grid gap-2 grid-cols-3 overflow-x-auto h-[80%]">
        {data.map((item, index) => {
          return <MemberCurd key={index} item={item} />;
        })}
      </div>
    </div>
  );
}

export default GeneralUser;
