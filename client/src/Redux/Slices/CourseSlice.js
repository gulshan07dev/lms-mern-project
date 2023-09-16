import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../Helpers/axiosInstance';

const initialState = {
    coursesData: []
}

// ....get all courses....
export const getAllCourses = createAsyncThunk("/courses/get", async () => {
    const loadingMessage = toast.loading("fetching courses...");
    try {
        const res = await axiosInstance.get("/courses");
        toast.success(res?.data?.message, { id: loadingMessage });
        return res?.data
    } catch (error) {
        toast.error(error?.response?.data?.message, { id: loadingMessage });
        throw error;
    }
})

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // for get all courses
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            state.coursesData = action?.payload?.courses;
        })
    }
})

export default courseSlice.reducer;