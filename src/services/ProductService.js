import axios from 'axios';

export const getAllProducts = async (search, limit) => {
    let res = {};
    if (search?.length > 0) {
        res = await axios.get(
            `${process.env.REACT_APP_API_URL}/product/get-all?filter=name&filter=${search}&limit=${limit}`
        );
    } else {
        res = await axios.get(
            `${process.env.REACT_APP_API_URL}/product/get-all?&limit=${limit}`
        );
    }
    return res.data;
};

export const getDetailProduct = async (id) => {
    const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/product/get-details/${id}`
    );
    return res.data;
};


