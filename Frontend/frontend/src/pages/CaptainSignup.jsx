import React, { useContext } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { captainData } from '../context/CaptainContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom' 
import CaptainHome from './CaptainHome'
import Home from './Home'

const CaptainSignup = () => {

  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const [firstname,setfirstname]=useState('')
  const [lastname,setlastname]=useState('')
  const [vehiclecolor,setvehiclecolor]=useState("")
  const [vehicleplate,setvehicleplate]=useState("")
  const [vehiclecapecity,setvehicapecity]=useState("")
  const [vehicletype,setvehicletype]=useState("")
  const {captain,setCaptain} =useContext(captainData)

  const navigate=useNavigate()

  const submitHandler= async(e)=>{
    e.preventDefault()
    
    const newcaptain={
      fullname:{
        firstname:firstname,
        lastname:lastname
      },
      password:password,
      email:email,
      vehicle:{
        color:vehiclecolor,
        plate:vehicleplate,
        capecity:vehiclecapecity,
        vehicleType:vehicletype
      }
    }

    try {
      const response = await axios.post("http://localhost:3000/captains/register", newcaptain);
      if(response.status === 201) {
        const data = response.data;
        
        // Store token and captain ID in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('captainid', data.captain._id); 
        
        // Set captain data in context
        setCaptain(data.captain);
        
        // Log the captain data that was returned from the server
        console.log('Captain registered successfully:', data.captain);
        
        // Navigate to captain home
        navigate('/captain-Home');
      } 
    } catch (error) {
      console.error('Error during signup:', error);
    }
  }

  return (
    <div>
      <div className='p-7 flex  h-screen flex-col justify-between'>
        <div>
          <img className='w-16 mb-10' src="data:image/jpeg;base64,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" alt="" srcset="" />
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>

            <h3 className='text-lg font-medium mb-2'>name</h3>
            <div  className='flex gap-4'>

              <input
                placeholder='first name'
                type='text'
                value={firstname}
                onChange={(e)=>{
                  setfirstname (e.target.value)
                }}
                required
                className='bg-[#eeeee] mb-7 w-1/2  rounded px-4 py-2 border  text-lg placeholder:text-base' />

              <input
                placeholder='lastname'
                value={lastname}
                onChange={(e)=>{
                    setlastname(e.target.value)
                }}
                type="text" required
                className='bg-[#eeeee] mb-7  w-1/2 rounded px-4 py-2 border  text-lg placeholder:text-base' />
            </div>

            <h3 className='text-lg font-medium mb-2'>Whats Your Email</h3>
            <input
              placeholder='email@.com'
              value={email}
              onChange={(e)=>{
                 setEmail(e.target.value)
              }}
              type="email" required
              className='bg-[#eeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' />
            
            <h3 className='text-lg font-medium'>Enter Password</h3>
            <input
              value={password}
              onChange={(e)=>{
                setPassword(e.target.value)
              }}
              className='bg-[#eeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type='password' required placeholder='password' />
           
           <h3 className='text-lg font-medium mb-2'>Vehicle</h3>
            <div  className='flex gap-4'>

              <input
                placeholder='vehicle-color'
                type='text'
                value={vehiclecolor}
                onChange={(e)=>{
                  setvehiclecolor (e.target.value)
                }}
                required
                className='bg-[#eeeee] mb-7 w-1/2  rounded px-4 py-2 border  text-lg placeholder:text-base' />

              <input
                placeholder='vehicle-plate'
                value={vehicleplate}
                onChange={(e)=>{
                    setvehicleplate(e.target.value)
                }}
                type="text" required
                className='bg-[#eeeee] mb-7  w-1/2 rounded px-4 py-2 border  text-lg placeholder:text-base' />
            </div>
           
            <div  className='flex gap-4'>

              <input
                placeholder='vehicle-capecity'
                type='text'
                value={vehiclecapecity}
                onChange={(e)=>{
                   setvehicapecity(e.target.value)
                }}
                required
                className='bg-[#eeeee] mb-7 w-1/2  rounded px-4 py-2 border  text-lg placeholder:text-base' />

              <div style={{ display: 'inline-block', margin: '10px 0' }}>
                <select
                  value={vehicletype}
                  onChange={(e) => {
                    setvehicletype(e.target.value);
                  }}
                  style={{
                    padding: '5px 10px',
                    fontSize: '14px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    backgroundColor: '#f9f9f9',
                    cursor: 'pointer',
                    width: '150px',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseOver={(e) => (e.target.style.borderColor = '#007bff')}
                  onMouseOut={(e) => (e.target.style.borderColor = '#ccc')}
                  onFocus={(e) => {
                    e.target.style.outline = 'none';
                    e.target.style.borderColor = '#0056b3';
                    e.target.style.boxShadow = '0 0 5px rgba(0, 91, 179, 0.5)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#ccc';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="">Select vehicle type</option>
                  <option value="car">Car</option>
                  <option value="bike">Bike</option>
                  <option value="auto">Auto</option>
                </select>
              </div>

            </div>
           
            <button
              className='bg-[#111] text-white   font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            > Create Account</button>
          </form>
        </div>

        <div>
          <p className='text-center'>
            Already have a account ?
            <Link to='/captain-login' className='text-blue-600'> Login </Link>
          </p>
          <p className='text-[10px]'> This site is protected by reCAPTCHA and the <span className='underline'> googleservice policy  </span> and <span className='uderline'>  Terms of service apply</span> </p>
        </div>
      </div>
    </div>
  )
}

export default CaptainSignup