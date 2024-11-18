// import axios from 'axios';

import { axiosJWT } from './axiosJWT';

export const createOrder = async (data) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/order/create/${data.user}`,
        data
    );
    return res.data;
};
