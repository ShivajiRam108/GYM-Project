import React, { useState, useEffect } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import SunnyIcon from '@mui/icons-material/Sunny';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import {Link , useLocation , useNavigate} from 'react-router-dom'


const SideBar = () => {

  const [greeting, setGreeting] = useState("");
  const [isDay, setIsDay] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  
  const greetingMessage = () => {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    setGreeting("Good Morning");
    setIsDay(true);
  } else if (currentHour >= 12 && currentHour < 17) {
    setGreeting("Good Afternoon");
    setIsDay(true);
  } else if (currentHour >= 17 && currentHour < 21) {
    setGreeting("Good Evening");
    setIsDay(false);
  } else {
    setGreeting("Good Night");
    setIsDay(false);
  }
};

  useEffect(() => {
    greetingMessage();
  }, []);

  const handleLogout = ()=>{
    sessionStorage.clear();
    navigate("/")
  }
  return (
    <div className='w-1/4 h-[100vh] border-2 bg-black text-white p-5 font-extralight'>
      <div className='text-center text-3xl mb-6'>
        {localStorage.getItem("gymName")}
      </div>

      <div className='flex items-center gap-4 mb-5'>
        <div className='w-[80px] h-[80px] rounded-full overflow-hidden'>
          <img 
            className="w-full h-full object-cover" 
            src={localStorage.getItem("gymPic")} 
            alt="Gym Pic" 
          />
        </div>

        <div className='flex flex-col'>
          <div className='text-xl flex items-center gap-2'>
            {greeting}
            {isDay ? (
              <SunnyIcon style={{ color: '#FFD700' }} />
            ) : (
              <Brightness1Icon style={{ color: '#FFD700' }} />
            )}
          </div>
          <div className='text-sm text-gray-400'>Admin</div>
        </div>
      </div>

      <div className='mt-10 pt-8 border-t-2 border-gray-700 space-y-4'>
        <Link  to ="/dashboard" className={`flex gap-5 font-semibold text-lg bg-slate-800 p-3 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 to-pink-500 hover:text-black  ${location.pathname==="/dashboard" ? "border-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" : null}`}>
          <HomeIcon />
          <span>Dashboard</span>
        </Link>
        <Link to="/member" className={`flex gap-5 font-semibold text-lg bg-slate-800 p-3 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 to-pink-500 hover:text-black  ${location.pathname==="/member" ? "border-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" : null}`}>
          <GroupIcon />
          <span>Members</span>
        </Link>
        <div onClick={()=>{handleLogout()}} className='flex gap-5 font-semibold text-lg bg-slate-800 p-3 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 to-pink-500 hover:text-black'>
          <LogoutIcon />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
