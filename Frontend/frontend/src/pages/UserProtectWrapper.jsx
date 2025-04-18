import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userDataContext } from '../context/Context';

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { user, setuser } = useContext(userDataContext);

  useEffect(() => {
    if (!token) {
      console.log('No token found, redirecting...');
      navigate('/login');
      return;
    }

    // Direct API call inside useEffect
    axios.get('http://localhost:3000/users/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      if (response.status === 200) {
        setuser(response.data.user);  // Set the user data
        navigate('/Home');
      }
    })
    .catch(err => {
      console.error('Error fetching user profile:', err);
      navigate('/login');
    });
  }, [token, navigate, setuser]);  // Dependencies for useEffect

  return <>{children}</>;
};

export default UserProtectWrapper;
