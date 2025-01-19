import React from 'react';

function LocationSearchPannel(props) {
  console.log(props.Vehiclepanel)
  const locations = [
    "Shree Krishna Bekary And SuperMart",
    "Shree Krishna Bekary And SuperMart",
    "Shree Krishna Bekary And SuperMart",
    "Shree Krishna Bekary And SuperMart",
    "Shree Krishna Bekary And SuperMart",
    "Shree Krishna Bekary And SuperMart",
  
  ];

  return (
    <div  onClick={() => {
      props.setpanelopen(false)}} className="p-5 bg-gray-100 rounded-lg shadow-md">
      {locations.map((location, index) => (
        <div key={index}    
        
        
        onClick={()=>{
          props.setVehiclepanel(true)
          
          
        }}
        
        className="flex items-center gap-4 p-3 mb-3 bg-white rounded-md shadow hover:bg-gray-50 transition">
          <h4 className="flex items-center justify-center w-12 h-12 bg-gray-200 text-gray-600 rounded-full">
            <i className="ri-map-pin-2-line text-xl"></i>
          </h4>
          <div className="text-lg font-medium text-gray-700">{location}</div>
        </div>
      ))}
    </div>
  );
}

export default LocationSearchPannel;
