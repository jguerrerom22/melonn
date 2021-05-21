import axios from 'axios';

const ordersAPI = axios.create({
    baseURL: 'http://localhost:8100'
});

export default ordersAPI;