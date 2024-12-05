import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

import { addShippingAddress } from '~/redux/slices/OrderSlice';
import Modal from '~/components/Modal';
import { useSearchParams } from 'react-router-dom';
import ModalAddress from '~/components/ModalAddress';
import * as AddressService from '~/services/AddressService';

function AddressPayment({ userId, shippingAddress, setShippingAddress }) {
    //twoway binding input raido address
    const [selectAddress, setSelectAddress] = useState('option-0');

    //Nhận address khi select nhưng chưa nhấn Xác nhận (lưu trữ tạm thời)
    const [shippingAddressSelectedTemp, setShippingAddressSelectedTemp] =
        useState({});
    const [showModal, setShowModal] = useState(false);

    const [listAddress, setListAddress] = useState([]);
    const [reRenderAddress, setReRenderAddress] = useState(false);

    const dispatch = useDispatch();

    const handleSelectAddress = (e) => {
        setSelectAddress(e.target.value);
    };

    const handleSelectAddressDelivery = () => {
        setShippingAddress(shippingAddressSelectedTemp);
        dispatch(addShippingAddress({ shippingAddress }));
        setShowModal(false);
    };

    const fetchDataAddress = useCallback(async () => {
        try {
            if (userId) {
                const res = await AddressService.getAddress(userId);
                setListAddress(res.addresses || []); // Đảm bảo là mảng nếu không có dữ liệu
            }
        } catch (err) {
            console.error(err);
        }
    }, [userId]);

    useEffect(() => {
        fetchDataAddress();
    }, [fetchDataAddress, reRenderAddress]);

    // handle show or hidden modalAddress
    const [searchParams, setSearchParams] = useSearchParams();
    const [openModal, setOpenModal] = useState(false);

    const popupName = searchParams.get('popup');

    useEffect(() => {
        if (popupName === 'modal-address') {
            setOpenModal(true);
            return;
        }

        setOpenModal(false);
    }, [popupName]);
    //End handle show or hidden modalAddress

    const openModalAddAddress = () => {
        setSearchParams({ popup: 'modal-address' });
        setOpenModal(true);
    };

    return (
        <div>
            <Modal showModal={showModal}>
                {openModal && (
                    <ModalAddress
                        setOpenModal={setOpenModal}
                        setReRenderAddress={setReRenderAddress}
                        isCreateAddress={true}
                        title={'Thêm địa chỉ'}
                        width={500}
                        height={600}
                    />
                )}
                <div className="p-4 h-[600px] w-[500px]">
                    <h3 className="text-lg m-2 border-b-[1px] pb-2">
                        Địa Chỉ Của Tôi
                    </h3>
                    <ul className="mt-2 overflow-y-scroll no-scrollbar h-4/5">
                        {listAddress.map((item, index) => (
                            <li
                                className="border-b pb-5 mb-5 flex gap-3"
                                key={index}
                            >
                                <input
                                    className="custom-outline mt-2"
                                    type="radio"
                                    checked={
                                        selectAddress === `option-${index}`
                                    }
                                    value={`option-${index}`}
                                    onChange={handleSelectAddress}
                                    onClick={() =>
                                        setShippingAddressSelectedTemp(item)
                                    }
                                />
                                <div className="">
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
                                    {item.default && (
                                        <button className="bg-transparent border-primary border-1 text-primary text-sm px-1 mt-1">
                                            Mặc định
                                        </button>
                                    )}
                                </div>
                            </li>
                        ))}
                        <button
                            className="py-2 px-12 mb-2 border-zinc-300 border-1"
                            onClick={openModalAddAddress}
                        >
                            Thêm Địa Chỉ Mới
                        </button>
                    </ul>
                    <div className="border-t-[1px] border-zinc-300">
                        <div className="pt-4 flex justify-end items-center gap-3">
                            <button
                                className="py-2 px-12 border-zinc-300 border-1"
                                onClick={() => setShowModal(false)}
                            >
                                Hủy
                            </button>
                            <button
                                className="py-2 px-8 text-white bg-primary"
                                onClick={() => handleSelectAddressDelivery()}
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
            <div className="container-custom mt-4">
                <div className="border-payment"></div>
                <div className="bg-white p-6">
                    <div className="text-primary text-lg flex items-center gap-3">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <div>Địa Chỉ Nhận Hàng</div>
                    </div>
                    <div className="mt-3 flex gap-4">
                        <span className="font-semibold">
                            {shippingAddress.name} {shippingAddress.phone}
                        </span>
                        <span>{shippingAddress.address}</span>
                        <span
                            className="text-blue-600 cursor-pointer"
                            onClick={() => setShowModal(true)}
                        >
                            Thay Đổi
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

AddressPayment.propTypes = {
    shippingAddress: PropTypes.object,
    setShippingAddress: PropTypes.func,
    userId: PropTypes.String,
};

export default AddressPayment;
