import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isValidEmail, isValidPhoneNumber } from '~/utils/validate';
import * as UserService from '~/services/UserService';
import { updateUser } from '~/redux/slices/UserSlice';
import Loading from '~/components/Loading';
import ToastMessage from '~/components/ToastMessage/ToastMessage';
import useToast from '~/hooks/useToast';

function ProfilePage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const userInfo = useSelector((state) => state.user);

    const { toast, showToast, setToast } = useToast(3000)

    const dispatch = useDispatch();

    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
        setPhone(userInfo.phone);
        setAddress(userInfo?.address);
    }, [userInfo]);

    const validation = () => {
        return isValidPhoneNumber(phone) || isValidEmail(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (validation()) {
                setIsLoading(true);
                const res = await UserService.updateUser(userInfo.id, {
                    email,
                    phone,
                    address,
                });
                dispatch(updateUser({ ...res.data }));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
            showToast('Cập nhật thông tin người dùng thành công');
        }
    };

    return (
        <Loading isLoading={isLoading}>
            {toast && (
                <ToastMessage
                    message={toast}
                    onClose={() => setToast('')}
                />
            )}
            <div className="pb-4 border-b-2 border-[#f5f5f5]">
                <div className="text-lg">Hồ Sơ Của Tôi</div>
                <div className="text-sm">
                    Quản lý thông tin hồ sơ để bảo vệ tài khoản
                </div>
            </div>
            <div className="px-20 mt-5 flex">
                <div className="w-2/3">
                    <form action="">
                        <div className="flex items-center">
                            <div className="text-[#555555cc] pb-8">
                                Tên đăng nhập
                            </div>
                            <div className="pl-5 text-[#333] pb-8">{name}</div>
                        </div>
                        <div className="flex items-center">
                            <div className="text-[#555555cc] pb-8 w-1/5">
                                Email
                            </div>
                            <div className="pl-5 text-[#333] pb-8 flex-1">
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border-[#f3f3f3] border-2 p-1"
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                />
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="text-[#555555cc] pb-8 w-1/5">
                                Số điện thoại
                            </div>
                            <div className="pl-5 text-[#333] pb-8 flex-1">
                                <input
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full border-[#f3f3f3] border-2 p-1"
                                    type="text"
                                    placeholder="Số điện thoại"
                                    value={phone}
                                />
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="text-[#555555cc] pb-8 w-1/5">
                                Địa chỉ
                            </div>
                            <div className="pl-5 text-[#333] pb-8 flex-1">
                                <input
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full border-[#f3f3f3] border-2 p-1"
                                    type="text"
                                    placeholder="Địa chỉ"
                                    value={address}
                                />
                            </div>
                        </div>
                    </form>
                    <div className="text-center">
                        <button
                            className="bg-primary text-white px-5 py-2"
                            onClick={handleSubmit}
                        >
                            Lưu
                        </button>
                    </div>
                </div>
                <div className="w-1/3"></div>
            </div>
        </Loading>
    );
}

export default ProfilePage;
