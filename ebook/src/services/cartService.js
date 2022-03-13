import config from 'config' 
import {postRequest, postRequest_v2} from '../util/ajax'

export const getCart = (id, callback) => {
    const data = {id:id};
    console.log(data);
    const url = `${config.apiUrl}/getCart`;
    postRequest_v2(url, data, callback);
}

export const addCart = (data, callback) => {
    const url = `${config.apiUrl}/addCart`;
    console.log(data);
    postRequest(url, data, callback);
}

export const deleteCart = (data, callback) => {
    const url = `${config.apiUrl}/deleteCart`;
    console.log(data);
    postRequest(url, data, callback);
}