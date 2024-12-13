import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

import { isValidEmail, isValidPassword } from '~/utils/validate';
import * as UserService from '~/services/UserService';
import Loading from '~/components/Loading';
import config from '~/configs';
import InputForm from '~/components/InputForm';
import { useToast } from '~/context';
import { useDispatch } from 'react-redux';
import { updateUser } from '~/redux/slices/UserSlice';

function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const [isLoading, setIsLoading] = useState(false);

    const { addToast } = useToast();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleValidEmail = () => {
        setIsEmailValid(isValidEmail(email));
    };

    const handleValidPassword = () => {
        setIsPasswordValid(isValidPassword(password));
    };

    const handleLoadInfoUser = async (data, accessToken, refreshToken) => {
        if (accessToken) {
            localStorage.setItem('access_token', accessToken);
        }
        if (refreshToken) {
            localStorage.setItem('refresh_token', refreshToken);
        }
        if (data.user._id) {
            dispatch(updateUser({ _id: data.user._id }));
        }
        if (data.user.isAdmin) {
            navigate(config.routes.productAdmin);
        } else {
            navigate(config.routes.home);
        }
        addToast('Đăng nhập thành công', 'success');
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        if (isEmailValid && isPasswordValid && email && password) {
            try {
                const data = await UserService.signInUser({
                    email,
                    password,
                });
                if (data) {
                    await handleLoadInfoUser(
                        data,
                        data.access_token,
                        data.refresh_token
                    );
                }
            } catch (error) {
                console.error(error);
                setIsLoading(false);
                addToast('Đăng nhập thất bại', 'error');
            } finally {
                setIsLoading(false);
            }
        } else {
            addToast('Tài khoản hoặc mất khẩu sai định dạng', 'error');
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async (response) => {
        try {
            const res = await UserService.signInGoogle(response.credential);
            if (res) {
                await handleLoadInfoUser(
                    res,
                    res.accessToken,
                    res.refreshToken
                );
            }
        } catch (err) {
            console.error(err);
            addToast('Đăng nhập với Google thất bại', 'error');
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-end">
            <div className="bg-white p-5 w-96">
                <div className="text-xl font-normal">Đăng nhập</div>
                <div id="email" className="mt-4 h-14">
                    <InputForm
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        isError={!isEmailValid}
                        onBlur={() => handleValidEmail()}
                        placeholder={'Email'}
                        message={
                            email ? 'Email không hợp lệ' : 'Hãy nhập email'
                        }
                    />
                </div>
                <form id="password" className="mt-4 h-14">
                    <InputForm
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        isError={!isPasswordValid}
                        onBlur={() => handleValidPassword()}
                        type="password"
                        placeholder={'Mật khẩu'}
                        message={
                            password
                                ? 'Mật khẩu không hợp lệ'
                                : 'Hãy nhập mật khẩu'
                        }
                    />
                </form>
                <Loading isLoading={isLoading}>
                    <button
                        className=" bg-primary w-full text-white p-2 select-none mt-4"
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
                    <GoogleLogin
                        onSuccess={handleGoogleLogin}
                        onError={() => console.error('Login Failed')}
                    />
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
