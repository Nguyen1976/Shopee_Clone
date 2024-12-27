import axios from 'axios';

import { axiosJWT } from './axiosJWT';

export const getDetailsUser = async (id) => {
    const res = await axiosJWT.get(`/user/get-details/${id}`);

    if (res.status === 200) {
        return res.data;
    } else {
        throw new Error('Unable to fetch user details');
    }
};

export const signUpUser = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/sign-up`,
        data
    );
    return res.data;
};

export const signInUser = async (data) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/user/sign-in`,
        data
    );
    return res.data;
};

export const signInGoogle = async (tokenId) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/auth/google`,
        {
            tokenId,
        }
    );
    return res.data;
};

export const updateUser = async (id, data) => {
    const res = await axiosJWT.put(`/user/update-user/${id}`, data);
    return res.data;
};

export const getAllUsers = async () => {
    const res = await axiosJWT.get(`/user/getAll`);
    return res.data;
};

export const deleteManyUsers = async (ids) => {
    const res = await axiosJWT.delete(`/user/delete-many`, {
        data: { ids }, // Gửi dữ liệu dưới dạng body
    });
    return res.data;
};

export const searchUsers = async (name) => {
    const res = await axiosJWT.get(`/user/search-users?name=${name}`);
    return res.data;
};

export const refreshToken = async () => {
    try {
        const { data } = await axiosJWT.post(
            `${process.env.REACT_APP_API_URL}/user/refresh-token`
        );
        return data; // Trả về dữ liệu từ API.
    } catch (error) {
        console.error('Error refreshing token:', error.message);
        throw new Error('Failed to refresh token. Please try again.'); // Thông báo lỗi cụ thể.
    }
};
