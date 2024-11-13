import React, { useCallback, useEffect, useRef, useState } from 'react';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '~/components/Modal';
import InputForm from '~/components/InputForm';
import * as AddressService from '~/services/AddressService';
import Loading from '~/components/Loading';

function AddressPage() {
    const [showModal, setShowModal] = useState(true);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const [city, setCity] = useState('');
    const [cityCode, setCityCode] = useState('');
    const [district, setDistrict] = useState('');
    const [districtCode, setDistrictCode] = useState('');
    const [commune, setCommune] = useState('');
    const [communeCode, setCommuneCode] = useState('');
    const [listAddress, setListAddress] = useState([]);
    const [valueInputAddress, setValueInputAddress] = useState('');
    const [isShowListAddress, setIsShowListAddress] = useState(false);

    const CITY_ACTIVE = 'CITY_ACTIVE';
    const DISTRICT_ACTIVE = 'DISTRICT_ACTIVE';
    const COMMUNE_ACTIVE = 'COMMUNE_ACTIVE';
    const [addressActive, setAddressActive] = useState(CITY_ACTIVE);

    const fetchAddress = useCallback(async () => {
        let res;
        if (addressActive === CITY_ACTIVE) {
            res = await AddressService.getProvinces();
        } else if (addressActive === DISTRICT_ACTIVE && cityCode) {
            res = await AddressService.getDistricts(cityCode);
        } else if (addressActive === COMMUNE_ACTIVE && districtCode) {
            res = await AddressService.getWards(districtCode);
        }
        if (res) setListAddress(res);
    }, [addressActive, cityCode, districtCode]);

    useEffect(() => {
        fetchAddress();
    }, [fetchAddress]);

    useEffect(() => {
        if (commune) setIsShowListAddress(false);
    }, [commune]);

    const updateInputAddress = useCallback(() => {
        setValueInputAddress(
            [city, district, commune].filter(Boolean).join(', ')
        );
        //filter(Boolean) sẽ loại bỏ những phần tử không có giá trị thật, chỉ giữ lại những phần tử có giá trị hợp lệ.
    }, [city, district, commune]);

    useEffect(() => {
        updateInputAddress();
    }, [updateInputAddress]);

    const handleClickAddress = (item) => {
        // Định nghĩa các trường cần reset dựa trên addressActive
        const resetState = {
            CITY_ACTIVE: () => {
                setCity(item.name);
                setCityCode(item.code);
                setDistrict('');
                setDistrictCode('');
                setCommune('');
                setCommuneCode('');
                setAddressActive(DISTRICT_ACTIVE);
            },
            DISTRICT_ACTIVE: () => {
                setDistrict(item.name);
                setDistrictCode(item.code);
                setCommune('');
                setCommuneCode('');
                setAddressActive(COMMUNE_ACTIVE);
            },
            COMMUNE_ACTIVE: () => {
                setCommune(item.name);
                setCommuneCode(item.code);
            }
        };
        //Kiến thức về Dynamic Property Access(truy cập thuộc tính động)
        //Gọi hàm có tên là addressActive
        //VD: DISTRICT_ACTIVE có thể hiểu là 1 key, 1 đối tượng, 1 hàm của resetState
        resetState[addressActive]();
    };

    return (
        <div>
            <Modal showModal={showModal}>
                <div className="p-4">
                    <div className="text-lg">Địa chỉ mới</div>
                    <div className="flex justify-between gap-3 items-center">
                        <InputForm
                            placeholder={'Họ và tên'}
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                        <InputForm placeholder={'Số điện thoại'} />
                    </div>
                    <div className="relative mt-5">
                        <InputForm
                            value={valueInputAddress}
                            onFocus={() => {
                                setIsShowListAddress(true);
                            }}
                        />
                        {isShowListAddress && (
                            <div className="absolute w-full top-12 bg-white shadow-lg z-50">
                                <div className="flex items-center w-full gap-9 justify-center">
                                    <div
                                        className={`p-2 cursor-pointer ${
                                            addressActive === CITY_ACTIVE
                                                ? 'text-primary'
                                                : ''
                                        }`}
                                        onClick={() => {
                                            setAddressActive(CITY_ACTIVE);
                                        }}
                                    >
                                        Tỉnh/Thành Phố
                                    </div>
                                    <div
                                        className={`p-2 cursor-pointer ${
                                            addressActive === DISTRICT_ACTIVE
                                                ? 'text-primary'
                                                : ''
                                        }`}
                                        onClick={() =>
                                            setAddressActive(DISTRICT_ACTIVE)
                                        }
                                    >
                                        Quận/Huyện
                                    </div>
                                    <div
                                        className={`p-2 cursor-pointer ${
                                            addressActive === COMMUNE_ACTIVE
                                                ? 'text-primary'
                                                : ''
                                        }`}
                                        onClick={() =>
                                            setAddressActive(COMMUNE_ACTIVE)
                                        }
                                    >
                                        Phường/Xã
                                    </div>
                                </div>
                                <div className="h-[1px] w-full bg-zinc-300 relative">
                                    <div
                                        className={`absolute transition duration-500 top-0 ease-in-out transform h-[1px] w-1/3 bg-primary ${
                                            addressActive === DISTRICT_ACTIVE
                                                ? 'translate-x-40'
                                                : ''
                                        } ${
                                            addressActive === COMMUNE_ACTIVE
                                                ? 'translate-x-[300px]'
                                                : ''
                                        }`}
                                    ></div>
                                </div>
                                <Loading>
                                    <ul className="h-72 w-full overflow-y-scroll">
                                        {listAddress.map((item, index) => (
                                            <li
                                                key={index}
                                                className={`
                                                    p-2 hover:bg-zinc-200
                                                    ${
                                                        (addressActive ===
                                                            CITY_ACTIVE &&
                                                            cityCode ===
                                                                item.code) ||
                                                        (addressActive ===
                                                            DISTRICT_ACTIVE &&
                                                            districtCode ===
                                                                item.code) ||
                                                        (addressActive ===
                                                            COMMUNE_ACTIVE &&
                                                            communeCode ===
                                                                item.code)
                                                            ? 'text-primary'
                                                            : ''
                                                    }
                                                    `}
                                                onClick={() =>
                                                    handleClickAddress(item)
                                                }
                                            >
                                                {item.name}
                                            </li>
                                        ))}
                                    </ul>
                                </Loading>
                            </div>
                        )}
                    </div>
                    <div>
                        <InputForm placeholder={'Địa chỉ cụ thể'} />
                    </div>
                    <div>
                        <button
                            type="button"
                            className="hover:bg-gray-200 hover:text-gray-900"
                            onClick={() => setShowModal(false)}
                        >
                            Trở lại
                        </button>
                    </div>
                </div>
            </Modal>
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
                <li
                    className="flex
                    justify-between items-center
                    border-b pb-5 mb-5"
                >
                    <div>
                        <div>
                            Nguyễn Nguyên |{' '}
                            <span className="text-zinc-500 text-sm">
                                (+84) 985520084
                            </span>
                        </div>
                        <div className="text-zinc-500 text-sm mt-1">
                            Xóm trại thông thành vật
                        </div>
                        <div className="text-zinc-500 text-sm mt-1">
                            Xã Đồng Tiến, Huyện Ứng Hòa, Hà Nội
                        </div>
                    </div>
                    <div className="text-end">
                        <div className="text-sm text-blue-600">Cập nhật</div>
                        <button className="border p-1 text-sm mt-3">
                            Thiết lập mặc định
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default React.memo(AddressPage);
