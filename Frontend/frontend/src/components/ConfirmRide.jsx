import React from 'react'

function ConfirmRide(props) {
  return (
    <div>
      {/* <h5 onClick={() => {
  props.setVehiclepanel(false)

}} className='p-2 flex justify-center'> <i className="ri-arrow-down-wide-fill"></i></h5>  */}
      <h3 className='text-3xl font-semibold mb-5'> confirm your ride </h3>

      <div className='flex  gap-2 flex-col justify-between items-center'>
        <img className='h-20' src="https://www.uber-assets.com/image/upload/v1646663215/assets/6e/e50c1b-2174-4c97-83a1-bfd4544689d0/original/uberX.png" alt="" />

      </div>
      <div className='w-full mt-5'>
        <div className='flex items-center gap-5 p-3 mb-2 border-b-2'>
          <div>

            <i className="  text-lh ri-map-pin-2-line"></i>

          </div>
          <div>
            <h3 className='text-lg font-medium'> 414/1-A</h3>
            <p className=' text-sm -mt-1 text-gray-600'> near krishna bekary</p>
          </div>


        </div>

        {/* user location div */}
        <div>

        <div className='flex items-center gap-5 mb-2 p-3 border-b-2'>
          <div>

              <i class="ri-user-location-fill"></i>

          </div>
          <div>
            <h3 className='text-lg font-medium'> 414/1-A</h3>
            <p className=' text-sm -mt-1 text-gray-600'> near krishna bekary</p>
          </div>


        </div>
        </div>


        {/* payment div */}
        <div>

        <div className='flex items-center gap-5 mb-2 p-3 border-b-2'>
          <div>

          <i classname="ri-money-dollar-circle-fill"></i>

          </div>
          <div>
            <h3 className='text-lg font-medium'> 414/1-A</h3>
            <p className=' text-sm -mt-1 text-gray-600'> near krishna bekary</p>
          </div>


        </div>
        </div>
      </div>
      <button  onClick={()=>{

        props.setvehiclefound(true)
      }} className='w-full bg-green-600 text-white font-semibold p-2 rounded-lg'>
        confirm
      </button>


    </div>
  )
}

export default ConfirmRide
