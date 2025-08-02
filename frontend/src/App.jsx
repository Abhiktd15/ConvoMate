import React from 'react'
import {Route,Routes} from "react-router"
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import NotificationsPage from './pages/NotificationsPage'
import CallPage from './pages/CallPage'
import OnboardingPage from './pages/OnboardingPage'
import ChatPage from './pages/ChatPage'
import {toast, Toaster} from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from './lib/axios'


const App = () => {
  const {data,isLoading,error} = useQuery({ queryKey: ['todos'], 
    queryFn: async () => {
      const res = await axiosInstance.get('/api/auth/me')
      return res.data;
    }
  })
  
  return (
    <div className='h-screen'>

      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/notifications' element={<NotificationsPage/>}/>
        <Route path='/call' element={<CallPage/>}/>
        <Route path='/chat' element={<ChatPage/>}/>
        <Route path='/onboarding' element={<OnboardingPage/>}/>
      </Routes>
      
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
    </div>
  )
}

export default App