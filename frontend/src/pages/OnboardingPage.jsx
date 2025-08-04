import React, { useState } from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {CameraIcon, MapPinIcon, ShipWheelIcon, ShuffleIcon} from 'lucide-react'
import { completeOnboarding } from '../lib/api'
import { LANGUAGES } from '../constants/constant'
import toast, { LoaderIcon } from 'react-hot-toast'

const OnboardingPage = () => {
  const {authUser} = useAuthUser()
  const queryClient = useQueryClient()
  const [isGenerating,setIsGenerating] = useState(false);

  const [formState,setFormState]  = useState({
    fullName: authUser?.fullName ||"",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || ""
  })
  const {mutate:onboardMutation,isPending,error} = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () =>{
      queryClient.invalidateQueries({queryKey:['authUser']})
    },
    onError:(error) => {
      toast.error(error.response.data.message)
    }
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    onboardMutation(formState)
  }
  const handleRandomAvatar = async () => {
    // https://avatar.iran.liara.run/public/${idx}.png
    try {
      setIsGenerating(true)
      const idx = Math.floor(Math.random() * 100) + 1;
      const randomAvatarUrl = `https://avatar.iran.liara.run/public/${idx}.png`;
      
      // Add a small delay to simulate generation process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFormState(prev => ({
        ...prev,
        profilePic: randomAvatarUrl
      }));
    } catch (error) {
      console.log(error)
    } finally {
      toast.success("Random profile picture generated!")
      setIsGenerating(false)
    }
  }
  
  return (
    <div className='min-h-screen bg-base-100 flex items-center justify-center p-4'>
      <div className='card bg-base-200 w-full max-w-3xl shadow-xl'>
        <div className='card-body p-6 sm:p-8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6'>
            Complete Your Profile
          </h1>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Profile Pic Container */}
            <div className='flex flex-col items-center justify-center space-y-4'>
              {/* Image Preview */}
              <div className='size-32 rounded-full bg-base-300 overflow-hidden'>
                {formState.profilePic ? (
                  <img
                    src={formState.profilePic}
                    alt='Profile Preview'
                    className='w-full h-full object-cover'
                  />
                ):(
                  <div className='flex items-center justify-center h-full'>
                    <CameraIcon className='size-12 text-base-content opacity-40'/>
                  </div>
                )}
              </div>

              {/* Generate Random Avatar button */}
              <div className='flex items-center gap-2'>
                <button 
                  type='button' 
                  onClick={handleRandomAvatar} 
                  disabled={isGenerating}
                  className='btn btn-accent'
                >
                  <ShuffleIcon className={`size-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`}/>
                  {isGenerating ? "Generating..." : "Generate Random Avatar"}
                </button>
              </div>
            </div>
            {/* FULL NAME */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Full Name</span>
              </label>
              <input 
                type='text'
                name='fullName'
                value={formState.fullName}
                onChange={(e) => setFormState({...formState,fullName:e.target.value})}
                className='input input-bordered w-full'
                placeholder='Your Full Name'
              />
            </div>

            {/* BIO */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Bio</span>
              </label>
              <textarea 
                type='text'
                name='bio'
                value={formState.bio}
                onChange={(e) => setFormState({...formState,bio:e.target.value})}
                className='textarea textarea-bordered h-24'
                placeholder='Tell others about yourself and your language learning goals'
              />
            </div>

            {/* LANGUAGES */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {/* Native Languages */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text' >Native Language</span>
                </label>
                <select
                  name='nativeLanguage'
                  value={formState.nativeLanguage}
                  onChange={(e) => setFormState({...formState,nativeLanguage:e.target.value})}
                  className='select select-bordered  w-full'
                >
                  <option value="">Select your native language</option>
                  {LANGUAGES.map((lang) => (
                    <option  key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* Learning Languages */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text' >Learning Language</span>
                </label>
                <select
                  name='learningLanguage'
                  value={formState.learningLanguage}
                  onChange={(e) => setFormState({...formState,learningLanguage:e.target.value})}
                  className='select select-bordered  w-full'
                >
                  <option value="">Select your native language</option>
                  {LANGUAGES.map((lang) => (
                    <option  key={`learning-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* LOCATION */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>location</span>
              </label>
              <div className='relative'>
                <MapPinIcon className='absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70'/>
                <input 
                  type='text'
                  name='location'
                  value={formState.location}
                  onChange={(e) => setFormState({...formState,location:e.target.value})}
                  className='input input-bordered w-full pl-10'
                  placeholder='City, Country'
                />
              </div>
            </div>
            
            {/* SUBMIT BUTTON */}
            <button className='btn btn-primary w-full' disabled={isPending} type='submit'>
              {!isPending ? (
                <>
                <ShipWheelIcon className='size-5 mr-2'/>
                Complete Onboarding
                </>
              ):(
                <>
                <LoaderIcon className='animate-spin size-5 mr-2'/>
                Onboarding...
                </>
              )}
            </button>
          </form>
        </div>
      </div>
      
    </div>
  )
}

export default OnboardingPage