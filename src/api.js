import axios from 'axios';

//criando uma configuração do axios 
const api = axios.create({
    baseURL: 'https://api.github.com',
});

export default api;