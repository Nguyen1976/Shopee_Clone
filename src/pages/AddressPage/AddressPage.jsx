import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HandleModalAddress from './components/HandleModalAddress';
import * as AddressService from '~/services/AddressService';

function AddressPage() {
    const [showModal, setShowModal] = useState(false);
    const [listAddress, setListAddress] = useState([]);
    const [userId, setUserId] = useState('');

    const userInfo = useSelector((state) => state.user);

    useEffect(() => {
        setUserId(userInfo?.id);
    }, [userInfo.id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userId) {
                    const res = await AddressService.getAddress(userId);
                    setListAddress(res || []); // Đảm bảo là mảng nếu không có dữ liệu
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [userId]);

    return (
        <div>
            {showModal && (
                <HandleModalAddress
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
            )}
            <div className="flex justify-between items-center text-lg border-b border-b-zinc-300 pb-6">
                <div className="p-2">Địa chỉ của tôi</div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-primary hover:bg-red-600 text-white text-sm flex justify-between items-center gap-3 p-3"
                >
                    <FontAwesomeIcon icon={faPlus} />
                    <span>Thêm địa chỉ mới</span>
                </button>
            </div>
            <div className="p-2 text-lg">Địa chỉ</div>
            <ul className="mt-5">
                {listAddress.map((item, index) => (
                    <li
                        className="flex
                    justify-between items-center
                    border-b pb-5 mb-5"
                        key={index}
                    >
                        <div>
                            <div>
                                {item.name} |{' '}
                                <span className="text-zinc-500 text-sm">
                                    {item.phone}
                                </span>
                            </div>
                            <div className="text-zinc-500 text-sm mt-1">
                                {item.address}
                            </div>
                            <div className="text-zinc-500 text-sm mt-1">
                                {item.commune +
                                    ', ' +
                                    item.district +
                                    ', ' +
                                    item.city}
                            </div>
                        </div>
                        <div className="text-end">
                            <div className="text-sm text-blue-600">
                                Cập nhật
                            </div>
                            <button className="border p-1 text-sm mt-3">
                                Thiết lập mặc định
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default React.memo(AddressPage);
