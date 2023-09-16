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
    const loadingMessage = toast.loading("Please wait! creating your account...");
    try {
        const res = await axiosInstance.post("/user/register", data);
        toast.success(res?.data?.message, { id: loadingMessage });
        return res?.data
    } catch (error) {
        toast.error(error?.response?.data?.message, { id: loadingMessage });
        throw error;
    }
})

// .....Login.........
export const login = createAsyncThunk("/auth/login", async (data) => {
    const loadingMessage = toast.loading("Please wait! logging into your account...");
    try {
        const res = await axiosInstance.post("/user/login", data);
        toast.success(res?.data?.message, { id: loadingMessage });
        return res?.data
    } catch (error) {
        toast.error(error?.response?.data?.message, { id: loadingMessage });
        throw error;
    }
})

// .....Logout.........
export const logout = createAsyncThunk("/auth/logout", async () => {
    const loadingMessage = toast.loading("logout...");
    try {
        const res = await axiosInstance.get("/user/logout");
        toast.success(res?.data?.message, { id: loadingMessage });
        console.log(res);
        return res?.data
    } catch (error) {
        toast.error(error?.response?.data?.message, { id: loadingMessage });
        throw error;
    }
})


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // for signup
        builder.addCase(createAccount.fulfilled, (state, action) => {
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("role", action?.payload?.user?.role);
            localStorage.setItem("isLoggedIn", true);
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
            state.isLoggedIn = true;
        })

        // for login
        builder.addCase(login.fulfilled, (state, action) => {
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("role", action?.payload?.user?.role);
            localStorage.setItem("isLoggedIn", true);
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
            state.isLoggedIn = true;
        })

        // for logout
        builder.addCase(logout.fulfilled, (state, action) => {
            localStorage.removeItem("data");
            localStorage.removeItem("role");
            localStorage.removeItem("isLoggedIn");
            state.data = {};
            state.role = "";
            state.isLoggedIn = false;
        })
    }
})

export const { } = authSlice.actions;
export default authSlice.reducer;