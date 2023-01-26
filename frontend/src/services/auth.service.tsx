import axios from 'axios';
const API_URL = 'https://localhost:3001/auth/';

export const register = (type, name, description,languages,email, password ) => {
    return axios
        .post(API_URL + 'register', {
            type,
            name,
            description,
            languages,
            email,
            password,
        })
        .then((response) => {
            return response.data;
        });
};

export const login = (email, password, params='') => {
    return axios
        .post(API_URL + 'login' + params, {
            email,
            password,
        })
        .then((response) => {
            return response.data;
        });
};

