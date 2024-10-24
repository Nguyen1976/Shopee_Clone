import { Link } from 'react-router-dom';

function SignInPage() {
    return (
        <div className="flex justify-end">
            <div className="bg-white p-5 w-96">
                <div className="text-xl font-normal">Đăng nhập</div>
                <div className="border-[#f3f3f3] border-2 mt-8">
                    <input
                        className="p-2 w-full"
                        type="text"
                        placeholder="Email/Số điện thoại/Tên đăng nhập"
                    />
                </div>
                <div className="border-[#f3f3f3] border-2 mt-6">
                    <input
                        className="p-2 w-full"
                        type="password"
                        placeholder="Mật khẩu"
                    />
                </div>
                <button
                    className="mt-7 bg-primary w-full text-white p-2"
                    type="submit"
                >
                    Đăng nhập
                </button>
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
                    <Link className="text-primary" to={'/sign-up'}>
                        {' '}
                        Đăng ký
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SignInPage;
