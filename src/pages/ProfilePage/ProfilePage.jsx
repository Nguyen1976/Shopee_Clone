import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isValidEmail, isValidPhoneNumber } from '~/utils/validate';
import * as UserService from '~/services/UserService';
import { updateUser } from '~/redux/slices/UserSlice';
import Loading from '~/components/Loading';
import InputForm from '~/components/InputForm';
import { imageToBase64 } from '~/utils/imageToBase64';
import { useToast } from '~/context';

function ProfilePage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [base64Image, setBase64Image] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isErrorToast, setIsErrorToast] = useState(false);

    const dispatch = useDispatch();

    const { addToast } = useToast();

    const inputRef = useRef(null);

    const userInfo = useSelector((state) => state.user);

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
            setIsErrorToast(false);
        } catch (err) {
            console.error(err);
            setIsErrorToast(true);
        } finally {
            setIsLoading(false);
            if (isErrorToast) {
                addToast(
                    'Cập nhật thông tin người dùng không thành công',
                    'error'
                );
            } else {
                addToast('Cập nhật thông tin người dùng thành công', 'success');
            }
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const base64 = await imageToBase64(file).then((res) => res);
        setBase64Image(base64);
    };

    const handleButtonClick = () => {
        inputRef.current.click();
    };

    return (
        <Loading isLoading={isLoading}>
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
                            <div className="pl-5 text-[#333] flex-1">
                                <InputForm
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    value={email}
                                />
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="text-[#555555cc] pb-8 w-1/5">
                                Số điện thoại
                            </div>
                            <div className="pl-5 text-[#333] flex-1">
                                <InputForm
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Số điện thoại"
                                    value={phone}
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
