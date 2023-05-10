import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CONFIG from "../config";

const registration = (data) => {
    return axios({
        method: 'POST',
        url: 'api' + '/registration',
        data: data
    })
        .then(res => {
            return {data: res.data}
        })
        .catch(err => {
            return {error: err.response.data}
        });
}