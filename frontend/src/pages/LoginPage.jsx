import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ShipWheelIcon } from 'lucide-react'
import React, { useState } from 'react'
import Banner from '../../public/singupPageBanner.png'
import { login } from '../lib/api'
import { Link } from 'react-router'
import toast from 'react-hot-toast'

const LoginPage = () => {
  const [loginData,setLoginData] = useState({
    email:"",
    password:""
  })
  const queryClient = useQueryClient();

  const {mutate: loginMutation,error,isPending} = useMutation({
      mutationFn:login,
      onSuccess:() => queryClient.invalidateQueries({queryKey:["authUser"]}),
      onError: (error) => {
        toast.error(error.response.data.message)
      }
    })

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData)
  }
  
  return (
    <div data-theme='dark' className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8'>
      <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>
        {/* Signup page left pannel */}
        <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
          {/* LOGO */}
          <div className='mb-4 flex items-center justify-start gap-2'>
            <ShipWheelIcon className="size-9 text-primary"/>
            <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>ConvoMate</span>
          </div>
          <div className='w-full'>
            <form onSubmit={handleLogin}>
              <div className='space-y-4'>
                <div>
                  <h2 className='text-xl font-semibold'>Welcome Back</h2>
                  <p className='text-sm opacity-70'>Sign in to your account to continue your language journey</p>
                </div>
              </div>
              <div className='space-y-3'>

                {/* EMAIL */}
                <div className='form-control w-full'>
                  <label className='label'>
                    <span className='label-text'>Email</span>
                  </label>
                  <input 
                    type='email'
                    className='input input-bordered w-full'
                    placeholder='john@gmail.com'
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData,email:e.target.value})}
                    required
                  />
                </div>

                {/* Password */}
                <div className='form-control w-full'>
                  <label className='label'>
                    <span className='label-text'>Password</span>
                  </label>
                  <input 
                    type='password'
                    className='input input-bordered w-full'
                    placeholder='******'
                    value={loginData.password}
                    onChange={(e) =>  setLoginData({...loginData,password:e.target.value})}
                    required
                  />
                </div>

                

                <button type='submit' className='btn btn-primary w-full'>
                  {isPending ? (
                    <>
                      <span className='loading loading-spinner loading-xs'></span>
                      Loading...
                    </>
                  ):("Login")}
                </button>

                <div>
                  <p className='text-sm'>
                    Don't have an account?{" "}
                    <Link to={'/signup'} className='text-primary hover:underline '>Sign Up</Link>
                  </p>
                </div>
                
              </div>
            </form>
          </div>
        </div>

        {/* Signup page right pannel */}
        <div className='hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center'>
          <div className='max-w-md p-8'>
            <div className='relative aspect-square max-w-sm mx-auto'>
              <img src={Banner} alt='Language connection illustrations' className='w-full h-full'/>
            </div>
            <div className='text-center space-y-3 mt-6'>
              <h2 className='text-xl font-semibold'>Connect with language partners worldwide</h2>
              <p className='opacity-78'>
                Practice conversations, make friends and improve your language skills together
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default LoginPage