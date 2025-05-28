
import './App.css'
import SideBar from './Components/SideBar/SideBar'
import DashBoard from './Pages/DashBoard/DashBoard'
import Home from './Pages/HomePage/Home'
import {Routes, Route, useNavigate} from 'react-router-dom'
import { useState , useEffect   } from 'react'
import Member from './Pages/Members/Member'
import GeneralUser from './Pages/GeneralUser/GeneralUser'
import MemberDetails from './Pages/MemberDetails/MemberDetails'
import "react-toastify/dist/ReactToastify.css";

function App() {
 
  const [isLogin, setIsLogin] = useState(false)

  const navigate = useNavigate();
  useEffect (()=>{
      let isLogedIn = sessionStorage.getItem("isLogin")
      if (isLogedIn){
        setIsLogin(true);
        navigate("./Dashboard")
      }else{
        setIsLogin(false)
          navigate("/")
        }

      
  },[sessionStorage.getItem("isLogin")])
  return (
      <div className='flex'>
          {
            isLogin && <SideBar />
          }
        <Routes>
          <Route path="/" element= {<Home/>} />
          <Route path="/Dashboard" element= {<DashBoard/>} />
          <Route path="/member" element = {<Member />}  />
          <Route path="/specific/:page" element ={ <GeneralUser />} />
          <Route path="/member/:id" element ={ <MemberDetails />} />
          
        </Routes>
        
      </div>

  )
}

export default App
