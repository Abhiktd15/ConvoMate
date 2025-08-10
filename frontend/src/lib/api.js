import toast from "react-hot-toast";
import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
    const response = await axiosInstance.post('/auth/signup',signupData);
    if(response.data.success){
        toast.success(response.data.message)
    }
    return response.data;
}
export const login = async (loginData) => {
    const response = await axiosInstance.post('/auth/login',loginData);
    if(response.data.success){
        toast.success(response.data.message)
    }
    return response.data;
}
export const getAuthUser =  async () => {
    const res = await axiosInstance.get('/auth/me')
    return res.data;
}

export const completeOnboarding =  async (onboardingData) => {
    const res = await axiosInstance.post('/auth/onboarding',onboardingData)
    if(res.data.success){
        toast.success(res.data.message)
    }
    return res.data;
}