import { useState } from 'react';
import {
    faFacebook,
    faSquareInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { faBell, faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import {
    faCaretDown,
    faCartShopping,
    faEarthAsia,
    faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import images from '~/assets/images';
import Tooltip from '~/components/Tooltip';

function Header() {
    const [isInputFocus, setIsInputFocus] = useState(false);

    const hotSearch = [
        {
            title: 'Săn sale 1k điện thoại',
            path: '/',
        },
        {
            title: 'Túi mù phát sáng',
            path: '/',
        },
        {
            title: 'Áo khoác',
            path: '/',
        },
        {
            title: 'Gấu bông',
            path: '/',
        },
        {
            title: 'Son',
            path: '/',
        },
        {
            title: 'Xe máy wave 110cc',
            path: '/',
        },
        {
            title: 'Sửa rửa mặt',
            path: '/',
        },
        {
            title: 'Thước kẻ free ship 30cm',
            path: '/',
        },
    ];

    return (
        <div className="bg-header py-2">
            <div className="text-white container mx-auto sm:px-6 md:px-8 lg:px-40">
                <div className="flex justify-between text-sm">
                    <div className="flex gap-2 items-center">
                        <div className="hover:opacity-50">
                            <a href="/">Kênh người bán</a>
                        </div>
                        <span className="opacity-30">|</span>
                        <div className="hover:opacity-50">
                            <a href="/">Trở thành người bán shoppe</a>
                        </div>
                        <span className="opacity-30">|</span>
                        <Tooltip
                            funcRender={() => (
                                <div className="w-full">
                                    <div className="flex justify-center">
                                        <img
                                            src={images.qrcode}
                                            alt="qr code"
                                        />
                                    </div>
                                    <div className="flex flex-wrap px-3 gap-4">
                                        <img
                                            className="w-2/5"
                                            src={images.appstore}
                                            alt="app store"
                                        />
                                        <img
                                            className="w-2/5"
                                            src={images.googleplay}
                                            alt="google play"
                                        />
                                        <img
                                            className="w-2/5"
                                            src={images.appgallery}
                                            alt="app gallery"
                                        />
                                    </div>
                                </div>
                            )}
                            top={28}
                            left={0}
                            width={208}
                            afterArrow={false}
                            fadeIn={true}
                        >
                            <a className="hover:opacity-50" href="/">
                                Tải ứng dụng
                            </a>
                        </Tooltip>

                        <span className="opacity-30">|</span>

                        <div className="flex gap-2">
                            <div>Kết nối</div>
                            <div>
                                <a href="/">
                                    <FontAwesomeIcon icon={faFacebook} />
                                </a>
                            </div>
                            <div>
                                <a href="/">
                                    <FontAwesomeIcon icon={faSquareInstagram} />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div>
                            <Tooltip
                                funcRender={() => (
                                    <div className="w-full flex flex-col justify-center items-center">
                                        <div className="w-1/3 py-16">
                                            <img
                                                src={images.notNotify}
                                                alt=""
                                            />
                                        </div>
                                        <div className="text-sm text-black py-5">
                                            Đăng nhập để xem thông báo
                                        </div>
                                        <div className="w-full flex justify-between items-center">
                                            <button className="border-none outline-none w-1/2 text-black bg-[#f5f5f5] p-2 hover:bg-[#e8e8e8] hover:text-primary">
                                                Đăng ký
                                            </button>
                                            <button className="border-none outline-none w-1/2 text-black bg-[#f5f5f5] p-2 hover:bg-[#e8e8e8] hover:text-primary">
                                                Đăng nhập
                                            </button>
                                        </div>
                                    </div>
                                )}
                                top={20}
                                right={0}
                                width={320}
                                afterArrow={true}
                                scaleTopRight={true}
                            >
                                <a className="hover:opacity-50" href="/">
                                    <FontAwesomeIcon icon={faBell} />
                                    <span className="pl-1">Thông báo</span>
                                </a>
                            </Tooltip>
                        </div>
                        <div className="hover:opacity-50">
                            <a href="/">
                                <FontAwesomeIcon icon={faCircleQuestion} />
                                <span className="pl-1">Hỗ trợ</span>
                            </a>
                        </div>
                        <div>
                            <Tooltip
                                funcRender={() => (
                                    <div className="w-full">
                                        <div className="text-black hover:text-primary p-2 text-sm">
                                            Tiếng việt
                                        </div>
                                        <div className="text-black hover:text-primary p-2 text-sm">
                                            English
                                        </div>
                                    </div>
                                )}
                                top={25}
                                right={0}
                                width={150}
                                afterArrow={true}
                                scaleTop={true}
                            >
                                <a className="hover:opacity-50" href="/">
                                    <FontAwesomeIcon icon={faEarthAsia} />
                                    <span className="pl-1 pr-1">
                                        Tiếng việt
                                    </span>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </a>
                            </Tooltip>
                        </div>
                        <div className="flex gap-2">
                            <a className="hover:opacity-50" href="/">
                                Đăng kí
                            </a>
                            <span className="opacity-30">|</span>
                            <a className="hover:opacity-50" href="/">
                                Đăng nhập
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-6">
                    <div className="w-2/12">
                        <img
                            className="object-cover"
                            src={images.logo}
                            alt="logo"
                        />
                    </div>
                    <div className="w-2/3 relative">
                        <label className="bg-white text-black flex items-center gap-2 rounded-sm px-1 h-11">
                            <input
                                type="text"
                                className="grow outline-none"
                                placeholder="Shoppe bao ship 0Đ - Đăng ký ngay!"
                                onFocus={() => setIsInputFocus(true)}
                                onBlur={() => setIsInputFocus(false)}
                            />
                            <button className="bg-primary border-none outline-none h-5/6 w-1/12 text-white">
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </label>
                        <div className="flex gap-2 text-sm mt-2 overflow-hidden">
                            {hotSearch.map((item, index) => (
                                <a
                                    className="whitespace-nowrap"
                                    key={index}
                                    href={item.path}
                                >
                                    {item.title}
                                </a>
                            ))}
                        </div>
                        {isInputFocus && (
                            <ul className="bg-white w-full h-auto top-12 absolute shadow-lg">
                                <li className="px-2 py-3 text-black hover:bg-[#fafafa]">
                                    Shoppe bao ship 0Đ - Đăng ký ngay!
                                </li>
                            </ul>
                        )}
                    </div>
                    <div className="mr-24">
                        <Tooltip
                            funcRender={() => (
                                <div className="w-full flex flex-col justify-center items-center py-12">
                                    <div className="w-1/3">
                                        <img
                                            src={images.notProduct}
                                            alt="not product"
                                        />
                                    </div>
                                    <div className="text-sm text-black py-1">
                                        Chưa có sản phẩm
                                    </div>
                                </div>
                            )}
                            top={20}
                            right={0}
                            width={340}
                            afterArrow={true}
                            scaleTopRight={true}
                        >
                            <FontAwesomeIcon
                                className="text-2xl"
                                icon={faCartShopping}
                            />
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
