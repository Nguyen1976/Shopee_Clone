import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';

import { isValidEmail, isValidPassword } from '~/utils/validate';
import * as UserService from '~/services/UserService';
import loadUserIntoStore from '~/utils/loadUserIntoStore';
import Loading from '~/components/Loading';
import ToastMessage from '~/components/ToastMessage/ToastMessage';
import useToast from '~/hooks/useToast';
import config from '~/configs';

function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const [isLoading, setIsLoading] = useState(false);
    const [isErrorToast, setIsErrorToast] = useState(false);

    const { toast, showToast, setToast } = useToast(3000);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleValidEmail = () => {
        setIsEmailValid(isValidEmail(email));
    };

    const handleValidPassword = () => {
        setIsPasswordValid(isValidPassword(password));
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        if (isEmailValid && isPasswordValid) {
            try {
                const data = await UserService.signInUser({
                    email,
                    password,
                });

                localStorage.setItem(
                    'access_token',
                    JSON.stringify(data.access_token)
                );

                const decoded = jwtDecode(data.access_token);
                if (decoded && decoded.id) {
                    await loadUserIntoStore(
                        dispatch,
                        decoded.id,
                        data.access_token
                    );
                    if (data.isAdmin) {
                        navigate(config.routes.adminUser);
                    } else {
                        navigate(config.routes.home);
                    }
                }
                setIsErrorToast(false);
            } catch (error) {
                console.error(error);
                setIsErrorToast(true);
            } finally {
                setIsLoading(false);
                if (isErrorToast) {
                    showToast('Đăng nhập thất bại');
                } else {
                    showToast('Đăng nhập thành công');
                }
            }
        }
    };

    return (
        <div className="flex justify-end">
            {toast && (
                <ToastMessage isError={isErrorToast} message={toast} onClose={() => setToast('')} />
            )}
            <div className="bg-white p-5 w-96">
                <div className="text-xl font-normal">Đăng nhập</div>
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
                <Loading isLoading={isLoading}>
                    <button
                        className=" bg-primary w-full text-white p-2"
                        onClick={handleSubmit}
                    >
                        Đăng nhập
                    </button>
                </Loading>
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
                <div className="text-center text-sm mt-5 text-[#8b8b8b]">
                    Bạn mới biết đến Shopee?{' '}
                    <Link className="text-primary" to={config.routes.signUp}>
                        {' '}
                        Đăng ký
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SignInPage;
