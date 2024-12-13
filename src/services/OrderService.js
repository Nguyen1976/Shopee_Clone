// import axios from 'axios';

import { axiosJWT } from './axiosJWT';

export const createOrder = async (data) => {
    const res = await axiosJWT.post(`/order/create/${data.user}`, data);
    return res.data;
};

export const getAllOrderDetails = async (userId) => {
    const res = await axiosJWT.get(`/order/get-all-order/${userId}`);
    return res.data;
};

export const cancelOrder = async (userId, orderItems, orderId) => {
    const res = await axiosJWT.put(`/order/cancel-order/${userId}`, {
        orderItems,
        orderId,
    });
    return res.data;
};

//admin
export const getAllOrder = async () => {
    const res = await axiosJWT.get(`/order/get-all-order`);
    return res.data;
};
