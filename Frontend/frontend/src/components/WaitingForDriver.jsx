import React from 'react'

function WaitingForDriver() {
  return (
    <div>
    {/* <h5 onClick={() => {
props.setVehiclepanel(false)

}} className='p-2 flex justify-center'> <i className="ri-arrow-down-wide-fill"></i></h5>  */}
    

    <div className='flex items-center justify-between '>
      <img className='h-20 -ml-10' src="https://www.uber-assets.com/image/upload/v1646663215/assets/6e/e50c1b-2174-4c97-83a1-bfd4544689d0/original/uberX.png" alt="" />
<div className='text-right'>
    <h2 className='text-lg font-medium'>sam</h2>
    <h4 className='text-xl  font-semibold'>mp-04 1452</h4>
    <h5 className='text-sm text-gray-600'> maruti ciaz</h5>
</div>
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

        <i class="ri-money-dollar-circle-fill"></i>

        </div>
        <div>
          <h3 className='text-lg font-medium'> 414/1-A</h3>
          <p className=' text-sm -mt-1 text-gray-600'> near krishna bekary</p>
        </div>


      </div>
      </div>
    </div>
  


  </div>
  )
}

export default WaitingForDriver
