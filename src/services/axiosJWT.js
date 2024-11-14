import axios from "axios";

export const axiosJWT = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Địa chỉ API của bạn
    headers: {
        'Content-Type': 'application/json',
    },
});

// // Thêm interceptor cho request để thêm access token vào header
axiosJWT.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('access_token'); // Lấy access token từ localStorage

        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);