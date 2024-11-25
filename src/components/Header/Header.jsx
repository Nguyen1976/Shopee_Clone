import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

import Tooltip from '~/components/Tooltip';
import images from '~/assets/images';
import useDebounce from '~/hooks/useDebounce';
import config from '~/configs';
import * as ProductService from '~/services/ProductService';
import TopHeader from './TopHeader';

function Header() {
    const [isInputFocus, setIsInputFocus] = useState(false);

    const [valueSearch, setValueSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const userInfo = useSelector((state) => state.user);

    const debouncedValueSearch = useDebounce(valueSearch, 500);

    const listOrderProduct = useSelector((state) => state.order);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchDataSearch = async () => {
            try {
                const res = await ProductService.getAllProducts(
                    debouncedValueSearch,
                    5
                );
                if (res.data) {
                    setSearchResult(res.data);
                }
            } catch (err) {
                console.error('Error fetching product data:', err);
            }
            if (!debouncedValueSearch) {
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
        <header className="bg-header py-2 sticky top-0 z-40">
            <div className="text-white container-custom">
                {/*TopHeader*/}
                <TopHeader />
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
                            funcRender={() => {
                                //Phải trong trạng thái đăng nhập thì mới có giỏ hàng
                                if (
                                    listOrderProduct.orderItems.length === 0 ||
                                    !userInfo.access_token
                                ) {
                                    return (
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
                                    );
                                } else {
                                    return (
                                        <div className="w-full">
                                            <ul className="p-2">
                                                <li className="text-zinc-500 text-sm py-2">
                                                    Sản phẩm mới thêm...
                                                </li>
                                                {listOrderProduct.orderItems
                                                    .slice(0, 5)
                                                    .map((item, index) => {
                                                        return (
                                                            <li
                                                                className="flex justify-between p-2"
                                                                key={`cart-${index}`}
                                                            >
                                                                <div className="flex ml-2">
                                                                    <img
                                                                        className="object-cover h-12 border-1"
                                                                        src={
                                                                            item.image
                                                                        }
                                                                        alt=""
                                                                    />
                                                                    <div className="w-60 h- line-clamp-1 truncate text-black ml-2">
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div className="text-primary text-sm">
                                                                    {item.price}
                                                                    đ
                                                                </div>
                                                            </li>
                                                        );
                                                    })}
                                                <li className="text-black text-sm p-2 flex items-center justify-between">
                                                    <div>
                                                        {listOrderProduct
                                                            .orderItems.length -
                                                            5 >=
                                                        0
                                                            ? listOrderProduct
                                                                  .orderItems
                                                                  .length - 5
                                                            : 0}{' '}
                                                        Thêm hàng vào sản phẩm
                                                    </div>
                                                    <button
                                                        className="bg-primary text-white py-2 px-6"
                                                        onClick={() =>
                                                            navigate(
                                                                config.routes
                                                                    .order
                                                            )
                                                        }
                                                    >
                                                        Xem giỏ hàng
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    );
                                }
                            }}
                            top={20}
                            right={0}
                            width={400}
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
