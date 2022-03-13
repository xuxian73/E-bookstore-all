import config from 'config' 
import {postRequest, postRequest_v2} from '../util/ajax'

export const getOrder = (id, callback) => {
    const data = {id: id};
    console.log(data);
    const url = `${config.apiUrl}/getOrder`;
    postRequest_v2(url, data, callback);
}

export const addOrder = (data, callback) => {
    const url = `${config.apiUrl}/addOrder`;
    console.log(data);
    postRequest(url, data, callback);
}

export const getOrderAdmin = (callback) => {
    const url = `${config.apiUrl}/getOrderAdmin`;
    postRequest(url, {}, callback);
}