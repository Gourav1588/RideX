import React from 'react';

function RidePop(props) {
  return (
    <div className="bg-white shadow-lg mt-100 rounded-lg p-4 w-80">
      {/* Close Button */}
     

      {/* Header */}
      <h3 className="text-xl font-semibold text-center mb-4">New Ride Available!</h3>

      {/* Driver Details */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img 
            className="h-10 w-10 rounded-full object-cover" 
            src="https://img.freepik.com/free-photo/front-view-smiley-woman-with-earbuds_23-2148613052.jpg" 
            alt="Driver"
          />
          <h3 className="text-sm font-semibold">Hariya Singh</h3>
        </div>
        <h3 className="text-sm font-semibold text-gray-700">2.3 km</h3>
      </div>

      {/* Ride Image */}
      <div className="flex justify-center mt-2">
        <img 
          className="h-16" 
          src="https://www.uber-assets.com/image/upload/v1646663215/assets/6e/e50c1b-2174-4c97-83a1-bfd4544689d0/original/uberX.png" 
          alt="Car Type"
        />
      </div>

      {/* Location Details */}
      <div className="w-full mt-4">
        {/* Pickup Location */}
        <div className="flex items-center gap-3 p-2 border-b">
          <i className="text-lg text-green-500 ri-map-pin-2-line"></i>
          <div>
            <h3 className="text-sm font-medium">414/1-A</h3>
            <p className="text-xs text-gray-500">Near Krishna Bakery</p>
          </div>
        </div>

        {/* User Location */}
        <div className="flex items-center gap-3 p-2 border-b">
          <i className="text-lg text-blue-500 ri-user-location-fill"></i>
          <div>
            <h3 className="text-sm font-medium">414/1-A</h3>
            <p className="text-xs text-gray-500">Near Krishna Bakery</p>
          </div>
        </div>

        {/* Payment Details */}
        <div className="flex items-center gap-3 p-2 border-b">
          <i className="text-lg text-yellow-500 ri-money-dollar-circle-fill"></i>
          <div>
            <h3 className="text-sm font-medium">₹ 120</h3>
            <p className="text-xs text-gray-500">Cash Payment</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <button 
        onClick={() => props.setconfirmRidepop(true)}
        className="w-full bg-green-600 text-white font-semibold p-2 rounded-lg mt-4 hover:bg-green-700"
      >
        Accept
      </button>

      <button 
        onClick={() => props.setridepopup(false)}
        className="w-full bg-gray-300 text-gray-700 font-semibold p-2 rounded-lg mt-2 hover:bg-gray-400"
      >
        Ignore
      </button>
    </div>
  );
}

export default RidePop;
