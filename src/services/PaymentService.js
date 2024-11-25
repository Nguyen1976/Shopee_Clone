import axiosJWT from './axiosJWT';

export const getConfig = async () => {
    const res = await axiosJWT.get(
        `${process.env.REACT_APP_API_URL}/payment/config`
    );
    return res.data;
};
