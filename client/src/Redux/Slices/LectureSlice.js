import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { axiosInstance } from '../../Helpers/axiosInstance';
import toast from 'react-hot-toast';

const initialState = {
    lectures: [],
}

// .....get lectures for a specific course....
export const getCourseLectures = createAsyncThunk("/courses/lecture/get", async (id) => {
    const loadingId = toast.loading("Fetching Lectures...");
    try {
        const res = await axiosInstance.get(`/courses/${id}`);
        toast.success("Lectures Fetching Successfully", { id: loadingId })
        return res?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message, { id: loadingId })
        throw error
    }
})

// .....add course lecture for a specific course....
export const addCourseLecture = createAsyncThunk("/courses/lecture/add", async (data) => {
    const loadingId = toast.loading("Adding Lecture...");
    try {
        const res = await axiosInstance.post(`/courses/${data.id}`, data.formData);
        toast.success("Lecture Added Successfully", { id: loadingId })
        return res?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message, { id: loadingId })
        throw error
    }
})

// .....delete course lecture for a specific course....
export const deleteCourseLecture = createAsyncThunk("/courses/lecture/delete", async (data) => {
    const loadingId = toast.loading("Deleting Lecture...");
    console.log(data);
    try {
        const res = await axiosInstance.delete(`/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`);
        toast.success("Lecture Deleted Successfully", { id: loadingId })
        return res?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message, { id: loadingId })
        throw error
    }
})

const lectureSlice = createSlice({
    name: 'lecture',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // for get Course Lectures
        builder.addCase(getCourseLectures.fulfilled, (state, action) => {
            state.lectures = action?.payload?.course?.lectures
        })

        // for add Course Lectures
        builder.addCase(addCourseLecture.fulfilled, (state, action) => {
            state.lectures = action?.payload?.course?.lectures
        })
    }
})

export default lectureSlice.reducer