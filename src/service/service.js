import axios from "axios";

const BASIC_URL = `http://localhost:4000`;

function createConfig(token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
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

function signOut(token) {
    return axios.delete(`${BASIC_URL}/sign-out`, createConfig(token));
}

function getTransactions(token) {
    return axios.get(`${BASIC_URL}/transactions`, createConfig(token));
}

function postTransaction(token, description, value) {
    const body = {
        description,
        value
    }
    return axios.post(`${BASIC_URL}/transactions`, body, createConfig(token));
}

export {
    registerUser,
    postLoginInfo,
    getTransactions,
    postTransaction,
    signOut,
}