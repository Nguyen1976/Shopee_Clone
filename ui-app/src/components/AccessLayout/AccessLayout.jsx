import { Link, useLocation } from 'react-router-dom';

import images from '~/assets/images';
import FooterLayout from '~/components/FooterLayout';

function AccessLayout({ children }) {
    const location = useLocation();
    const titleHeader =
        location.pathname === '/sign-up' ? 'Đăng ký' : 'Đăng nhập';

    return (
        <FooterLayout>
            <div className="bg-white">
                <div clasName="container-custom">
                    <div className="flex py-5 items-center justify-between">
                        <div className="max-w-72 flex items-center justify-between gap-3">
                            <Link to={'/'} className="w-1/2">
                                <img src={images.logoColor} alt="logo" />
                            </Link>
                            <div className="w-1/2 text-2xl font-medium mt-3">
                                {titleHeader}
                            </div>
                        </div>
                        <div className="text-sm text-primary ml-2">
                            <a
                                className="whitespace-nowrap font-medium"
                                href="/"
                            >
                                Bạn cần giúp đỡ?
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="p-20"
                style={{
                    backgroundColor: 'rgb(238, 77, 45)',
                }}
            >
                <div
                    className="container-custom"
                    style={{
                        backgroundImage: `url(${images.bgAccesLayout})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }}
                >
                    {children}
                </div>
            </div>
        </FooterLayout>
    );
}

export default AccessLayout;
