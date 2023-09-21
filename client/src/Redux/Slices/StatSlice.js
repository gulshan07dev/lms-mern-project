import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    allUsersCount: 0,
    subscribedCount: 0
};

// ......get stats data......
export const getStatsData = createAsyncThunk("stats/get", async () => {
    const loadingId = toast.loading("Getting the stats...")
    try {
        const response = await axiosInstance.get("/admin/stats/users");
        toast.success(response?.data?.message, { id: loadingId });
        return response?.data;
    } catch (error) {
        toast.error("Failed to get stats", { id: loadingId });
        throw error
    }
})

const statSlice = createSlice({
    name: "state",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getStatsData.fulfilled, (state, action) => {
            state.allUsersCount = action?.payload?.allUsersCount;
            state.subscribedCount = action?.payload?.subscribedUsersCount;
        })
    }
});

export default statSlice.reducer;