import React, { createContext, useState } from 'react';
export const captainData = createContext();

export default function CaptainContext({ children }) {
  const [captain, setCaptain] = useState({
    email: '',
    fullName: {
      firstname: '',
      lastname: '',
    },
    vehicle: {
      color: '',
      plate: '',
      capecity: '',
      vehicleType: '',
    },
  });

  return (
    <captainData.Provider value={{ captain, setCaptain }}>
      {children}
    </captainData.Provider>
  );
}
