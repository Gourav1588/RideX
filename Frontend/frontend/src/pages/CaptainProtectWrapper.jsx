import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CaptainContext, { captainData } from '../context/CaptainContext';

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(captainData);

  useEffect(() => {
    if (!token) {
      console.log('No token found, redirecting...');
      navigate('/captain-login');
      return;
    }

    // Direct API call inside useEffect
    axios.get('http://localhost:3000/captains/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      if (response.status === 200) {
        setCaptain(response.data);  // Set the user data
        
        console.log('Captain profile fetched successfully:', response.data);
        navigate('/captain-Home');
      }
    })
    .catch(err => {
      console.error('Error fetching user profile:', err);
      navigate('/captain-login');
    });
  }, [token, navigate, setCaptain]);  // Dependencies for useEffect

  return <>{children}</>;
};

export default CaptainProtectWrapper;