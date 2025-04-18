import React, { useState } from "react";
import { Link } from "react-router-dom";
function ConfirmRidepop(props ) {
  const[otp,setotp]=useState('')


  const submitHandler=(e)=>{
    e.preventDefault()

  }
  return (
    <div className=" flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal Box */}
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
        {/* Header */}
        <h3 className="text-xl font-semibold text-center mb-4">Confirm Your Ride</h3>

        {/* Driver Info */}
        <div className="flex items-center gap-3 mb-4 border-b pb-2">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://img.freepik.com/free-photo/front-view-smiley-woman-with-earbuds_23-2148613052.jpg"
            alt="Driver"
          />
          <div>
            <h3 className="text-sm font-semibold">Hariya Singh</h3>
            <p className="text-xs text-gray-500">2.3 km away</p>
          </div>
        </div>

        {/* Car Image */}
        <div className="flex justify-center mb-4">
          <img
            className="h-16"
            src="https://www.uber-assets.com/image/upload/v1646663215/assets/6e/e50c1b-2174-4c97-83a1-bfd4544689d0/original/uberX.png"
            alt="Car Type"
          />
        </div>

        {/* Ride Details */}
        <div className="space-y-3">
          {/* Pickup Location */}
          <div className="flex items-center gap-3 p-2 bg-gray-100 rounded">
            <i className="text-green-500 ri-map-pin-2-line"></i>
            <div>
              <h3 className="text-sm font-medium">414/1-A</h3>
              <p className="text-xs text-gray-500">Near Krishna Bakery</p>
            </div>
          </div>

          {/* Drop Location */}
          <div className="flex items-center gap-3 p-2 bg-gray-100 rounded">
            <i className="text-blue-500 ri-user-location-fill"></i>
            <div>
              <h3 className="text-sm font-medium">218/4-B</h3>
              <p className="text-xs text-gray-500">Near Central Park</p>
            </div>
          </div>

          {/* Payment Info */}
          <div className="flex items-center gap-3 p-2 bg-gray-100 rounded">
            <i className="text-yellow-500 ri-money-dollar-circle-fill"></i>
            <div>
              <h3 className="text-sm font-medium">₹ 120</h3>
              <p className="text-xs text-gray-500">Cash Payment</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}

        <form className="mt-6" onSubmit={(e)=>{
          submitHandler(e)
        }}>
          <input 
          value={otp}
          onChange={(e)=>{
            setotp(e.target.value)
          }} className ='bg-[#eee] px-12 py-2 rounded-lg w-full mt-2 border-2 border-black'type="text" placeholder="ENTER OTP" />

<div className="mt-5 space-y-2">

<Link to="/captain-riding">
<button className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700">
    Confirm Ride
  </button></Link>
 
  
  <button
    onClick={()=>{

      props.setridepopup(false)
      console.log(props.ridepopup)
      props.setconfirmRidepop(false)
    }}
  

    className="w-full bg-red-500 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-400"
  >
    Cancel
  </button>
</div>
        </form>
       
      </div>
    </div>
  );
}

export default ConfirmRidepop;
