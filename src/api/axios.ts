import axios from "axios";

// const BASE_URL = "http://localhost:3000/api";

const BASE_URL_PRODUCTION =
    "https://app-crafter-backend-production.up.railway.app/api";

const api = axios.create({
    baseURL: BASE_URL_PRODUCTION,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
