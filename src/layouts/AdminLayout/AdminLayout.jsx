import React from 'react';
import PropTypes from 'prop-types';
import HeaderAdmin from './components/HeaderAdmin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBell,
    faChevronDown,
    faComments,
    faHeadset,
} from '@fortawesome/free-solid-svg-icons';

function AdminLayout({ children }) {
    return (
        <div>
            <div className="fixed top-0 right-0 left-0 z-50 bg-white">
                <HeaderAdmin />
            </div>
            <aside className="bg-white w-[177px] fixed top-10 left-0 z-10 overflow-y-scroll h-screen scrollbar">
                <ul className="mt-5 text-zinc-400 font-bold px-2">
                    <li className="flex gap-1 items-center mt-5">
                        <span>Quản Lý Người Dùng</span>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </li>
                    <li className="flex gap-1 items-center mt-5">
                        <span>Quản Lý Sản phẩm</span>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </li>
                    <li className="flex gap-1 items-center mt-5">
                        <span>Quản Lý Đơn Hàng</span>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </li>
                </ul>
            </aside>
            <div className="w-full h-screen bg-[#f6f6f6] fixed">
                <div className="pl-56 pr-28 mt-20">{children}</div>
            </div>
            <aside className="w-[50px] fixed top-10 right-0 z-10 h-screen bg-white">
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
