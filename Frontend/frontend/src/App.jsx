import React, { useContext } from 'react'
import {Routes,Route} from 'react-router-dom'
import  Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import UserLogout from './pages/UserLogout'
import { userDataContext } from './context/Context'
import Home from './pages/Home'
import CaptainHome from './pages/CaptainHome'
import UserProtectWrapper from './pages/UserProtectWrapper'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
const App = () => {
  const ans=useContext(userDataContext)
  console.log(ans)
  return (
    <div className=''> 
<Routes>
  <Route   path='/' element={<Start/>}/>
  <Route   path='/login' element={<UserLogin/>}/>
  <Route path='/signup' element={<UserSignup/>}/>
  <Route   path='/captain-login' element={<CaptainLogin/>}/>
  <Route   path='/captain-signup' element={<CaptainSignup/>}/>
  
  <Route path="/captain-Home" element={<CaptainProtectWrapper>
    <CaptainHome/>
  </CaptainProtectWrapper>} />

  
  <Route path='/Home' element={<UserProtectWrapper>
    <Home/>
  </UserProtectWrapper>}/>
  <Route path='logout' element={<UserProtectWrapper>
    <UserLogout></UserLogout>
    
  </UserProtectWrapper>}/>
  
</Routes>
    </div>
  )
}

export default App
