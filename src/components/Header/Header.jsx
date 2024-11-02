import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';

import Tooltip from '~/components/Tooltip';
import { updateUser } from '~/redux/slices/UserSlice';
import loadUserIntoStore from '~/utils/loadUserIntoStore';
import images from '~/assets/images';
import useDebounce from '~/hooks/useDebounce';
import * as ProductService from '~/services/ProductService';
import config from '~/configs';

function Header() {
    const [isInputFocus, setIsInputFocus] = useState(false);
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [valueSearch, setValueSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const debouncedValueSearch = useDebounce(valueSearch, 500);

    const userInfo = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        dispatch(updateUser({}));
        navigate(config.routes.signIn);
    };

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');

        if (accessToken) {
            const decoded = jwtDecode(accessToken);
            if (decoded.id) {
                loadUserIntoStore(dispatch, decoded.id, accessToken);
            }
        }
    }, [dispatch]);

    useEffect(() => {
        setName(userInfo.name);
        setAvatar(userInfo.avatar);
    }, [userInfo]);

    useEffect(() => {
        const fetchDataSearch = async () => {
            try {
                const res = await ProductService.getAllProducts(
                    debouncedValueSearch,
                    5
                );
                setSearchResult(res.data);
            } catch (err) {
                console.error('Error fetching product data:', err);
            }
            if(!debouncedValueSearch) {
                setSearchResult([]);
            }
        };
        fetchDataSearch();
    }, [debouncedValueSearch]);

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
        <header className="bg-header py-2 sticky top-0 z-50">
            <div className="text-white container-custom">
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
                            top={20}
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
                                <a href="/" title="Kết nối facebook">
                                    <FontAwesomeIcon icon={faFacebook} />
                                </a>
                            </div>
                            <div>
                                <a href="/" title="Kết nối Instargram">
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
                                            <div
                                                className="w-1/2 text-black bg-[#f5f5f5] p-2 hover:bg-[#e8e8e8] hover:text-primary text-center"
                                                onClick={() =>
                                                    navigate(config.routes.signUp)
                                                }
                                            >
                                                Đăng ký
                                            </div>
                                            <div
                                                className="w-1/2 text-black bg-[#f5f5f5] p-2 hover:bg-[#e8e8e8] hover:text-primary text-center"
                                                onClick={(e) =>
                                                    navigate(config.routes.signIn)
                                                }
                                            >
                                                Đăng nhập
                                            </div>
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
                                    <div className="w-full z-auto">
                                        <div className="text-black hover:text-primary p-2 text-sm">
                                            Tiếng việt
                                        </div>
                                        <div className="text-black hover:text-primary p-2 text-sm">
                                            English
                                        </div>
                                    </div>
                                )}
                                top={20}
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
                        {name ? (
                            <Tooltip
                                funcRender={() => (
                                    <div className="w-full">
                                        <div
                                            className="text-black hover:text-primary p-2 text-sm cursor-pointer"
                                            onClick={() =>
                                                navigate('/user/profile')
                                            }
                                        >
                                            Tài khoản của tôi
                                        </div>
                                        <div className="text-black hover:text-primary p-2 text-sm cursor-pointer">
                                            Đơn mua
                                        </div>
                                        <div
                                            className="text-black hover:text-primary p-2 text-sm cursor-pointer"
                                            onClick={handleLogout}
                                        >
                                            Đăng xuất
                                        </div>
                                    </div>
                                )}
                                top={20}
                                right={0}
                                width={150}
                                afterArrow={true}
                                scaleTop={true}
                            >
                                <div className="flex">
                                    <div className="h-5 w-5 bg-white rounded-full overflow-hidden">
                                        {avatar ? (
                                            <img
                                                className="h-full w-full object-cover"
                                                src={avatar}
                                                alt="avatar"
                                            />
                                        ) : (
                                            <img
                                                className="h-full opacity-50"
                                                src="https://img.icons8.com/?size=100&id=114064&format=png&color=000000"
                                                alt="avatar-none"
                                            />
                                        )}
                                    </div>
                                    <div className="ml-1 text-md">{name}</div>
                                </div>
                            </Tooltip>
                        ) : (
                            <div className="flex gap-2">
                                <Link
                                    className="hover:opacity-50"
                                    to="/sign-up"
                                >
                                    Đăng kí
                                </Link>
                                <span className="opacity-30">|</span>
                                <Link
                                    className="hover:opacity-50"
                                    to="/sign-in"
                                >
                                    Đăng nhập
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex justify-between items-center mt-6">
                    <div className="w-2/12">
                        <Link to={config.routes.home}>
                            <img
                                className="object-cover"
                                src={images.logo}
                                alt="logo"
                            />
                        </Link>
                    </div>
                    <div className="w-2/3 relative">
                        <label className="bg-white text-black flex items-center gap-2 rounded-sm px-1 h-11">
                            <input
                                type="text"
                                className="grow outline-none"
                                placeholder="Shoppe bao ship 0Đ - Đăng ký ngay!"
                                onFocus={() => setIsInputFocus(true)}
                                onBlur={() => setIsInputFocus(false)}
                                onChange={(e) => setValueSearch(e.target.value)}
                            />
                            <button className="bg-primary border-none outline-none h-5/6 w-1/12 text-white">
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </label>
                        <div className="flex gap-2 text-sm mt-2 overflow-hidden">
                            {hotSearch.map((item, index) => (
                                <a
                                    className="whitespace-nowrap"
                                    key={`key-hot-search-${index}`}
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
                                {searchResult.map((item, index) => (
                                    <li
                                        className="px-2 py-3 text-black hover:bg-[#fafafa]"
                                        key={`key-search-${item._id || index}`}
                                    >
                                        {item.name}
                                    </li>
                                ))}
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
        </header>
    );
}

export default React.memo(Header);
