import { faBell, faUser } from '@fortawesome/free-regular-svg-icons';
import { faClipboardList, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import DefaultLayout from '../DefaultLayout';

function UserLayout({ children }) {
    const userInfo = useSelector((state) => state.user);

    const [name, setName] = useState('');

    const location = useLocation();

    useEffect(() => {
        setName(userInfo.name)
    }, [userInfo]);
    return (
        <DefaultLayout>
            <div className="container-custom flex bg-[#f5f5f5] border-primary border-b-4 py-8">
                <div className="w-1/5 p-3 px-5">
                    <div className="flex justify-center items-center gap-3 py-5 border-b-2 border-[#eeeeee]">
                        <div className="h-12 w-12 bg-transparent border-2 rounded-full">
                            <img
                                className="h-full opacity-50"
                                src="https://img.icons8.com/?size=100&id=114064&format=png&color=000000"
                                alt="avatar-none"
                            />
                        </div>
                        <div>
                            <div className="ml-1 font-bold">{name}</div>
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
                                        location.pathname.includes('/user')
                                            ? 'text-primary'
                                            : ''
                                    }`}
                                >
                                    Tài khoản của tôi
                                </span>
                                <ul className="ml-7 text-sm">
                                    <li
                                        className={`hover:text-primary mt-2 ${
                                            location.pathname ===
                                            '/user/profile'
                                                ? 'text-primary'
                                                : ''
                                        }`}
                                    >
                                        Hồ sơ
                                    </li>
                                    <li className="hover:text-primary mt-2">
                                        Địa chỉ
                                    </li>
                                </ul>
                            </li>
                            <li className="ml-2 mt-3">
                                <FontAwesomeIcon
                                    className="text-[#0f4fb0] text-xl"
                                    icon={faClipboardList}
                                />
                                <span className="hover:text-primary cursor-pointer ml-2">
                                    Đơn mua
                                </span>
                            </li>
                            <li className="ml-2 mt-3">
                                <FontAwesomeIcon
                                    className="text-primary text-xl"
                                    icon={faBell}
                                />
                                <span className="hover:text-primary cursor-pointer ml-2">
                                    Thông báo
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="w-4/5 bg-white">{children}</div>
            </div>
        </DefaultLayout>
    );
}

export default UserLayout;
