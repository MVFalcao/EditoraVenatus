import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:44316',
});

export default api;