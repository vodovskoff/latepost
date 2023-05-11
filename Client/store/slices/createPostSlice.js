import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {getJWT} from "./JWT";
export const createPostSlice = (data, errorBox) => {
    return axios({
        method: 'post',
        url: 'api' + '/post/',
        headers: {
            Authorization: "Bearer " + getJWT()
        },
        data: data
    })
        .then(res => {
            return {data: res.data}
        })
        .catch(err => {
            if (err.response.data.code===409) {
                errorBox.innerText = "Пост с таким ID уже существует"
            }
            return {error: err.response.data}
        });
}