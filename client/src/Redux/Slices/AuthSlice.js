import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from '../../Helpers/axiosInstance';

const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    role: localStorage.getItem("role") || "",
    data: localStorage.getItem("data") || {}
}

// .....signup.........
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
    const loadingMessage = toast.loading("Please wait! creating your account");
    try {
        const res = await axiosInstance.post("/user/register",
            data,
            { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success(res?.data?.message, { id: loadingMessage });
        return res?.data
    } catch (error) {
        toast.error(error?.response?.data?.message, { id: loadingMessage });
        throw error;
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {}
})

export const { } = authSlice.actions;
export default authSlice.reducer;