import { Link } from 'react-router-dom';

function SignUpPage() {
    return (
        <div className="flex justify-end">
            <div className="bg-white p-5 w-96">
                <div className="text-xl font-normal">Đăng ký</div>
                <form className="border-[#f3f3f3] border-2 mt-8">
                    <input
                        className="p-2 w-full"
                        type="text"
                        placeholder="Số điện thoại"
                    />
                </form>
                <button
                    className="mt-7 bg-primary w-full text-white p-2"
                    type="submit"
                >
                    Tiếp theo
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
