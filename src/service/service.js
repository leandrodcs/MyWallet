import axios from "axios";

const BASIC_URL = `http://localhost:4000`;

function createConfig(userToken) {
    const config = {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    }
    return config;
}

function registerUser(name, email, password) {
    const body = {
        name,
        email,
        password
    };
    return axios.post(`${BASIC_URL}/sign-up`, body);
}

function postLoginInfo(email, password) {
    const body = {
        email,
        password
    };
    return axios.post(`${BASIC_URL}/sign-in`, body);
}

function getTransactions(token) {
    return axios.get(`${BASIC_URL}/transactions`, createConfig(token));
}

export {
    registerUser,
    postLoginInfo,
    getTransactions,
}