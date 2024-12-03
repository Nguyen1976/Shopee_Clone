import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import { useToast } from '~/context';
import * as AddressService from '~/services/AddressService';

function ListAddress({ reRenderAddress, handleModalUpdateAddress }) {
    const [listAddress, setListAddress] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { addToast } = useToast();
    const userInfo = useSelector((state) => state.user);

    const fetchDataAddress = useCallback(async () => {
        if (!userInfo.id || isLoading) return; // Chặn nếu đang tải hoặc không có user

        setIsLoading(true);
        try {
            const res = await AddressService.getAddress(userInfo.id);

            setListAddress(res.addresses);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [userInfo.id, isLoading]);

    // Theo dõi sự thay đổi của page và tải dữ liệu
    useEffect(() => {
        fetchDataAddress();
    }, [fetchDataAddress, reRenderAddress]);

    // Thiết lập địa chỉ mặc định
    const setDefaultAddress = async (data) => {
        if (!userInfo.id || !data) return;

        setIsLoading(true);
        try {
            await AddressService.updateAddress(userInfo.id, data._id, {
                ...data,
                default: true,
            });
            addToast('Cập nhật địa chỉ thành công', 'success');
            setListAddress([]); // Xóa danh sách cũ để tải lại từ đầu
            fetchDataAddress(); // Gọi lại API
        } catch (err) {
            console.error(err);
            addToast('Cập nhật địa chỉ không thành công', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteAddress = async (data) => {
        try {
            setIsLoading(true);
            await AddressService.deleteAddress(userInfo.id, data._id);
            addToast('Xóa đại chỉ thành công', 'success');
            setListAddress(listAddress.filter((item) => item._id !== data._id));
        } catch (err) {
            console.error(err);
            addToast('Xóa địa chỉ không thành công', 'error');
        }
    };

    return (
        <>
            <ul className="mt-5">
                {listAddress.map((item, index) => (
                    <li className="border-b pb-5 mb-5" key={item._id || index}>
                        <div className="flex justify-between items-center">
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
                                    {item.commune}, {item.district}, {item.city}
                                </div>
                            </div>
                            <div className="text-end">
                                <div className="flex items-center justify-end gap-4">
                                    <div
                                        className="text-sm text-blue-600 cursor-pointer"
                                        onClick={() =>
                                            handleModalUpdateAddress(item)
                                        }
                                    >
                                        Cập nhật
                                    </div>
                                    <div
                                        className="text-sm text-blue-600 cursor-pointer"
                                        onClick={() =>
                                            handleDeleteAddress(item)
                                        }
                                    >
                                        Xóa
                                    </div>
                                </div>
                                <button
                                    className={`border p-1 text-sm mt-3 ${
                                        item.default &&
                                        'visible cursor-not-allowed text-zinc-300'
                                    }`}
                                    onClick={() => setDefaultAddress(item)}
                                    disabled={item.default}
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
        </>
    );
}

ListAddress.propTypes = {
    reRenderAddress: PropTypes.func,
    handleModalUpdateAddress: PropTypes.func,
};

export default ListAddress;
