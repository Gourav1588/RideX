import React from 'react'
import carImage from '../assets/ubercar.webp'
import autoImage from '../assets/uberauto.webp'
import bikeImage from '../assets/uberbike.webp'

function ConfirmRide(props) {
  const getVehicleImage = () => {
    const type = props.vehicleType?.toLowerCase();
    switch(type) {
      case 'car':
        return carImage;
      case 'auto':
        return autoImage;
      case 'bike':
        return bikeImage;
      default:
        return carImage;
    }
  }

  return (
    <div>
      {/* <h5 onClick={() => {
  props.setVehiclepanel(false)

}} className='p-2 flex justify-center'> <i className="ri-arrow-down-wide-fill"></i></h5>  */}
      <h3 className='text-3xl font-semibold mb-5'> confirm your ride </h3>

      <div className='flex  gap-2 flex-col justify-between items-center'>
        <img className='h-20' src={getVehicleImage()} alt={`${props.vehicleType || 'Vehicle'} image`} />

      </div>
      <div className='w-full mt-5'>
        <div className='flex items-center gap-5 p-3 mb-2 border-b-2'>
          <div>

            <i className="  text-lh ri-map-pin-2-line"></i>

          </div>
          <div>            <h3 className='text-lg font-medium'>Pickup Location</h3>
            <p className=' text-sm -mt-1 text-gray-600'>{props.from}</p>
          </div>


        </div>

        {/* user location div */}
        <div>

        <div className='flex items-center gap-5 mb-2 p-3 border-b-2'>
          <div>

              <i class="ri-user-location-fill"></i>

          </div>
          <div>
            <h3 className='text-lg font-medium'>Drop Location</h3>
            <p className=' text-sm -mt-1 text-gray-600'>{props.destination}</p>
          </div>


        </div>
        </div>


        {/* payment div */}
        <div>

        <div className='flex items-center gap-5 mb-2 p-3 border-b-2'>
          <div>          <i className="ri-money-dollar-circle-fill text-xl"></i>

          </div>
          <div>
            <h3 className='text-lg font-medium'>Fare Amount</h3>
            <p className='text-sm -mt-1 text-gray-600'>₹{props.fare || '--'}</p>
          </div>


        </div>
        </div>
      </div>      <button onClick={async () => {
          await props.createRide();
          props.setRideOverView(false);
          props.setvehiclefound(true);
      }} className='w-full bg-green-600 text-white font-semibold p-2 rounded-lg hover:bg-green-700 transition-colors'>
        Confirm Booking
      </button>


    </div>
  )
}

export default ConfirmRide
