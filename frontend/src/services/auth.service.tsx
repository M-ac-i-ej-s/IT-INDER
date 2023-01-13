import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:3001/auth/';

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

export const login = (email, password) => {
    return axios
        .post(API_URL + 'login', {
            email,
            password,
        })
        .then((response) => {
            return response.data;
        });
};

export const update = ( name,email, password, oldpassword) => {
    return axios
        .put(
            'http://localhost:3000/api/users/tokenVerified',
            {
                name,
                email,
                password,
                oldpassword,
            },
            {
                headers: authHeader(),
            }
        )
        .then((response) => {
            return response.data;
        });
};
