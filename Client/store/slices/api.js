import {getJWT} from "./JWT";
import axios from "axios";
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
                return getRequest(path, headers);
            }
            return {error: err.response.data}
        });
}