import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registrationSlice = (data, errorBox) => {
    return axios({
        method: 'post',
        url: 'api' + '/registration',
        data: data
    })
        .then(res => {
            errorBox.innerText = "Вы успешно зарегистрировались"
            return {data: res.data}
        })
        .catch(err => {
            if (err.response.data.status===409) {
                errorBox.innerText = "Пользователь уже зарегистрирован"
            }
            return {error: err.response.data}
        });
}