import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getRequest} from "./api";

const initialState = {
    info: {
        data: {},
        isLoading: false,
        error: null
    }
};

export const getPostByIdInfo = createAsyncThunk(
    '/postByIdInfo/getPostByIdInfo',
    async (id) => getRequest(`/post/${id}`)
);


export const postByIdInfoSlice = createSlice({
    name: 'postByIdInfo',
    initialState,
    reducers: {},
    extraReducers: {
        [getPostByIdInfo.pending]: (state) => {
            state.info = {
                data: {},
                isLoading: true,
                error: null
            }
        },
        [getPostByIdInfo.fulfilled]: (state, action) => {
            state.info = {...state.info, ...action.payload, isLoading: false}
        },
        [getPostByIdInfo.rejected]: (state, action) => {
            state.info = {
                data: {},
                isLoading: false,
                error: action.error.message
            }
        }
    }
});

export default postByIdInfoSlice.reducer;