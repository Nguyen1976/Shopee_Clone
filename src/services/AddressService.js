import axios from 'axios';

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
