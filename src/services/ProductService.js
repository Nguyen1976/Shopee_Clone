import axios from 'axios';
import axiosJWT from './axiosJWT';

export const getProductsSearch = async (search = '', limit = 10) => {
    try {
        const baseUrl = `${process.env.REACT_APP_API_URL}/product/get-all`;
        const params = new URLSearchParams();

        if (search?.trim()) {
            params.append('filter', `name:${search}`);
        }
        params.append('limit', limit);

        const response = await axios.get(`${baseUrl}?${params.toString()}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error; // Ném lỗi để xử lý phía gọi hàm
    }
};

export const getDetailProduct = async (id) => {
    const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/product/get-details/${id}`
    );
    return res.data;
};

export const getProductNavigate = async (page, limit) => {
    const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/product/get-all?page=${page}&limit=${limit}`
    );
    return res.data;
};

export const getAllProduct = async () => {
    const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/product/get-all`
    );
    return res.data;
};

export const createProduct = async (data) => {
    const res = await axiosJWT.post(`/product/create`, data);
    return res.data;
};

export const deleteProduct = async (ids) => {
    const res = await axiosJWT.delete(`/product/delete-many`, {
        params: { ids: ids.join(',') },
    });
    return res.data;
};
