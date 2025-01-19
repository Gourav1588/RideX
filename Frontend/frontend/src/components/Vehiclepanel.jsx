import React from 'react'

function Vehiclepanel(props) {
  return (
    <div>
      

      <div ref={props.VehiclepanelRef} >

<h5 onClick={(props) => {
  props.setVehiclepanel(false)
  console.log(props.Vehiclepanl)
}} className='p-2 flex justify-center'> <i className="ri-arrow-down-wide-fill"></i></h5>  </div>
<div className="flex items-center justify-between bg-white-500 p-2 rounded-lg shadow-lg border-black border-2">
<img className="h-10" src="https://www.uber-assets.com/image/upload/v1699622825/assets/26/12256b-fe40-4f78-b94c-d2ffdec56a23/original/UberBlack.png" alt="Uber Logo" />

<div className=" w-1/2 p-1 rounded-xl text-center">
  <h4 className="text-black text-l font-semibold">
    Uber Go <span className="bg-white text-black text-m p-1 rounded-full"> <i class="ri-user-line"></i>  4</span>
  </h4>
  <h5 className="text-black text-m">2 mins away</h5>
  <h3 className="text-black text-m">Affordable price</h3>
</div>

<h2 className="text-black text-m font-bold">$40</h2>
</div>

<div className="flex items-center justify-between bg-white-500 p-2 rounded-lg  mt-3  border-2 border-black ">
<img className="h-10" src="https://www.uber-assets.com/image/upload/v1699622825/assets/26/12256b-fe40-4f78-b94c-d2ffdec56a23/original/UberBlack.png" alt="Uber Logo" />

<div className=" w-1/2 p-1 rounded-xl text-center">
  <h4 className="text-black text-l font-semibold">
    Uber Go <span className="bg-white text-black text-m p-1 rounded-full"> <i class="ri-user-line"></i>  4</span>
  </h4>
  <h5 className="text-black text-m">2 mins away</h5>
  <h3 className="text-black text-m">Affordable price</h3>
</div>

<h2 className="text-black text-m font-bold">$40</h2>
</div>

<div className="flex items-center justify-between bg-white-500 p-2 rounded-lg shadow-lg  mt-3  border-2 border-black">
<img className="h-10" src="https://www.uber-assets.com/image/upload/v1699622825/assets/26/12256b-fe40-4f78-b94c-d2ffdec56a23/original/UberBlack.png" alt="Uber Logo" />

<div className=" w-1/2 p-1 rounded-xl text-center">
  <h4 className="text-black text-l font-semibold">
    Uber Go <span className="bg-white text-black text-m p-1 rounded-full"> <i class="ri-user-line"></i>  4</span>
  </h4>
  <h5 className="text-black text-m">2 mins away</h5>
  <h3 className="text-black text-m">Affordable price</h3>
</div>

<h2 className="text-black text-m font-bold">$40</h2>
</div>

<div className="flex items-center justify-between bg-white-500 p-2 rounded-lg   mt-2 shadow-lg border-2 border-black">
<img className="h-10" src="https://www.uber-assets.com/image/upload/v1699622825/assets/26/12256b-fe40-4f78-b94c-d2ffdec56a23/original/UberBlack.png" alt="Uber Logo" />

<div className=" w-1/2 p-1 rounded-xl text-center">
  <h4 className="text-black text-l font-semibold">
    Uber Go <span className="bg-white text-black text-m p-1 rounded-full"> <i class="ri-user-line"></i>  4</span>
  </h4>
  <h5 className="text-black text-m">2 mins away</h5>
  <h3 className="text-black text-m">Affordable price</h3>
</div>

<h2 className="text-black text-m font-bold">$40</h2>
</div>
</div>


  )
}

export default Vehiclepanel
