import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
    isPasswordMatch,
    isValidEmail,
    isValidName,
    isValidPassword,
} from '~/utils/validate';
import * as UserService from '~/services/UserService';
import Loading from '~/components/Loading';

function SignUpPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    // Thêm trạng thái để quản lý tính hợp lệ
    const [isNameValid, setIsNameValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

    const navigate = useNavigate();

    const handleValidEmail = () => {
        setIsEmailValid(isValidEmail(email));
    };

    const handleValidName = () => {
        setIsNameValid(isValidName(name));
    };

    const handleValidPassword = () => {
        setIsPasswordValid(isValidPassword(password));
    };

    const handleValidConfirmPassword = () => {
        setIsConfirmPasswordValid(isPasswordMatch(password, confirmPassword));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Bắt đầu trạng thái loading

        if (
            isNameValid &&
            isEmailValid &&
            isPasswordValid &&
            isConfirmPasswordValid
        ) {
            try {
                await UserService.signUpUser({
                    name,
                    email,
                    password,
                    confirmPassword,
                });
                navigate('/sign-in'); // Điều hướng khi đăng ký thành công
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false); // Kết thúc trạng thái loading
            }
        }
    };

    return (
        <div className="flex justify-end">
            <div className="bg-white p-5 w-96">
                <div>
                    <div className="text-xl font-normal">Đăng ký</div>
                    <div id="name" className="mt-4 h-14">
                        <input
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border-[#f3f3f3] border-2 p-2"
                            type="text"
                            placeholder="Tên đăng nhập"
                            onBlur={handleValidName}
                        />
                        {!isNameValid && (
                            <span className="text-xs text-[#f33a58] ml-2">
                                Tên đăng nhập không hợp lệ
                            </span>
                        )}
                    </div>
                    <div id="email" className="mt-4 h-14">
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border-[#f3f3f3] border-2 p-2"
                            type="text"
                            placeholder="Email"
                            onBlur={handleValidEmail}
                        />
                        {!isEmailValid && (
                            <span className="text-xs text-[#f33a58] ml-2">
                                Email không hợp lệ
                            </span>
                        )}
                    </div>
                    <div id="password" className="mt-4 h-14">
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border-[#f3f3f3] border-2 p-2"
                            type="text"
                            placeholder="Mật khẩu"
                            onBlur={handleValidPassword}
                        />
                        {!isPasswordValid && (
                            <span className="text-xs text-[#f33a58] ml-2">
                                Mật khẩu không hợp lệ
                            </span>
                        )}
                    </div>
                    <div id="confirm-password" className="mt-4 h-14">
                        <input
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full border-[#f3f3f3] border-2 p-2"
                            type="text"
                            placeholder="Xác nhận mật khẩu"
                            onBlur={handleValidConfirmPassword}
                        />
                        {!isConfirmPasswordValid && (
                            <span className="text-xs text-[#f33a58] ml-2">
                                Mật khẩu phải giống với mật khẩu trên
                            </span>
                        )}
                    </div>
                    <Loading
                        isLoading={isLoading}
                    >
                        <button
                            className=" bg-primary w-full text-white p-2"
                            onClick={handleSubmit}
                        >
                            Đăng ký
                        </button>
                    </Loading>
                </div>
                <div className="flex mt-6 mx-auto items-center">
                    <div className="bg-[#dbdbdb] h-[1px] w-2/5"></div>
                    <span className="w-1/5 text-center text-[#dbdbdb] text-sm">
                        HOẶC
                    </span>
                    <div className="bg-[#dbdbdb] h-[1px] w-2/5"></div>
                </div>
                <div className="mt-6 flex gap-4 justify-between">
                    <button className="w-1/2 border-2 p-2">Facebook</button>
                    <button className="w-1/2 border-2 p-2">Google</button>
                </div>
                <div className="text-xs mt-5 text-center px-10">
                    Bằng việc đăng kí, bạn đã đồng ý với Shopee về{' '}
                    <a className="text-primary" href="/">
                        Điều khoản dịch vụ
                    </a>{' '}
                    &{' '}
                    <a className="text-primary" href="/">
                        Chính sách bảo mật
                    </a>
                </div>
                <div className="text-center text-sm mt-5 text-[#8b8b8b]">
                    Bạn đã có tài khoản?{' '}
                    <Link className="text-primary" to={'/sign-in'}>
                        {' '}
                        Đăng nhập
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
