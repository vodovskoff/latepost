import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getRequest} from "./api";

const initialState = {
    info: {
        data: {},
        isLoading: false,
        error: null
    }
};

export const getAllPostsInfo = createAsyncThunk(
    '/allPostsInfo/getAllPostsInfo',
    async () => getRequest('/user/posts')
);


export const allPostsInfoSlice = createSlice({
    name: 'allPostsInfo',
    initialState,
    reducers: {},
    extraReducers: {
        [getAllPostsInfo.pending]: (state) => {
            state.info = {
                data: {},
                isLoading: true,
                error: null
            }
        },
        [getAllPostsInfo.fulfilled]: (state, action) => {
            state.info = {...state.info, ...action.payload, isLoading: false}
        },
        [getAllPostsInfo.rejected]: (state, action) => {
            state.info = {
                data: {},
                isLoading: false,
                error: action.error.message
            }
        }
    }
});

export default allPostsInfoSlice.reducer;