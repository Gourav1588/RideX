import React, { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPannel from '../components/LocationSearchPannel'
import ComfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'


function Home() {

  const [from, setfrom] = useState('')
  const [destination, setdestination] = useState('')
  const [panelopen, setpanelopen] = useState(false)
  const panelref = useRef(null)
  const panelcloseref = useRef(null)
  const VehiclepanelRef = useRef(null)
  const [Vehiclepanl, setVehiclepanel] = useState(false)
  const [RideOverView,setRideOverView]=useState(false)
  const ConfirmRideRef=useRef(null)
  const vehiclefoundRef=useRef(null)
  
  const[vehiclefound,setvehiclefound]=useState(false)
  const[waitingForDriver,setwaitingForDriver]=useState(false)
  const waitingForDriverRef=useRef(null)



  useGSAP(() => {
    if (panelopen) {
      gsap.to(panelref.current, {
        height: '70%'
      })
      gsap.to(panelcloseref.current, {
        opacity: 1
      })
    }

    else {
      gsap.to(panelref.current, {
        height: '0%'


      })
      gsap.to(panelcloseref.current, {
        opacity: 0
      })
    }
  }, [panelopen])



  useGSAP(() => {
    if (Vehiclepanl) {
      gsap.to(VehiclepanelRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(VehiclepanelRef.current, {
        transform: 'translateY(100%)'

      })

    }

  }, [Vehiclepanl])



  useGSAP(() => {
    if (RideOverView) {
      gsap.to(ConfirmRideRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(ConfirmRideRef.current, {
        transform: 'translateY(100%)'

      })

    }

  }, [RideOverView])




  // for vehicle found

  useGSAP(() => {
    if (vehiclefound) {
      gsap.to(vehiclefoundRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(vehiclefoundRef.current, {
        transform: 'translateY(100%)'

      })

    }

  }, [vehiclefound])

  // gsap for waiting for driver
  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'

      })

    }

  }, [waitingForDriver])




  function submitHandler(e) {
    e.preventDefault()


  }
  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-20 absolute left-2 top-5' src="data:image/jpeg;base64,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" alt="" srcset="" />
      <div className=' h-screen w-screen'>
        <img className=' h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="Your Image" />

        <div className='  flex flex-col justify-end absolute h-screen top-0  w-full '>

          <div className='h-[30%] w-full  p-5 bg-white'>

            <div ><i onClick={() => {
              setpanelopen(false)
              console.log(panelopen)
            }} ref={panelcloseref} className="ri-arrow-down-wide-fill opacity-1"></i></div>

            <h4 className='text-3xl font-semibold'>find a trip</h4>

            <form onSubmit={(e) => {
              setfrom(e)
            }}>
              <input className='bg-[#eee] px-12 py-2 rounded-lg w-full mt-5  border-2 border-black'
                type="text" placeholder='add a pickup location'

                onClick={() => {
                  setpanelopen(true)


                }}
                value={from}
                onChange={(e) => {

                  setfrom(e.target.value)


                }}

              />
              <input className='bg-[#eee] px-12 py-2 rounded-lg w-full mt-2 border-2 border-black'
                value={destination}

                onClick={() => {
                  setpanelopen(true)
                }}
                onChange={(e) => {
                  setdestination(e.target.value)


                }}
                type="text" placeholder='add destination' />

            </form>
          </div>
          <div ref={panelref} className=' h-0 bg-white-500 '>
            <LocationSearchPannel panelopen={panelopen} setpanelopen={setpanelopen} Vehiclepanl={Vehiclepanl} setVehiclepanel={setVehiclepanel} />
          </div>





          <div ref={VehiclepanelRef} className="fixed w-full  mb-1 z-10 translate-y-full bottom-0 bg-white p-1">


            <div ref={VehiclepanelRef}  >

              <h5 onClick={() => {
                setVehiclepanel(false)
                console.log(Vehiclepanl)
              }} className='p-2 flex justify-center'> <i className="ri-arrow-down-wide-fill"></i></h5>  </div>
            <div  onClick={() => {
                setVehiclepanel(false)
                console.log(Vehiclepanl)
              }}
               className="flex items-center justify-between bg-white-500 p-2 rounded-lg shadow-lg border-black border-2">
              <img className="h-10" src="https://www.uber-assets.com/image/upload/v1699622825/assets/26/12256b-fe40-4f78-b94c-d2ffdec56a23/original/UberBlack.png" alt="Uber Logo" />

              <div  onClick={()=>{
                setRideOverView(true)
              }}className=" w-1/2 p-1 rounded-xl text-center">
                <h4  
                
                className="text-black text-l font-semibold">
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
        <div>




        <div ref={ConfirmRideRef} className="fixed w-full  mb-1 z-10 translate-y-full bottom-0 bg-white p-12">


        <ComfirmRide  setvehiclefound={setvehiclefound}/>
        </div>


        
        <div ref={vehiclefoundRef} className="fixed w-full  mb-1 z-10 translate-y-full bottom-0 bg-white p-12">
          <LookingForDriver/>

        
        </div>

        <div  className="fixed w-full  mb-1 z-10 translate-y-full  bottom-0 bg-white p-12">
          <WaitingForDriver  setwaitingForDriver={setwaitingForDriver}/>

        
        </div>
       
        </div>









        </div>



      </div>
    </div>


  )
}

export default Home