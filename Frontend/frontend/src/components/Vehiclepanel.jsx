import React from 'react'
import autoImage from '../assets/uberauto.webp'
import bikeImage from '../assets/uberbike.webp'
import carImage from '../assets/ubercar.webp'

function Vehiclepanel(props) {
  const vehicles = [
    {
      type: 'Auto',
      image: autoImage,
      capacity: 3,
      time: '2',
      description: 'Budget friendly auto rides',
    },
    {
      type: 'Moto',
      image: bikeImage,
      capacity: 1,
      time: '1',
      description: 'Quick bike rides',
    },
    {
      type: 'Car',
      image: carImage,
      capacity: 4,
      time: '3',
      description: 'Comfortable car rides',
    }
  ];

  const handleVehicleSelect = (vehicle) => {
    props.setVehicleType?.(vehicle.type);
    console.log(vehicle.type);
    props.setConfirmRide(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="px-4 py-3 border-b border-gray-200 bg-white sticky top-0 z-10">
        <h5 
          onClick={() => props.setVehiclepanel(false)}
          className="flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700 cursor-pointer"
        > 
          <i className="ri-arrow-down-wide-fill text-xl"></i>
        </h5>
      </div>

      <div className="p-4 space-y-3">
        <h2 className="text-xl font-bold mb-4">Choose your ride</h2>
        
        {vehicles.map((vehicle, index) => (
          <div 
            key={index}
            onClick={() => handleVehicleSelect(vehicle)}
            className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-black hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.type}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-1">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  {vehicle.type}
                  <span className="px-2 py-1 bg-gray-100 text-sm rounded-full flex items-center gap-1">
                    <i className="ri-user-line"></i>
                    {vehicle.capacity}
                  </span>
                </h4>
                <p className="text-sm text-gray-500">{vehicle.description}</p>
                <p className="text-sm text-gray-600">{vehicle.time} mins away</p>
              </div>
            </div>

            <div className="text-right">
              <h3 className="text-xl font-bold">₹{props.fares?.[vehicle.type.toLowerCase()] || '--'}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Vehiclepanel