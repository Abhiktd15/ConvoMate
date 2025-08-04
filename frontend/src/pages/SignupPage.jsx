import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ShipWheelIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router'
import Banner from '../../public/singupPageBanner.png'
import { signup } from '../lib/api'
import toast from 'react-hot-toast'

const SignupPage = () => {
  const [signupData,setSignupData] = useState({
    fullName:"",
    email:"",
    password:""
  })
  const queryClient = useQueryClient()

  const {mutate:signupMutation,isPending,error} = useMutation({
    mutationFn: signup,
    onSuccess: () => queryClient.invalidateQueries({queryKey:['authUser']}),
    onError:(error) =>{
      toast.error(error.response.data.message)
    }
  })
  
  const handleSignUp = (e) => {
    e.preventDefault();
    signupMutation(signupData);
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
            <form onSubmit={handleSignUp}>
              <div className='space-y-4'>
                <div>
                  <h2 className='text-xl font-semibold'>Create an account</h2>
                  <p className='text-sm opacity-70'>Join ConvoMate and start your language learning adventure!</p>
                </div>
              </div>
              <div className='space-y-3'>
                {/* FULL NAME */}
                <div className='form-control w-full'>
                  <label className='label'>
                    <span className='label-text'>Full Name</span>
                  </label>
                  <input 
                    type='text'
                    className='input input-bordered w-full'
                    placeholder='John Doe'
                    value={signupData.fullName}
                    onChange={(e) => setSignupData({...signupData,fullName:e.target.value})}
                    required
                  />
                </div>

                {/* EMAIL */}
                <div className='form-control w-full'>
                  <label className='label'>
                    <span className='label-text'>Email</span>
                  </label>
                  <input 
                    type='email'
                    className='input input-bordered w-full'
                    placeholder='john@gmail.com'
                    value={signupData.email}
                    onChange={(e) => setSignupData({...signupData,email:e.target.value})}
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
                    value={signupData.password}
                    onChange={(e) => setSignupData({...signupData,password:e.target.value})}
                    required
                  />
                  <p className='text-xs opacity-70 mt-1'>Password must be at least 6 characters long</p>
                </div>

                <div className='form-control'>
                  <label className='label cursor-pointer justify-start gap-2'>
                    <input type='checkbox' className='checkbox checkbox-sm' required/>
                    <span className='text-xs leading-tight'>
                      I agree to the{" "}
                      <span className='text-primary hover:underline'>terms of service</span> and{" "}
                      <span className='text-primary hover:underline'>privacy policy</span> 
                    </span>
                  </label>
                </div>

                <button type='submit' className='btn btn-primary w-full'>
                  {isPending ? (
                    <>
                      <span className='loading loading-spinner loading-xs'></span>
                      Loading...
                    </>
                  ):("Create Account")}
                </button>

                <div>
                  <p className='text-sm'>
                    Already have an account?{" "}
                    <Link to={'/login'} className='text-primary hover:underline '>Sign in</Link>
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

export default SignupPage