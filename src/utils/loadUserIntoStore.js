import { updateUser } from '~/redux/slices/UserSlice';
import * as UserService from '~/services/UserService';

const loadUserIntoStore = async (dispatch, id, token) => {
    try {
        const res = await UserService.getDetailsUser(id, token);
        if (res && res.data) {
            dispatch(updateUser({ ...res.data, access_token: token }));
        } else {
            console.error('Không tìm thấy dữ liệu người dùng');
        }
    } catch (error) {
        console.error('Lỗi khi lấy chi tiết người dùng:', error);
    }
};

export default loadUserIntoStore;
