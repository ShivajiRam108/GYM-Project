import React, { useState } from 'react';
import Login from '../../Components/Login';
import Register from '../../Components/Register';


function Home() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="w-full h-screen">
      <div className="border-2 border-slate-800 bg-slate-800 text-white p-5 font-semibold text-xl text-center">
        Welcome To Gym Management System (GYM)
      </div>

      <div
        className="w-full h-full bg-cover bg-center flex justify-center items-start px-4 py-10"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0")',
        }}
      >
        {isRegister ? (
          <Register onSwitch={() => setIsRegister(false)} />
        ) : (
          <Login onSwitch={() => setIsRegister(true)} />
        )}
      </div>
    </div>
  );
}

export default Home;