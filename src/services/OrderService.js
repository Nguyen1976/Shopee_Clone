import axios from 'axios';

export const createOrder = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/order/create/${data.user}`,
        data
    );
    return res.data;
};
