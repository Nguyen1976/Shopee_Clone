import React, { useEffect, useRef, useState } from 'react';
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
    const [base64Image, setBase64Image] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const { toast, showToast, setToast } = useToast(3000);

    const inputRef = useRef(null);

    const userInfo = useSelector((state) => state.user);

    const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB

    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
        setPhone(userInfo.phone);
        setAddress(userInfo?.address);
        setBase64Image(userInfo?.avatar);
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
                    avatar: base64Image,
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

    const handleFileChange = (e) => {
        console.log(e.target.files[0]);
        const file = e.target.files[0];

        if (!file) return;

        // Kiểm tra định dạng file
        const validFileTypes = ['image/jpeg', 'image/png'];
        if (!validFileTypes.includes(file.type)) {
            alert('Chỉ chấp nhận các định dạng .JPEG, .PNG');
            return;
        }

        // Kiểm tra kích thước file
        if (file.size > MAX_FILE_SIZE) {
            alert('Dung lượng file tối đa là 1 MB');
            return;
        }

        // Chuyển đổi ảnh sang base64
        const reader = new FileReader();
        reader.onloadend = () => {
            setBase64Image(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleButtonClick = () => {
        inputRef.current.click();
    };

    return (
        <Loading isLoading={isLoading}>
            {toast && (
                <ToastMessage message={toast} onClose={() => setToast('')} />
            )}
            <div className="pb-4 border-b-2 border-[#f5f5f5]">
                <div className="text-lg">Hồ Sơ Của Tôi</div>
                <div className="text-sm">
                    Quản lý thông tin hồ sơ để bảo vệ tài khoản
                </div>
            </div>
            <div className="px-12 mt-7 flex">
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
                <div className="w-1 h-60 bg-transparent border-r-2 pl-14"></div>
                <div className="flex-1 text-center ml-16">
                    <div className="h-24 w-24 bg-[#efefef] rounded-full flex items-center justify-center ml-6 overflow-hidden">
                        {base64Image ? (
                            <img
                                className="h-full w-full object-cover"
                                src={base64Image}
                                alt="avatar"
                            />
                        ) : (
                            <img
                                className="h-full opacity-20"
                                src="https://img.icons8.com/?size=100&id=114064&format=png&color=000000"
                                alt="avatar-none"
                            />
                        )}
                    </div>
                    <input
                        className="hidden"
                        type="file"
                        accept="image/jpeg, image/png"
                        ref={inputRef}
                        onChange={handleFileChange}
                    />
                    <button
                        htmlFor="image"
                        className="mt-5 border-2 py-2 px-4 hover:bg-[#f1f1f198]"
                        onClick={handleButtonClick}
                    >
                        Chọn ảnh
                    </button>
                    <div className="text-[#555555cc] text-sm">
                        Dụng lượng file tối đa 1 MB Định dạng:.JPEG, .PNG
                    </div>
                </div>
            </div>
        </Loading>
    );
}

export default ProfilePage;
