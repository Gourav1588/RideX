import React from 'react'
import { Link } from 'react-router-dom'
function FinishRidepop(props) {
  return (

    <div className=" flex items-center justify-center bg-black bg-opacity-50">
        
    {/* Modal Box */}
    <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
    <div className=' ml-[40%] mb-3 text-2xl' onClick={()=>{
       props.setfinishRide(false)
    }}><i class="ri-arrow-down-wide-line"></i></div>
      {/* Header */}

      
      <h3 className="text-xl font-semibold text-center mb-4">Finish this  Ride</h3>

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

    

<div className="mt-5 space-y-2">

<Link to="/captain-home">
<button className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700">
  Finish Ride
</button></Link>



</div>
    
     
    </div>
  </div>
  )
}

export default FinishRidepop
