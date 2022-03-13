import { configConsumerProps } from 'antd/lib/config-provider';
import config from 'config' 
import {postRequest, postRequest_v2} from '../util/ajax'

export const getBooks = (data, callback) => {
    const url = `${config.apiUrl}/getBooks`;
    console.log(data);
    postRequest(url, data, callback);
}

export const getBook = (id, callback) => {
    const data = {id: id};
    const url= `${config.apiUrl}/getBook`;
    postRequest_v2(url, data, callback);
}

export const addBook = (data, callback) => {
    const url = `${config.apiUrl}/addBook`;
    console.log(data);
    postRequest(url, data, callback);
}

export const deleteBook = (id, callback) => {
    const url = `${config.apiUrl}/deleteBook`
    console.log(id);
    const data = {id:id};
    postRequest_v2(url, data, callback);
}

export const updateBook = (data, callback) => {
    const url = `${config.apiUrl}/updateBook`;
    console.log(data);
    postRequest(url, data, callback);
}