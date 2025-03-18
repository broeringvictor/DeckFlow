import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5249',
    headers: {
        "Content-Type": "application/json",
    },
});


axiosInstance.interceptors.response.use(
    response => response,
    error => {
        console.error("Erro na API:", error);
        return Promise.reject(error);
    }
);

export default axiosInstance;
