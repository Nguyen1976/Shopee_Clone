import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HandleModalAddress from './components/HandleModalAddress';
import * as AddressService from '~/services/AddressService';
import Loading from '~/components/Loading';
import { useToast } from '~/context';

function AddressPage() {
    const [showModal, setShowModal] = useState(false);
    const [listAddress, setListAddress] = useState([]);
    const [userId, setUserId] = useState('');
    const [titleModal, setTitleModal] = useState('');
    const [dataUpdateAddress, setDataUpdateAddress] = useState({});
    const [isCreateAddressModal, setIsCreateAddressModal] = useState(false)

    const [isLoading, setIsLoading] = useState(false);

    const { addToast } = useToast();

    const userInfo = useSelector((state) => state.user);

    useEffect(() => {
        setUserId(userInfo?.id);
    }, [userInfo.id]);

    //Sự dụng để khi component HandleModalAddress thực hiện hành vi tạo hoặc cập nhật thì listAddress sẽ được render lại
    const [loadAddress, setLoadAddress] = useState(false);

    const fetchDataAddress = useCallback(async () => {
        try {
            setIsLoading(true);
            if (userId) {
                const res = await AddressService.getAddress(userId);
                setListAddress(res || []); // Đảm bảo là mảng nếu không có dữ liệu
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchDataAddress();
    }, [fetchDataAddress, loadAddress]);

    const handleModalCreateAddress = () => {
        setShowModal(true);
        setTitleModal('Thêm địa chỉ');
        setIsCreateAddressModal(true);
        setDataUpdateAddress({});
    }

    const handleModalUpdateAddress = (data) => {
        setShowModal(true);
        setTitleModal('Cập nhật địa chỉ');
        setDataUpdateAddress(data);
        setIsCreateAddressModal(false);
    }



    const setDefaultAddress = async (data) => {
        try {
            setIsLoading(true);
            data.default = true;
            await AddressService.updateAddress(data._id, {
                ...data,
            });
            fetchDataAddress();
        } catch (err) {
            console.error(err);
            addToast('Cập nhật địa chỉ không thành công', 'error');
        } finally {
            setIsLoading(false);
            addToast('Cập nhật địa chỉ thành công', 'success');
        }
    };

    return (
        <Loading isLoading={isLoading}>
            {showModal && (
                <HandleModalAddress
                    showModal={showModal}
                    setShowModal={setShowModal}
                    title = {titleModal}
                    data={dataUpdateAddress}
                    isCreateAddress={isCreateAddressModal}
                    setLoadAddress={setLoadAddress}
                />
            )}
            <div className="flex justify-between items-center text-lg border-b border-b-zinc-300 pb-6">
                <div className="p-2">Địa chỉ của tôi</div>
                <button
                    onClick={() => handleModalCreateAddress()}
                    className="bg-primary hover:bg-red-600 text-white text-sm flex justify-between items-center gap-3 p-3"
                >
                    <FontAwesomeIcon icon={faPlus} />
                    <span>Thêm địa chỉ mới</span>
                </button>
            </div>
            <div className="p-2 text-lg">Địa chỉ</div>
            <ul className="mt-5">
                {listAddress
                    .sort((a, b) => b.default - a.default)
                    .map((item, index) => (
                        <li className="border-b pb-5 mb-5" key={index}>
                            <div
                                className="flex
                        justify-between items-center
                        "
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
                                    <div className="text-sm text-blue-600 cursor-pointer"
                                    onClick={() => handleModalUpdateAddress(item)}>
                                        Cập nhật
                                    </div>
                                    <button
                                        className={`border p-1 text-sm mt-3 ${
                                            item.default &&
                                            'visible cursor-not-allowed text-zinc-300'
                                        }`}
                                        onClick={() => setDefaultAddress(item)}
                                    >
                                        Thiết lập mặc định
                                    </button>
                                </div>
                            </div>
                            {item.default && (
                                <button className="bg-transparent border-primary border-1 text-primary text-sm px-1 mt-1">
                                    Mặc định
                                </button>
                            )}
                        </li>
                    ))}
            </ul>
        </Loading>
    );
}

export default React.memo(AddressPage);
