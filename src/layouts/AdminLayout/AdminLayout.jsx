import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faClipboardList, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import DefaultLayout from '~/layouts/DefaultLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import config from '~/configs';

function AdminLayout({ children }) {
    const location = useLocation();

    const navigate = useNavigate();

    const locationCurrent = location.pathname.replace(/\/repair\/[\w-]+$/, '/repair');

    return (
        <DefaultLayout>
            <div className="container-custom flex bg-[#f5f5f5] border-primary border-b-4 py-8">
                <div className="w-1/5 p-3 px-5">
                    <div className="flex justify-center items-center gap-3 py-5 border-b-2 border-[#eeeeee]">
                        <div className="h-12 w-12 bg-transparent border-1 rounded-full">
                            <img
                                className="h-full opacity-50"
                                src="https://img.icons8.com/?size=100&id=114064&format=png&color=000000"
                                alt="avatar-none"
                            />
                        </div>
                        <div>
                            <div className="ml-1 font-bold">Admin</div>
                            <div className="text-sm text-[#9e9e9e]">
                                <FontAwesomeIcon icon={faPen} />
                                <span className="ml-1">Sửa hồ sơ</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <ul>
                            <li className="ml-2 mt-3">
                                <FontAwesomeIcon
                                    className="text-[#0f4fb0] text-xl"
                                    icon={faUser}
                                />
                                <span
                                    className={`hover:text-primary cursor-pointer ml-2 ${
                                        locationCurrent.includes(config.routes.adminUser)
                                            ? 'text-primary'
                                            : ''
                                    }`}
                                    onClick={() =>
                                        navigate(config.routes.adminUser)
                                    }
                                >
                                    Người dùng
                                </span>
                                <ul className="ml-7 text-sm">
                                    <li
                                        className={`hover:text-primary mt-2 ${
                                            locationCurrent ===
                                            config.routes.adminUserRepair.replace('/:id', '')
                                                ? 'text-primary'
                                                : ''
                                        }`}
                                    >
                                        Hồ sơ
                                    </li>
                                </ul>
                            </li>
                            <li className="ml-2 mt-3">
                                <FontAwesomeIcon
                                    className="text-[#0f4fb0] text-xl"
                                    icon={faClipboardList}
                                />
                                <span
                                    className={`hover:text-primary cursor-pointer ml-2 ${
                                        locationCurrent.includes(
                                            config.routes.adminProduct
                                        )
                                            ? 'text-primary'
                                            : ''
                                    }`}
                                    onClick={() =>
                                        navigate(config.routes.adminProduct)
                                    }
                                >
                                    Sản phẩm
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="w-4/5 bg-white p-5">{children}</div>
            </div>
        </DefaultLayout>
    );
}

export default React.memo(AdminLayout);
