import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userDataContext } from '../context/Context'
import axios from 'axios'

const UserSignup =  () => {
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const [firstname,setfirstname]=useState('')
  const [lastname,setlastname]=useState('')
  const [userdata,setuserdata]=useState()



const submitHandler= async(e)=>{
  e.preventDefault()
  
  setEmail('')
  setPassword('')
  setfirstname('')
  setlastname('')

const newuser={
       fullName:{
      firstname:firstname,
      lastname:lastname
    },
    password:password,
    email:email
  }

  const response= await axios.post("http://localhost:3000/users/register",newuser)
  console.log(response)
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
            <di className='flex gap-4'>


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
            </di>

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
            <button

              className='bg-[#111] text-white   font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            > Login</button>
          </form>
        </div>

        <div>
          <p className='text-center'>
            Already have a account ?
            <Link to='/login' className='text-blue-600'> Login </Link>
          </p>
          <p className='text-[10px]'> By proceesing , you consent to get emails,including by automated means,from uber and its affilaties to the email provided</p>


        </div>
      </div>
    </div>
  )
}

export default UserSignup
