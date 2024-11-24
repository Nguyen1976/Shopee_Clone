import axios from 'axios';
import { axiosJWT } from './axiosJWT';

// Lấy danh sách các tỉnh
export const getProvinces = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_ADDRESS}/p/`);

    return response.data;
};

// Lấy danh sách các huyện của một tỉnh
export const getDistricts = async (provinceCode) => {
    const response = await axios.get(
        `${process.env.REACT_APP_API_ADDRESS}/p/${provinceCode}?depth=2`
    );
    return response.data.districts;
};

// Lấy danh sách các xã/phường của một huyện
export const getWards = async (districtCode) => {
    const response = await axios.get(
        `${process.env.REACT_APP_API_ADDRESS}/d/${districtCode}?depth=2`
    );

    return response.data.wards;
};

export const createAddress = async (userId, newAddress) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/address/create-address`,
        {
            userId,
            addressData: {
                ...newAddress,
            },
        }
    );
    return res.data;
};

export const updateAddress = async (addressId, newAddress) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/address/update-address/${addressId}`,
        newAddress
    );
    return res.data;
};

export const getAddress = async (userId) => {
    const res = await axiosJWT.get(
        `${process.env.REACT_APP_API_URL}/address/${userId}`
    );
    return res.data;
};

export const getAddressDefault = async (userId) => {
    const res = await axiosJWT.get(
        `${process.env.REACT_APP_API_URL}/address/get-address-default/${userId}`
    );
    return res.data;
};
