import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Modal from '~/components/Modal';
import InputForm from '~/components/InputForm';
import * as AddressService from '~/services/AddressService';
import * as UserService from '~/services/UserService';
import Loading from '~/components/Loading';

function HandleModalAddress({ showModal, setShowModal }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const [city, setCity] = useState('');
    const [cityCode, setCityCode] = useState('');

    const [district, setDistrict] = useState('');
    const [districtCode, setDistrictCode] = useState('');

    const [commune, setCommune] = useState('');
    const [communeCode, setCommuneCode] = useState('');

    const [addressDetails, setAddressDetails] = useState('');

    const [listAddress, setListAddress] = useState([]);

    const CITY_ACTIVE = 'CITY_ACTIVE';
    const DISTRICT_ACTIVE = 'DISTRICT_ACTIVE';
    const COMMUNE_ACTIVE = 'COMMUNE_ACTIVE';
    const [addressActive, setAddressActive] = useState(CITY_ACTIVE);

    const [isLoading, setIsLoading] = useState(false);
    const [isErrorInput, setIsErrorInput] = useState(false);

    const [isShowListAddress, setIsShowListAddress] = useState(false);

    const [valueInputAddress, setValueInputAddress] = useState('');

    const userInfo = useSelector((state) => state.user);

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

    const fetchAddress = useCallback(async () => {
        let res;
        if (addressActive === CITY_ACTIVE) {
            try {
                setIsLoading(true);
                res = await AddressService.getProvinces();
            } catch (error) {
                console.error('Error fetching province data:', error);
            } finally {
                setIsLoading(false);
            }
        } else if (addressActive === DISTRICT_ACTIVE && cityCode) {
            try {
                setIsLoading(true);
                res = await AddressService.getDistricts(cityCode);
            } catch (error) {
                console.error('Error fetching province data:', error);
            } finally {
                setIsLoading(false);
            }
        } else if (addressActive === COMMUNE_ACTIVE && districtCode) {
            try {
                setIsLoading(true);
                res = await AddressService.getWards(districtCode);
            } catch (error) {
                console.error('Error fetching province data:', error);
            } finally {
                setIsLoading(false);
            }
        }
        if (res) setListAddress(res);
    }, [addressActive, cityCode, districtCode]);

    const handleAddAdress = async () => {
        console.log(userInfo?.id);
        if (name && phone && valueInputAddress && addressDetails) {
            try {
                await UserService.createAddress(userInfo?.id, {
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
            }
        } else {
            setIsErrorInput(true);
        }
    };

    useEffect(() => {
        fetchAddress();
    }, [fetchAddress]);

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
            },
        };
        //Kiến thức về Dynamic Property Access(truy cập thuộc tính động)
        //Gọi hàm có tên là addressActive
        //VD: DISTRICT_ACTIVE có thể hiểu là 1 key, 1 đối tượng, 1 hàm của resetState
        resetState[addressActive]();
    };

    return (
        <Modal showModal={showModal}>
            <div className="p-4 h-[500px]">
                <div className="text-lg">Địa chỉ mới</div>
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
                <div className="relative z-50 mt-5">
                    <InputForm
                        isError={isErrorInput}
                        value={valueInputAddress}
                        onFocus={() => {
                            setIsShowListAddress(true);
                            setIsErrorInput(false);
                        }}
                        onChange={() => false} //
                    />

                    {isShowListAddress && (
                        <div className="absolute modal w-full top-12 bg-white shadow-lg z-30">
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
                            <Loading isLoading={isLoading}>
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
                    justify-end items-center text-sm"
                >
                    <button
                        type="button"
                        className="hover:bg-gray-100 hover:text-gray-900 py-2 px-12"
                        onClick={() => setShowModal(false)}
                    >
                        Trở lại
                    </button>
                    <button
                        className="py-2 px-10 bg-primary hover:bg-red-400 text-white"
                        onClick={handleAddAdress}
                    >
                        Hoàn thành
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default React.memo(HandleModalAddress);
