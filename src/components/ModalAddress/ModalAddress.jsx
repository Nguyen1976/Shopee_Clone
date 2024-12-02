import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Modal from '~/components/Modal';

import InputForm from '~/components/InputForm';
import * as AddressService from '~/services/AddressService';
import Loading from '~/components/Loading';
import PropTypes from 'prop-types';
import AddressList from './AddressList';

function ModalAddress({
    setOpenModal,
    title,
    data,
    isCreateAddress,
    setLoadAddress,
}) {
    //isCreateAddress để xác định modal đang có chức năng create hay update

    //hendle show and hidden modal
    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const popupName = searchParams.get('popup');

    useEffect(() => {
        console.log(popupName);
        if (popupName === 'modal-address') {
            setOpenModal(true);
            return;
        }

        setOpenModal(false);
    }, [popupName, setOpenModal]);

    const handleCloseModal = () => {
        setOpenModal(false);
        navigate(-1);
    };
    //End hendle show and hidden modal

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const [city, setCity] = useState('');

    const [district, setDistrict] = useState('');

    const [commune, setCommune] = useState('');

    const [addressDetails, setAddressDetails] = useState('');

    const [idAddress, setIdAddress] = useState('');

    const [isLoadingCreateAddress, setIsLoadingCreateAddress] = useState(false);
    const [isErrorInput, setIsErrorInput] = useState(false);

    const [isShowListAddress, setIsShowListAddress] = useState(false);

    const [valueInputAddress, setValueInputAddress] = useState('');

    const userInfo = useSelector((state) => state.user);

    useEffect(() => {
        if (commune) setIsShowListAddress(false);
    }, [commune]);

    //Trường hợp khi là updateModal
    useEffect(() => {
        if (data) {
            setName(data.name);
            setCity(data.city);
            setCommune(data.commune);
            setPhone(data.phone);
            setAddressDetails(data.address);
            setIdAddress(data._id);
        }
    }, [data]);

    const updateInputAddress = useCallback(() => {
        setValueInputAddress(
            [city || '', district || '', commune || '']
                .filter(Boolean)
                .join(', ')
        );
        //filter(Boolean) sẽ loại bỏ những phần tử không có giá trị thật, chỉ giữ lại những phần tử có giá trị hợp lệ.
    }, [city, district, commune]);

    useEffect(() => {
        updateInputAddress();
    }, [updateInputAddress]);

    const resetModalAddress = () => {
        setIsErrorInput(false);
        setPhone('');
        setName('');
        setAddressDetails('');
        setValueInputAddress('');
        setIsLoadingCreateAddress(false);
        setLoadAddress((prev) => !prev);
    };

    const handleAddAdress = async () => {
        if (name && phone && valueInputAddress && addressDetails) {
            try {
                setIsLoadingCreateAddress(true);
                await AddressService.createAddress(userInfo?.id, {
                    name,
                    phone,
                    city,
                    district,
                    commune,
                    address: addressDetails,
                });
            } catch (error) {
                console.log(error);
                setIsErrorInput(true);
            } finally {
                resetModalAddress();
            }
        } else {
            setIsErrorInput(true);
        }
    };

    const handleUpdateAddress = async () => {
        if (name && phone && valueInputAddress && addressDetails) {
            try {
                setIsLoadingCreateAddress(true);
                await AddressService.updateAddress(idAddress, {
                    name,
                    phone,
                    city,
                    district,
                    commune,
                    address: addressDetails,
                });
            } catch (error) {
                console.log(error);
                setIsErrorInput(true);
            } finally {
                resetModalAddress();
            }
        } else {
            setIsErrorInput(true);
        }
    };

    const listAddressRef = useRef(null);

    const handleClickOutside = (event) => {
        // Kiểm tra nếu click nằm ngoài phần tử tham chiếu
        if (
            listAddressRef.current &&
            !listAddressRef.current.contains(event.target)
        ) {
            setIsShowListAddress(false);
        }
    };

    useEffect(() => {
        // Thêm lắng nghe sự kiện khi component được render
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Xóa lắng nghe sự kiện khi component bị unmount
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <Modal showModal={true}>
            <div className="p-4 h-[500px]">
                <div className="text-lg">{title}</div>
                <div className="flex justify-between gap-3 items-center mt-5">
                    <InputForm
                        onFocus={() => setIsErrorInput(false)}
                        isError={isErrorInput}
                        placeholder={'Họ và tên'}
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <InputForm
                        onFocus={() => setIsErrorInput(false)}
                        isError={isErrorInput}
                        placeholder={'Số điện thoại'}
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                    />
                </div>
                <div className="relative mt-5 z-10" ref={listAddressRef}>
                    <InputForm
                        isError={isErrorInput}
                        value={valueInputAddress || ''}
                        onFocus={() => {
                            setIsShowListAddress(true);
                            setIsErrorInput(false);
                            setValueInputAddress('');
                        }}
                        onChange={(e) => setValueInputAddress(e.target.value)}
                    />

                    {isShowListAddress && (
                        <AddressList
                            setCity={setCity}
                            setDistrict={setDistrict}
                            setCommune={setCommune}
                            setIsShowListAddress={setIsShowListAddress}
                        />
                    )}
                </div>
                <div className="mt-5">
                    <InputForm
                        onFocus={() => setIsErrorInput(false)}
                        isError={isErrorInput}
                        placeholder={'Địa chỉ cụ thể'}
                        onChange={(e) => setAddressDetails(e.target.value)}
                        value={addressDetails}
                    />
                </div>
                <div
                    className="flex
                    justify-end items-center text-sm mt-5"
                >
                    <button
                        type="button"
                        className="hover:bg-gray-100 hover:text-gray-900 py-2 px-12"
                        onClick={handleCloseModal}
                    >
                        Trở lại
                    </button>
                    <Loading isLoading={isLoadingCreateAddress}>
                        <button
                            className="py-2 px-10 bg-primary hover:bg-red-400 text-white"
                            onClick={
                                isCreateAddress
                                    ? handleAddAdress
                                    : handleUpdateAddress
                            }
                        >
                            Hoàn thành
                        </button>
                    </Loading>
                </div>
            </div>
        </Modal>
    );
}

ModalAddress.propTypes = {
    setOpenModal: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    data: PropTypes.object,
    isCreateAddress: PropTypes.bool.isRequired,
    setLoadAddress: PropTypes.func.isRequired,
};

export default React.memo(ModalAddress);
