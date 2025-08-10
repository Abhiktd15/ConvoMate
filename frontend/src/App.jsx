import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Navigate, Route, Routes } from "react-router"
import PageLoader from './components/PageLoader'
import useAuthUser from './hooks/useAuthUser'
import CallPage from './pages/CallPage'
import ChatPage from './pages/ChatPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NotificationsPage from './pages/NotificationsPage'
import OnboardingPage from './pages/OnboardingPage'
import SignupPage from './pages/SignupPage'
import Layout from './components/Layout'


const App = () => {
  const {isLoading,authUser} = useAuthUser()

  const isAuthenticated = Boolean(authUser)
  const isOnboarded = authUser?.isOnboarded;
  
  if(isLoading) return <PageLoader/>
  
  return (
    <div className='h-screen' data-theme="dark">

      <Routes>
        <Route path='/' element={isAuthenticated && isOnboarded ? <Layout showSidebar><HomePage/></Layout>:<Navigate to={!isAuthenticated ?'/login':'/onboarding'}/>}/>
        <Route path='/signup' element={!isAuthenticated ? <SignupPage/>:<Navigate to={isOnboarded ? "/" :"/onboarding"}/>}/>
        <Route path='/login' element={!isAuthenticated ? <LoginPage/>:<Navigate to={isOnboarded ? "/" :"/onboarding"}/>}/>
        <Route path='/notifications' element={isAuthenticated ? <NotificationsPage/>:<Navigate to={'/login'}/>}/>
        <Route path='/call' element={isAuthenticated ? <CallPage/>:<Navigate to={'/login'}/>}/>
        <Route path='/chat' element={isAuthenticated ? <Layout><ChatPage/></Layout>:<Navigate to={'/login'}/>}/>
        <Route path='/onboarding' element={isAuthenticated ? (
          !isOnboarded ? (
            <OnboardingPage/>
          ):(
            <Navigate to={'/'}/>
          )
        ) :(
          <Navigate to={'/login'}/>
        )}/>
      </Routes>
      
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
    </div>
  )
}

export default App