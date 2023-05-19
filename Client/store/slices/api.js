import {getJWT} from "./JWT";
import axios from "axios";
import Cookies from "js-cookie";
export function getRequest(path, headers = {}) {
    const token = getJWT();
    return axios({
        method: 'GET',
        url: '/api' + path,
        headers: {
            Authorization: `Bearer ${token}`,
            ...headers
        }
    })
        .then(res => {
            return {data: res.data}
        })
        .catch(err => {
            if (err.response.data.code === 401) {
                refreshingToken();
                return getRequest(path, headers);
            }
            return {error: err.response.data}
        });
}

export function refreshingToken() {

    const refreshToken = Cookies.get('refresh_token');

    return axios({
        method: 'POST',
        url: '/api/token/refresh',
        data: {'refresh_token': refreshToken},
    })
        .then(res => {
            Cookies.set('JWT', res.data.token)
            Cookies.set('refresh_token', res.data.refresh_token)
            return {data: res.data.code}
        })
        .catch(err => {
            if (err.response.data.code === 401) {
                Cookies.remove('JWT');
                Cookies.remove('refresh_token');
                document.location.reload();
            }
            return {error: err.response.data}
        });
}