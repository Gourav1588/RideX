import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPannel from '../components/LocationSearchPannel'
import ComfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'
import Vehiclepanel from '../components/Vehiclepanel'
const baseurl = import.meta.env.VITE_BASE_URL;
import axios from 'axios'
import { header } from 'express-validator'
import { useContext } from 'react'
import { userDataContext } from '../context/Context'
import { SocketContext } from '../context/SocketContext'
import { use } from 'react'

function Home() {
const [fare,setFare] = useState(null);
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
  const {socket} = useContext(SocketContext);
  const[vehiclefound,setvehiclefound]=useState(false)
  const[waitingForDriver,setwaitingForDriver]=useState(false)
  const waitingForDriverRef=useRef(null)
  const[VehicleType,setVehicleType]=useState('')
  const {user} = useContext(userDataContext);
 

useEffect(() => {
  socket.emit('join', { userType: 'user', userId: user._id });})


  // GSAP animations for the panels

  useGSAP(() => {
    if (panelopen) {
      gsap.to(panelref.current, {
        y: '0%',
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      gsap.to(panelref.current, {
        y: '100%',
        duration: 0.3,
        ease: 'power2.in'
      });
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

  }     async function createRide() {
      try {
        const token = localStorage.getItem('token');
        console.log('Creating ride with:', {
          pickup: from,
          destination: destination,
          vehicleType: VehicleType.toLowerCase(),
          token: token
        });
        const response = await axios.post(`${baseurl}/ride/create`,          {
            pickup: from,
            destination: destination,
            vehicleType: VehicleType.toLowerCase()
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );
        console.log('Ride created successfully:', response.data);
      } catch (error) {
        console.error('Error creating ride:', error);
      }

  }
  return (
    <div className="h-screen w-screen relative bg-gray-50 overflow-hidden">
      {/* Map Background */}
      <div className="h-full w-full">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Map"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-xl p-6">
        {/* Handle */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>

        <div className="mt-4">
          <h1 className="text-2xl font-bold mb-6">Where to?</h1>
          
          {/* Search Inputs */}
          <div className="space-y-4">
            <div 
              className="relative group"
              onClick={() => setpanelopen(true)}
            >
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                {from && <span className="text-xs text-gray-500 absolute -top-4 left-0">Pickup Location</span>}
              </div>
              <input
                type="text"
                placeholder="Enter pickup location"
                value={from}
                readOnly
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none cursor-pointer transition-all"
              />
            </div>

            <div 
              className="relative group"
              onClick={() => setpanelopen(true)}
            >
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                {destination && <span className="text-xs text-gray-500 absolute -top-4 left-0">Drop Location</span>}
              </div>
              <input
                type="text"
                placeholder="Where to?"
                value={destination}
                readOnly
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none cursor-pointer transition-all"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors flex-1">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="ri-time-line text-xl text-blue-600"></i>
                </div>
                <span className="font-medium">Now</span>
              </button>
              <button className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors flex-1">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="ri-calendar-line text-xl text-blue-600"></i>
                </div>
                <span className="font-medium">Schedule</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Panel */}
      <div
        ref={panelref}
        className="fixed inset-0 bg-white z-50 transform translate-y-full"
      >
        <LocationSearchPannel
        fare={fare}
          panelopen={panelopen}
          setpanelopen={setpanelopen}
          Vehiclepanl={Vehiclepanl}
          setVehiclepanel={setVehiclepanel}
          setFrom={setfrom}
          setDestination={setdestination}
          from={from}
          destination={destination}
          setFare={setFare}

        />
      </div>

      {/* Vehicle Panel Container */}
      {Vehiclepanl && (
        <div
          ref={VehiclepanelRef}
          className="fixed inset-0 bg-white z-50 transform translate-y-full"
        >          <Vehiclepanel
            setVehiclepanel={setVehiclepanel}
            from={from}
            destination={destination}
            fares={fare}
            setConfirmRide={setRideOverView}
            setVehicleType={setVehicleType}
          />
        </div>
      )}

      {/* Confirm Ride Panel */}
      <div
        ref={ConfirmRideRef}
        className="fixed inset-0 bg-white z-50 transform translate-y-full"
      >
        <ComfirmRide          setRideOverView={setRideOverView}
          createRide={createRide}
          from={from}
          destination={destination}
          setvehiclefound={setvehiclefound}
          fare={fare?.[VehicleType.toLowerCase()]}
          setlookingForDriver={setwaitingForDriver}
        />
      </div>

      {/* Vehicle Found Panel */}
      {vehiclefound && (
        <div          ref={vehiclefoundRef}
          className="fixed inset-0 bg-white z-50 transform translate-y-full"
        >
          <LookingForDriver 
            setwaitingForDriver={setwaitingForDriver}
            from={from}
            destination={destination}
            vehicleType={VehicleType}
            fare={fare?.[VehicleType.toLowerCase()]}
          />
        </div>
      )}

      {/* Waiting for Driver Panel */}
      {waitingForDriver && (
        <div
          ref={waitingForDriverRef}
          className="fixed inset-0 bg-white z-50 transform translate-y-full"
        >
          <WaitingForDriver />
        </div>
      )}
    </div>
  );
}

export default Home