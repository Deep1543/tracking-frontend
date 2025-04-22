// src/api.js
import axios from "axios";


const api = axios.create({
    baseURL: 'http://localhost:5000', // Use the centralized base URL
    headers: {
        'Content-Type': 'application/json',
        },
});

export default api;
