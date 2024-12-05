import { createContext, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

import * as UserService from '~/services/UserService';
import { updateUser } from '~/redux/slices/UserSlice';

const userContext = createContext();

export const UserProvider = ({ children }) => {
    const token = localStorage.getItem('access_token');

    const dispatch = useDispatch();

    useEffect(() => {
        const loadUser = async () => {
            try {
                if (token) {
                    const decoded = jwtDecode(token);
                    const res = await UserService.getDetailsUser(
                        decoded.id,
                        token
                    );
                    if (res && res.data) {
                        dispatch(
                            updateUser({ ...res.data, access_token: token })
                        );
                    } else {
                        console.error('Không tìm thấy dữ liệu người dùng');
                    }
                }
            } catch (error) {
                console.error('Lỗi khi lấy chi tiết người dùng:', error);
            }
        };
        loadUser();
    }, [token, dispatch]);
    return (
        <userContext.Provider value={{ user: '' }}>
            {children}
        </userContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useUser = () => {
    return useContext(userContext);
};
