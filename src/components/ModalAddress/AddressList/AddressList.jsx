import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Loading from '~/components/Loading';
import * as AddressService from '~/services/AddressService';

function AddressList({
    setCity,
    setDistrict,
    setCommune,
    setIsShowListAddress,
}) {
    const [cityCode, setCityCode] = useState('');
    const [districtCode, setDistrictCode] = useState('');
    const [communeCode, setCommuneCode] = useState('');

    const CITY_ACTIVE = 'CITY_ACTIVE';
    const DISTRICT_ACTIVE = 'DISTRICT_ACTIVE';
    const COMMUNE_ACTIVE = 'COMMUNE_ACTIVE';
    const [addressActive, setAddressActive] = useState(CITY_ACTIVE);

    const [listAddress, setListAddress] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log(cityCode, districtCode, communeCode);
    }, [cityCode, districtCode, communeCode]);

    const fetchAddress = useCallback(async () => {
        let res;
        const fetcher = {
            [CITY_ACTIVE]: AddressService.getProvinces,
            [DISTRICT_ACTIVE]: () =>
                cityCode && AddressService.getDistricts(cityCode),
            [COMMUNE_ACTIVE]: () =>
                districtCode && AddressService.getWards(districtCode),
        };

        const fetchFunction = fetcher[addressActive];
        if (!fetchFunction) return;

        try {
            setIsLoading(true);
            res = await fetchFunction();
        } catch (error) {
            console.error('Error fetching address data:', error);
        } finally {
            setIsLoading(false);
        }

        if (res) setListAddress(res);
    }, [addressActive, cityCode, districtCode]);

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
        <div
            className="absolute modal top-12 w-full bg-white shadow-lg"
            onBlur={() => setIsShowListAddress(false)}
        >
            <div className="flex items-center w-full gap-9 justify-center">
                <div
                    className={`p-2 cursor-pointer ${
                        addressActive === CITY_ACTIVE ? 'text-primary' : ''
                    }`}
                    onClick={() => {
                        setAddressActive(CITY_ACTIVE);
                    }}
                >
                    Tỉnh/Thành Phố
                </div>
                <div
                    className={`p-2 cursor-pointer ${
                        addressActive === DISTRICT_ACTIVE ? 'text-primary' : ''
                    }`}
                    onClick={() =>
                        cityCode && setAddressActive(DISTRICT_ACTIVE)
                    }
                >
                    Quận/Huyện
                </div>
                <div
                    className={`p-2 cursor-pointer ${
                        addressActive === COMMUNE_ACTIVE ? 'text-primary' : ''
                    }`}
                    onClick={() =>
                        districtCode && setAddressActive(COMMUNE_ACTIVE)
                    }
                >
                    Phường/Xã
                </div>
            </div>
            <div className="h-[1px] w-full bg-zinc-300 relative overflow-hidden">
                <div
                    className={`absolute transition duration-500 top-0 ease-in-out transform h-[1px] w-36 bg-primary ${
                        addressActive === DISTRICT_ACTIVE
                            ? 'translate-x-[150px]'
                            : ''
                    } ${
                        addressActive === COMMUNE_ACTIVE
                            ? 'translate-x-[300px]'
                            : ''
                    }`}
                ></div>
            </div>
            <Loading isLoading={isLoading}>
                <ul className="h-72 w-full overflow-y-scroll scrollbar">
                    {listAddress.map((item, index) => (
                        <li
                            key={index}
                            className={`
                            p-2 hover:bg-zinc-200
                            ${
                                (addressActive === CITY_ACTIVE &&
                                    cityCode === item.code) ||
                                (addressActive === DISTRICT_ACTIVE &&
                                    districtCode === item.code) ||
                                (addressActive === COMMUNE_ACTIVE &&
                                    communeCode === item.code)
                                    ? 'text-primary'
                                    : ''
                            }
                            `}
                            onClick={() => handleClickAddress(item)}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            </Loading>
        </div>
    );
}

AddressList.propTypes = {
    setCity: PropTypes.func.isRequired,
    setDistrict: PropTypes.func.isRequired,
    setCommune: PropTypes.func.isRequired,
    setIsShowListAddress: PropTypes.func.isRequired,
};

export default AddressList;
