import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginSlice = (data, errorBox) => {
    return axios({
        method: 'post',
        url: 'api' + '/login_check',
        data: data
    })
        .then(res => {
            localStorage.setItem("token", res.data.token);
            window.location.reload()
            return {data: res.data}
        })
        .catch(err => {
            if (err.response.data.code===401) {
                errorBox.innerText = "Неверный логин или пароль"
            }
            return {error: err.response.data}
        });
}