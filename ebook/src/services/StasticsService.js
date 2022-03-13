import config from 'config' 
import {postRequest, postRequest_v2} from '../util/ajax'

export const userStastics = (id, callback) => {
    const url = `${config.apiUrl}/userStastics`;
    const data = {id:id};
    console.log(data);
    postRequest_v2(url, data, callback);
}

export const getHotBook = (data, callback) => {
    const url = `${config.apiUrl}/getHotBook`;
    postRequest(url, data, callback);
}

export const getHotUser = (data, callback) => {
    const url = `${config.apiUrl}/getHotUser`;
    postRequest(url, data, callback);
}