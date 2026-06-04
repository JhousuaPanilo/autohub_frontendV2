import axios from "axios";

const api = axios.create({
    baseURL: "https://auto-hub-d5jg.onrender.com",
});

export default api;