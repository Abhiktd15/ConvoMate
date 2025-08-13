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
export const logout = async () => {
    const response = await axiosInstance.post('/auth/logout');
    if(response.data.success){
        toast.success(response.data.message)
    }
    return response.data;
}
export const getAuthUser =  async () => {
    try {
        const res = await axiosInstance.get('/auth/me')
        return res.data;
    } catch (error) {
        console.log("Error in GetAuthUser",error)
        return null;
    }
}
export const getUserFriends =  async () => {
    const res = await axiosInstance.get('/users/friends')
    return res.data.friends;
}
export const getRecommendedUsers =  async () => {
    const res = await axiosInstance.get('/users/')
    return res.data.recommendedUsers;
}
export const getOutgoingFriendReqs =  async () => {
    const res = await axiosInstance.get('/users/outgoing-friend-request')
    return res.data.outGoingReqs;
}
export const sendFriendRequest =  async (userId) => {
    const res = await axiosInstance.post(`/users/friend-request/${userId}`)
    return res.data;
}
export const getFriendRequests =  async () => {
    const res = await axiosInstance.get(`/users/friend-request`)
    return res.data;
}
export const acceptFriendRequest =  async (requestId) => {
    const res = await axiosInstance.put(`/users/accept-request/${requestId}/accept`)
    return res.data;
}

export const completeOnboarding =  async (onboardingData) => {
    const res = await axiosInstance.post('/auth/onboarding',onboardingData)
    if(res.data.success){
        toast.success(res.data.message)
    }
    return res.data;
}

export const getStreamToken =  async () => {
    const res = await axiosInstance.get('/chat/token')
    return res.data;
}