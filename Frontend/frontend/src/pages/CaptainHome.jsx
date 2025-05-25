import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import RidePop from '../components/RidePop'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useContext, useState } from 'react';
import ConfirmRidepop from '../components/ConfirmRidepop';
import { captainData } from '../context/CaptainContext';
import { SocketContext } from '../context/SocketContext';

import { useEffect } from 'react';

function Riding() {
  const { socket } = useContext(SocketContext);
  const { captain } = useContext(captainData);
  const [ridepopup, setridepopup] = useState(true);
  const rideRef = useRef(null);
  const [confirmRidepop, setconfirmRidepop] = useState(false);
  const confirmRidepopRef = useRef(null);
  console.log ('Captain in Riding:', captain);
  
  const locationIntervalRef = useRef(null);

 // make a https reuest to get captain location and set it to the db in the ibnterval
  // Listen for new ride requests
 


  // Function to start sending captain's location at intervals
const captainid=localStorage.getItem('captainid');
useEffect(() => {
  socket.emit('join', { userType: 'captain', userId: captainid });
}, [socket, captainid]);


 

  useGSAP(() => {
    if (confirmRidepop) {
      gsap.to(confirmRidepopRef.current, {
        transform: 'translateY(0)'
      });
    } else {
      gsap.to(confirmRidepopRef.current, {
        transform: 'translateY(100%)'
      });
    }
  }, [confirmRidepop]);  // Socket event listener is now handled in the useEffect hook above

  useGSAP(() => {
    if (ridepopup) {
      gsap.to(rideRef.current, {
        transform: 'translateY(0)'
      });
    } else {
      gsap.to(rideRef.current, {
        transform: 'translateY(100%)'
      });
    }
  }, [ridepopup]);

  // Display loading state if captain data is not available
 
  // Add detailed debug logging for captain data
  console.log('Captain in Home:', {
  captain
  });
  const captainName = captain?.fullname?.firstname  +" "+   captain?.fullname?.lastname||'Captain';

  return (
    <div className='h-screen fixed bg-gray-100 '>

      <div className=''>

        <div className="relative w-full">
          <Link to="/home">
            <img className="w-20 absolute left-2 top-5" src="data:image/jpeg;base64,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" alt="" srcset="" />
          </Link>
          <i className="absolute  w-10 h-10 rounded-full bg-white p-2 shadow-md right-2 top-5 ri-logout-box-r-line"></i>
        </div>


      </div>



      <div className='h-[52%] w-full'>
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="Your Image" />
      </div>

{/*  */}
<div className="flex justify-between items-center px-6 py-4 bg-white shadow rounded-lg">
        <div className="flex items-center gap-4">
          <img className="h-14 w-14 rounded-full object-cover border-2 border-gray-300" 
            src="https://img.freepik.com/free-photo/front-view-smiley-woman-with-earbuds_23-2148613052.jpg" alt="Profile" />          <h3 className="text-lg font-semibold text-gray-800">
            
            <div className='capitalize'>
              {captainName }
            </div>
          </h3>
        </div>
        <h3 className="text-lg font-semibold text-gray-600">2.3 km</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-6 p-6 bg-white shadow rounded-lg">
        <div className="flex flex-col items-center p-4 bg-gray-100 border border-gray-300 rounded-lg">
          <i className="ri-time-line text-3xl text-blue-500"></i>
          <p className="mt-2 font-semibold text-gray-700">Time</p>
          <p className="text-sm text-gray-500">Hours online</p>
        </div>
        <div className="flex flex-col items-center p-4 bg-gray-100 border border-gray-300 rounded-lg">
          <i className="ri-speed-up-line text-3xl text-green-500"></i>
          <p className="mt-2 font-semibold text-gray-700">Average Speed</p>
          <p className="text-sm text-gray-500">Speed</p>
        </div>
        <div className="flex flex-col items-center p-4 bg-gray-100 border border-gray-300 rounded-lg">
          <i className="ri-pin-distance-line text-3xl text-red-500"></i>
          <p className="mt-2 font-semibold text-gray-700">Total Distance</p>
          <p className="text-sm text-gray-500">Average Distance</p>
        </div>
      </div>
      
      <div ref={rideRef} className="fixed w-full bottom-0 bg-white p-8 shadow-lg rounded-t-lg translate-y-full transition-transform duration-300">
        <RidePop setridepopup={setridepopup} ridepopup={ridepopup} confirmRidepop={confirmRidepop} setconfirmRidepop={setconfirmRidepop} />
      </div>
      
      <div ref={confirmRidepopRef} className="fixed w-full bottom-0 h-full bg-white p-8 shadow-lg translate-y-full transition-transform duration-300">
        <ConfirmRidepop setridepopup={setridepopup} ridepopup={ridepopup} setconfirmRidepop={setconfirmRidepop} />
      </div>



      {/* <div ref={ConfirmRideRef} className="fixed w-full  mb-1 z-10   translate-y-full bottom-0 bg-white p-12">


<ComfirmRide  setvehiclefound={setvehiclefound}/>
</div> */}





    </div>
  )
}

export default Riding
