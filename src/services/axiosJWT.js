import axios from 'axios';
import config from '~/configs';
import { refreshToken } from '~/services/UserService';

export const axiosJWT = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Địa chỉ API
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Biến lưu trạng thái làm mới token
let isRefreshing = false;
let failedQueue = [];
let isTokenExpired = false; // Biến kiểm tra trạng thái token hết hạn

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (token) {
            prom.resolve(token);
        } else {
            prom.reject(error);
        }
    });
    failedQueue = [];
};

axiosJWT.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosJWT.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Kiểm tra nếu lỗi là 403 (có thể do refresh token hết hạn)
        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!isRefreshing && !isTokenExpired) {
                isRefreshing = true;
                isTokenExpired = true; // Đánh dấu rằng token đã hết hạn và chúng ta đang làm mới token

                try {
                    const refreshTokenStored =
                        localStorage.getItem('refresh_token');
                    const newTokenData = await refreshToken(refreshTokenStored);

                    // Cập nhật lại access token
                    localStorage.setItem(
                        'access_token',
                        newTokenData.access_token
                    );
                    processQueue(null, newTokenData.access_token);

                    isRefreshing = false;
                    isTokenExpired = false; // Reset lại trạng thái khi đã làm mới token

                    // Thực hiện lại yêu cầu gốc với token mới
                    return axiosJWT(originalRequest);
                } catch (err) {
                    processQueue(err, null);
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    isRefreshing = false;
                    isTokenExpired = false;

                    // Hiển thị modal khi refresh token hết hạn
                    showLoginExpiredModal();

                    return Promise.reject(err);
                }
            }

            // Nếu token đang được làm mới, chờ đợi và thử lại khi có token mới
            return new Promise((resolve, reject) => {
                failedQueue.push({
                    resolve: (token) => {
                        originalRequest.headers['Authorization'] =
                            `Bearer ${token}`;
                        resolve(axiosJWT(originalRequest));
                    },
                    reject: (err) => reject(err),
                });
            });
        }

        return Promise.reject(error);
    }
);

const showLoginExpiredModal = () => {
    const modal = document.createElement('div');
    modal.setAttribute('id', 'loginExpiredModal');
    modal.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: rgba(0, 0, 0, 0.5); z-index: 9999;">
            <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; width: 300px;">
                <h3>Phiên đăng nhập đã hết hạn</h3>
                <p>Phiên của bạn đã hết hạn. Bạn có thể chọn tiếp tục sử dụng hoặc đăng nhập lại.</p>
                <button id="stayBtn" style="margin: 10px; padding: 10px 20px;">Ở lại</button>
                <button id="loginBtn" style="margin: 10px; padding: 10px 20px; background-color: red; color: white;">Đăng nhập lại</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Xử lý sự kiện khi người dùng nhấn nút "Đăng nhập lại"
    document.getElementById('loginBtn').addEventListener('click', () => {
        // Chuyển hướng đến trang đăng nhập
        window.location.href = config.routes.signIn;
    });

    // Xử lý sự kiện khi người dùng nhấn nút "Ở lại"
    document.getElementById('stayBtn').addEventListener('click', () => {
        // Đóng modal
        document.body.removeChild(modal);
    });
};

export default axiosJWT;
