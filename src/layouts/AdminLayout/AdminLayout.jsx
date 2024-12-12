import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HeaderAdmin from './components/HeaderAdmin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBell,
    faChevronDown,
    faComments,
    faHeadset,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import config from '~/configs';

function AdminLayout({ children }) {
    const [productActive, setProductActive] = useState(false);

    const handleActiveProduct = () => {
        setProductActive(!productActive);
    };

    return (
        <div className="">
            <div className="fixed top-0 right-0 left-0 z-20 bg-white">
                <HeaderAdmin />
            </div>
            <aside className="bg-white w-[177px] fixed top-14 left-0 z-10 overflow-y-scroll h-screen scrollbar scrollbar-y shadow-xl">
                <ul className="mt-5 text-zinc-400 font-bold px-2">
                    <li className="flex gap-1 items-center mt-5">
                        <span>Quản Lý Người Dùng</span>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </li>
                    <li className="mt-5 select-none cursor-pointer">
                        <div
                            className="flex gap-1 items-center"
                            onClick={handleActiveProduct}
                        >
                            <span>Quản Lý Sản phẩm</span>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </div>
                        <ul
                            className={`${productActive ? 'opacity-100  h-[50px]' : 'opacity-0 h-0'} text-sm font-medium mt-2 transition-all duration-300 ml-2`}
                        >
                            <li>
                                <Link to={config.routes.productAdmin}>
                                    Tất cả sản phẩm
                                </Link>
                            </li>
                            <li className="mt-1">
                                <Link to={config.routes.createProductAdmin}>
                                    Thêm sản phẩm
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="flex gap-1 items-center mt-5">
                        <span>Quản Lý Đơn Hàng</span>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </li>
                </ul>
            </aside>
            <div className="w-full min-h-screen relative -top-3">
                <div className="pl-56 pr-28 mt-20 absolute top-5">
                    <div className="bg-white py-6 px-16 rounded-md shadow-xl">
                        {children}
                    </div>
                </div>
            </div>
            <aside className="w-[50px] fixed top-14 right-0 z-10 h-screen bg-white shadow-xl">
                <ul className="text-center mt-5">
                    <li className="hover:bg-zinc-200 py-3">
                        <FontAwesomeIcon
                            className="text-primary text-2xl"
                            icon={faBell}
                        />
                    </li>
                    <li className="hover:bg-zinc-200 py-3">
                        <FontAwesomeIcon
                            className="text-primary text-2xl"
                            icon={faHeadset}
                        />
                    </li>
                    <li className="hover:bg-zinc-200 py-3">
                        <FontAwesomeIcon
                            className="text-primary text-2xl"
                            icon={faComments}
                        />
                    </li>
                </ul>
            </aside>
        </div>
    );
}

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default React.memo(AdminLayout);
