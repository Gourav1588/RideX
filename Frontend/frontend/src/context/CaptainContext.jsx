import React, { createContext, useState, useEffect } from 'react';

// Create context
export const captainData = createContext();

export default function CaptainContext({ children }) {
  // 1. Initialize from localStorage if it exists
  const [captain, setCaptain] = useState(() => {
    try {
      const saved = localStorage.getItem('captain');
      return saved
        ? JSON.parse(saved)
        : {
            email: '',
            fullname: {
              firstname: '',
              lastname: '',
            },
            vehicle: {
              color: '',
              plate: '',
              capecity: '',
              vehicleType: '',
            },
          };
    } catch (err) {
      console.error('Failed to load captain from localStorage:', err);
      return {
        email: '',
        fullname: {
          firstname: '',
          lastname: '',
        },
        vehicle: {
          color: '',
          plate: '',
          capecity: '',
          vehicleType: '',
        },
      };
    }
  });

  // 2. Persist to localStorage whenever captain changes
  useEffect(() => {
    try {
      localStorage.setItem('captain', JSON.stringify(captain));
    } catch (err) {
      console.error('Failed to save captain to localStorage:', err);
    }
  }, [captain]);

  return (
    <captainData.Provider value={{ captain, setCaptain }}>
      {children}
    </captainData.Provider>
  );
}
