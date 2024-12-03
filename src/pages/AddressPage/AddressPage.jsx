import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalAddress from '~/components/ModalAddress';
import ListAddress from './ListAddress';

function AddressPage() {
    const [titleModal, setTitleModal] = useState('');
    const [dataUpdateAddress, setDataUpdateAddress] = useState({});
    const [isCreateAddressModal, setIsCreateAddressModal] = useState(false);

    const [reRenderAddress, setReRenderAddress] = useState(false);

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

    const handleModalCreateAddress = () => {
        setSearchParams({ popup: 'modal-address' });
        setOpenModal(true);
        setTitleModal('Thêm địa chỉ');
        setIsCreateAddressModal(true);
        setDataUpdateAddress({});
    };

    const handleModalUpdateAddress = (data) => {
        setSearchParams({ popup: 'modal-address' });
        setOpenModal(true);
        setTitleModal('Cập nhật địa chỉ');
        setIsCreateAddressModal(false);
        setDataUpdateAddress(data);
    };

    return (
        <>
            {openModal && (
                <ModalAddress
                    setOpenModal={setOpenModal}
                    title={titleModal}
                    data={dataUpdateAddress}
                    isCreateAddress={isCreateAddressModal}
                    setReRenderAddress={setReRenderAddress}
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
            <ListAddress
                reRenderAddress={reRenderAddress}
                setReRenderAddress={setReRenderAddress}
                handleModalUpdateAddress={handleModalUpdateAddress}
            />
        </>
    );
}

export default React.memo(AddressPage);
