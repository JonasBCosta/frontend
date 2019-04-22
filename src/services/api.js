import axios from 'axios';

const api = axios.create({
    baseURL: 'https://omnistack-backend9.herokuapp.com'
});

export default api;