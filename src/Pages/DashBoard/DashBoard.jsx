import React,{useState, useEffect,useRef} from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ErrorIcon from '@mui/icons-material/Error';
import ReportIcon from '@mui/icons-material/Report';
import SideBar from '../../Components/SideBar/SideBar';

const DashBoard = () => {
  const [accordionDashboard, setAccordionDashboard] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (accordionDashboard && ref.current && !ref.current.contains(e.target)) {
        setAccordionDashboard(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [accordionDashboard]);

  const handleOnClickMenu = (value)=>{
    sessionStorage.setItem("func",value)
  }

  return (
    <div className='w-3/4 text-black p-5 relative'>
        <div className='w-full bg-slate-900 text-white rounded-lg flex p-3 justify-between items-center'>
            <MenuIcon sx={{cursor:"pointer"}} onClick = {() =>setAccordionDashboard(prev =>!prev)}/>
        
            
                <img  className='w-8 h-8 rounded-3xl border-2' src="https://i.pinimg.com/736x/cd/f5/a1/cdf5a14790264c1d794e191edc2bd3d9.jpg" alt="Image" />
            
        </div>
          {accordionDashboard && (
      <div ref={ref} className='absolute p-3 bg-amber-900 text-white rounded-xl text-lg font-extralight'>
        <div>Hi Welcome to Our Gym Management System.</div>
        <p>Feel free to ask any queries</p>
      </div>
    )}

        <div className='mt-5 pt-3 bg-slate-100 bg-opacity-50 grid gap-5 grid-cols-3 w-full pb-5 overflow-x-auto h-[80%]'> 
         
         {/* this is a curds  */}
          <Link  to= {'/member'} className='w-full  border-2 bg-white rounded-lg cursor-pointer'>
            <div className='h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'></div>

              <div className='py-7 px-20 flex-col justify-center items-center w-full h-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white '>
                  <PeopleAltIcon  sx={{color:"green ", fontSize :" 50px"}}/>
                  <p className='text-xl my-3 font-semibold font-mono'>Joined Members</p>
              </div>
          
          </Link>

          <Link to={"/specific/monthly"} onClick={()=>handleOnClickMenu("MonthlyJoined")} className='w-full  border-2 bg-white rounded-lg cursor-pointer'>
            <div className='h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'></div>

              <div className='py-7 px-20 flex-col justify-center items-center w-full h-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white '>
                  <SignalCellularAltIcon  sx={{color:"purple ", fontSize :" 50px"}}/>
                  <p className='text-xl my-3 font-semibold font-mono'>Monthly Joined</p>
              </div>
          </Link>

          <Link  to={"/specific/expire-within-3-days"} onClick={()=>handleOnClickMenu("threeDaysExpire")} className='w-full  border-2 bg-white rounded-lg cursor-pointer'>
            <div className='h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'></div>

              <div className='py-7 px-20 flex-col justify-center items-center w-full h-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white '>
                  <AccessAlarmIcon sx={{color:"red ", fontSize :" 50px"}}/>
                  <p className='text-xl my-3 font-semibold font-mono'>Expiring Within 3 Days</p>
              </div>
          </Link>
          <Link to={"/specific/expire-withIn-4-to-7-days"} onClick={()=>handleOnClickMenu("fourToSevenDaysExpire")} className='w-full  border-2 bg-white rounded-lg cursor-pointer'>
            <div className='h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'></div>

              <div className='py-7 px-20 flex-col justify-center items-center w-full h-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white '>
                  <AccessAlarmIcon sx={{color:"red ", fontSize :" 50px"}}/>
                  <p className='text-xl my-3 font-semibold font-mono'>Expiring Within 4-7 Days</p>
              </div>
          </Link>
          <Link to={"/specific/expired"} onClick={()=>handleOnClickMenu("expired")} className='w-full  border-2 bg-white rounded-lg cursor-pointer'>
            <div className='h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'></div>

              <div className='py-7 px-20 flex-col justify-center items-center w-full h-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white '>
                  <ErrorIcon  sx={{color:"red ", fontSize :" 50px"}}/>
                  <p className='text-xl my-3 font-semibold font-mono'>Expired</p>
              </div>
          </Link>
          <Link to={"/specific/inactive-members"} onClick={()=>handleOnClickMenu("inactiveMembers")} className='w-full  border-2 bg-white rounded-lg cursor-pointer'>
            <div className='h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'></div>

              <div className='py-7 px-20 flex-col justify-center items-center w-full h-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white '>
                  <ReportIcon sx={{color:" brown", fontSize :" 50px"}}/>
                  <p className='text-xl my-3 font-semibold font-mono'>Inactive Members</p>
              </div>
          </Link>
        </div>

        <div className='md-buttom-4 p-4 w-3/4 md-0 absolute bg-black text-white mt-20 rounded-xl text-xl'>
            Contact Developer for any Technical Error at +919121636068
        </div>
    </div>
  )
}

export default DashBoard;


