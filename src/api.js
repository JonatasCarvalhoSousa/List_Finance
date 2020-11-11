import axios from 'axios';

const api = axios.create({
    baseURL: 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=A,BRL'
});

export default api;