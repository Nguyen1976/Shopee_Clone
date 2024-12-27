import axios from 'axios';
// import config from '~/configs';
import { refreshToken } from '~/services/UserService';

export const axiosJWT = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Địa chỉ API
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Biến lưu trạng thái làm mới token
axiosJWT.interceptors.request.use(
    (config) => {
        // Lấy access_token từ localStorage
        const accessToken = localStorage.getItem('access_token');

        if (accessToken) {
            // Thêm access_token vào header Authorization
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosJWT.interceptors.response.use(
    (response) => {
        // Nếu yêu cầu thành công, trả về phản hồi như bình thường
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Kiểm tra lỗi 403 (Access Token hết hạn)
        if (
            error.response &&
            error.response.status === 403 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                const data = await refreshToken();
                localStorage.setItem('access_token', data.access_token);

                // Cập nhật lại header với access token mới
                originalRequest.headers['Authorization'] =
                    `Bearer ${data.access_token}`;

                return axios(originalRequest);
            } catch (err) {
                console.error('Error refreshing token:', err);
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosJWT;
