import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.107:3000', //IVP4 PC
    timeout: 4000,
});

export default api;
