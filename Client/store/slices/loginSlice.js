import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";

export const loginSlice = (data, errorBox) => {
    return axios({
        method: 'post',
        url: 'api' + '/login_check',
        data: data
    })
        .then(res => {
            Cookies.set('JWT', res.data.token, { expires: 7 })
            Cookies.set('refresh_token', res.data.refresh_token, { expires: 7 })
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