import axiosJWT from './axiosJWT';

export const getConfig = async () => {
    const res = await axiosJWT.get(`/payment/config`);
    return res.data;
};
