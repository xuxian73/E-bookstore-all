import config from 'config';
import {postRequest, postRequest_v2} from "../util/ajax";
import {history} from '../util/history';
import {message} from 'antd';
import { configConsumerProps } from 'antd/lib/config-provider';
import userEvent from '@testing-library/user-event';



export const login = (data) => {
    const url = `${config.apiUrl}/login`;

    const callback = (data) => {
        if(data.status >= 0) {
            localStorage.setItem('user', JSON.stringify(data.data));
            if (data.data.userType == 0)
                history.push("/");
            if (data.data.userType == 1)
                history.push("/bookmanage");
            message.success(data.msg);
        }
        else{
            message.error(data.msg);
        }
    };
    postRequest(url, data, callback);
};

export const logout = () => {
    const url = `${config.apiUrl}/logout`;

    const callback = (data) => {
        if(data.status >= 0) {
            localStorage.removeItem("user");
            history.push("/login");
            message.success(data.msg);
            return;
        } else{
            message.error(data.msg);
        }
    };
    postRequest(url, {}, callback);
};

export const checkSession = (callback) => {
    const url = `${config.apiUrl}/checkSession`;
    postRequest(url, {}, callback);
};

export const register = (data) => {
    const url = `${config.apiUrl}/register`;
    const callback = (data) => {
        if(data.status >= 0) {
            localStorage.setItem('user', JSON.stringify(data.data));
            history.push("/login");
            message.success(data.msg);
        }
        else{
            message.error(data.msg);
        }
    };
    postRequest(url, data, callback);
}

export const getUser = (callback) => {
    const url = `${config.apiUrl}/getUser`;
    postRequest(url, {}, callback)
}

export const ChangeEnable = (data, callback) => {
    const url = `${config.apiUrl}/ChangeEnable`;
    postRequest_v2(url, data, callback);
}

export const tryRegister = (data, callback) => {
    const url = `${config.apiUrl}/tryRegister`;
    postRequest(url, data, callback);
}