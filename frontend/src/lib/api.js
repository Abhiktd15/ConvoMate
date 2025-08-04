import toast from "react-hot-toast";
import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
    const response = await axiosInstance.post('/auth/signup',signupData);
    if(response.data.success){
        toast.success(response.data.message)
    }
    return response.data;
}