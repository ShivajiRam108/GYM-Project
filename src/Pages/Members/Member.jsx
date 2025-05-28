import React, { useEffect, useState } from "react";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MemberCurd from "../../Components/MemberCurd/MemberCurd";
import AddMemberShip from "../../Components/AddMemberShip/AddMemberShip";
import Model from "../../Components/Model/Model";
import AddMembers from "../../Components/AddMembers/AddMembers";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
// import { grey } from '@mui/material/colors';

const Member = () => {
  const [addMembership, setMembership] = useState(false);

  const [addMember, setAddMember] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [startFrom, setStartFrom] = useState(0);
  const [endTo, setEndTo] = useState(9);
  const [totalData, settotalData] = useState(0);
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const [isSearchModeOn, setIsSearchModeOn] = useState(false);
  // const [limit,setLimit] = useState(9);
  const [noOfPage, setNoOfPage] = useState(0);

  const limit = 9;

  useEffect(() => {
    fetchData(0, 9);
  }, []);

  const fetchData = async (skip, limit) => {
    await axios
      .get(
        `http://localhost:3002/members/all-mamber?skip=${skip}&limit=${limit}`,
        { withCredentials: true }
      )

      .then((res) => {
        console.log(res);
        let totalData = res.data.totalMembers;
        settotalData(totalData);
        setData(res.data.members);

        let extraPage = totalData % limit === 0 ? 0 : 1;
        let totalDataPage = Math.floor(totalData / limit) + extraPage;
        setNoOfPage(totalDataPage);

        if (totalData === 0) {
          setStartFrom(-1);
          setEndTo(0);
        } else if (totalData < limit) {
          setStartFrom(0);
          setEndTo(totalData);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Technical Fault.");
      });
  };

  const handelMembership = () => {
    setMembership((prev) => !prev);
  };

  const handleMember = () => {
    setAddMember((prev) => !prev);
  };

  const handlePrev = () => {
    if (currentPage !== 1) {
      let currPage = currentPage - 1;
      setCurrentPage(currPage);
      let from = (currPage - 1) * limit;
      let to = currPage * limit;
      setStartFrom(from);
      setEndTo(to);
      let skipVal = skip - limit;
      setSkip(skipVal);
      fetchData(skipVal, limit);
    }
  };

  const handleNext = () => {
    if (currentPage !== noOfPage) {
      let currPage = currentPage + 1;
      setCurrentPage(currPage);
      let from = (currPage - 1) * limit;
      let to = currPage * limit;
      if (to > totalData) to = totalData;

      setStartFrom(from);
      setEndTo(to);
      let skipVal = skip + limit;
      setSkip(skipVal);
      fetchData(skipVal, limit);
    }
  };
  const handleSearchData = async () => {
    if (search !== "") {
      setIsSearchModeOn(true);
      await axios
        .get(
          `https://gym-be-5tmv.onrender.com/members/searched-members?searchTerm=${search}`,
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          setData(res.data.member);
          settotalData(res.data.totalMembers)
        })
        .catch((err) => {
          console.log(err);
          toast.error("Technical Fault.");
        });
    }else{
      if(isSearchModeOn){
        window.location.reload();
      }else{
        toast.error("Please Enter any Value.")
      }
    }
  };
  return (
    <div className="text-black p-5 w-3/4">
      {/* Black for banner */}

      <div className="border-2 bg-slate-900 flex justify-between w-full text-white rounded-lg p-3">
        <div
          className="border-2 pl-3 pr-3 pt-3 pb-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black"
          onClick={() => handleMember()}
        >
          Add Member <FitnessCenterIcon />
        </div>
        <div
          className="border-2 pl-3 pr-3 pt-3 pb-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black"
          onClick={() => handelMembership()}
        >
          Add Membership <AddIcon />
        </div>
      </div>

      {/* block for back to dashboard button  */}
      <Link to={"/dashboard"}>
        {" "}
        <ArrowBackIcon /> Back to Dachboard
      </Link>

      <div className="mt-5 w-1/2 flex gap-2">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          type="text"
          className="order-2 w-full p-2 rounded-lg"
          placeholder="Search By Name Or Mobile No"
        />
        <div
          onClick={() => {
            handleSearchData();
          }}
          className="bg-slate-900 p-3 border-2 text-white rounded-lg cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black"
        >
          {" "}
          <SearchIcon />
        </div>
      </div>

      <div className="mt-5 text-2xl flex justify-between text-slate-900">
        <div>Total Members {totalData}</div>
        {!isSearchModeOn ? (
          <div className="flex gap-5">
            <div>
              {startFrom + 1} -{endTo} of {totalData} Members
            </div>
            <div
              className={` w-8 h-8 cursor-pointer border-1 flex items-center justify-center hover:text-white hover:bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500 hover:text-black  ${
                currentPage === 1 ? "bg-gray-200 text-gray-400" : ""
              }`}
              onClick={handlePrev}
            >
              
              <ChevronLeftIcon />
            </div>
            <div
              className={` w-8 h-8 cursor-pointer border-1 flex items-center justify-center hover:text-white hover:bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500 hover:text-black    ${
                currentPage === noOfPage ? "bg-gray-200 text-gray-400" : ""
              }`}
              onClick={handleNext}
            >
              
              <ChevronRightIcon />
            </div>
          </div>
        ) : null
        }
      </div>

      <div className="bg-slate-100 p-5 mt-5 rounded-lg grid gap-2 grid-cols-3 overflow-x-auto h-[65%]">
        {data.map((item, index) => {
          return <MemberCurd item={item} key={index} />;
        })}
      </div>

      {addMembership && (
        <Model
          header="Add Membership"
          handleClose={handelMembership}
          content={<AddMemberShip handleClose={handelMembership} />}
        />
      )}
      {addMember && (
        <Model
          header={"Add New Members"}
          handleClose={handleMember}
          content={<AddMembers />}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default Member;
