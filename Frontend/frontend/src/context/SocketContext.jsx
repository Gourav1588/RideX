import io from 'socket.io-client';
import { createContext, useContext, useEffect, useState } from 'react';
export const SocketContext = createContext();
const socket = io('http://localhost:3000')

const SocketProvider = ({ children }) => {
    useEffect(() => {
        socket.on('connect', () => {
            console.log('connected to socket server');
        });
        socket.on('disconnect', () => {
            console.log('disconnected from socket server');
        });
      
        }
    , []);  
    
    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )   

}
export default SocketProvider;