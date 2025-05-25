import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import Context from './context/Context.jsx';
import CaptainContext from './context/CaptainContext.jsx';
import  SocketProvider  from './context/SocketContext.jsx';
createRoot(document.getElementById('root')).render(
  
  <CaptainContext>
    <Context>
      <SocketProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SocketProvider>
    </Context>
  </CaptainContext>
);
