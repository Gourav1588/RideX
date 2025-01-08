import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      console.log("No token found, redirecting...");
      navigate('/login');
    }
  }, [token]);

  // If there's no token, nothing will be rendered before navigation happens
  if (!token) {
    return null; // Or a loading spinner, etc.
  }

  return <div>{children}</div>;
};

export default UserProtectWrapper;
