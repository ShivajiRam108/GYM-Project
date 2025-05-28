import React from 'react';
import CloseIcon from '@mui/icons-material/Close';


function Model({ handleClose,content , header}) {
  
  
  return (
    <div className="w-full h-[100vh] fixed bg-black bg-opacity-50 text-black top-0 left-0 flex justify-center z-50">
      <div className="w-1/2 bg-white rounded-lg h-fit mt-32 p-6 shadow-lg">
        <div className="flex justify-between items-center">
          <div className="text-4xl font-semibold">{header}</div>
          <div className="cursor-pointer" onClick={()=>handleClose()}>
            <CloseIcon sx={{ fontSize: "32px" }} />
          </div>
        </div>
        <div className="mt-10">
          {content }
        </div>i
      </div>
    </div>
  );
}

export default Model;
