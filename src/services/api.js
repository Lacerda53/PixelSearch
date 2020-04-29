import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.pexels.com/v1/',
    headers: {
        'Authorization': '563492ad6f91700001000001552f471d5bf64b2485fa6dfe5ba66373'
    }
});

export default api;