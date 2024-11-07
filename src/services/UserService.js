import axios from 'axios';

export const axiosJWT = axios.create();

export const signUpUser = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/sign-up`,
        data
    );
    return res.data;
};

export const signInUser = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/sign-in`,
        data
    );
    return res.data;
};

export const updateUser = async (id, data) => {
    const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/user/update-user/${id}`,
        data
    );
    return res.data;
};

export const getDetailsUser = async (id, access_token) => {
    const res = await axiosJWT.get(
        `${process.env.REACT_APP_API_URL}/user/get-details/${id}`,
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const getAllUsers = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/getAll`);
    return res.data;
};

export const deleteManyUsers = async (ids) => {
    const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/user/delete-many`,
        {
            data: { ids } // Gửi dữ liệu dưới dạng body
        }
    );
    return res.data;
};

export const searchUsers = async (name) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/search-users?name=${name}`);
    return res.data;
}