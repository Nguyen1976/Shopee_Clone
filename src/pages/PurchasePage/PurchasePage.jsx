import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loading from '~/components/Loading';
import config from '~/configs';

import * as OrderService from '~/services/OrderService';
import { formater } from '~/utils/formater';

function PurchasePage() {
    const [listOrdered, setListOrdered] = useState([]);
    const [typeNumber, setTypeNumber] = useState(1);
    const [isloading, setIsLoading] = useState(false);

    const userInfo = useSelector((state) => state.user);

    const navigate = useNavigate();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type');

    useEffect(() => {
        setTypeNumber(parseInt(type));
    }, [type]);

    useEffect(() => {
        navigate(`${config.routes.purchase}/?type=1`);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const res = await OrderService.getAllOrderDetails(userInfo?.id);
                console.log(res.data);
                setListOrdered(res.data);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [userInfo?.id]);

    const pages = [
        { type: 1, text: 'Tất cả' },
        { type: 2, text: 'Đã thanh toán' },
        { type: 3, text: 'Chờ vận chuyển' },
        { type: 4, text: 'Đã hủy' },
        { type: 5, text: 'Hoàn thành' },
    ];

    return (
        <Loading isLoadin={isloading}>
            <ul className="flex justify-around items-center pb-2">
                {pages.map((page, index) => (
                    <Link
                        to={`${config.routes.purchase}/?type=${page.type}`}
                        key={index}
                        className={`cursor-pointer hover:text-primary`}
                    >
                        {page.text}
                    </Link>
                ))}
            </ul>
            <div className="h-[1px] w-full bg-zinc-200 relative">
                <div
                    className={`absolute h-[1px] w-1/6 bg-primary transition-all duration-200 transform
                            ${typeNumber === 1 ? 'translate-x-1' : ''}
                            ${typeNumber === 2 ? 'translate-x-[109%]' : ''}
                            ${typeNumber === 3 ? 'translate-x-[240%]' : ''}
                            ${typeNumber === 4 ? 'translate-x-[363%]' : ''}
                            ${typeNumber === 5 ? 'translate-x-[490%]' : ''}
                        `}
                ></div>
            </div>
            {typeNumber === 1 && (
                <ul>
                    {listOrdered.map((item, index) => (
                        <li className="mt-10 border-[1px] p-2" key={index}>
                            <div className="text-primary text-end">
                                {item.isPaid
                                    ? 'ĐÃ THANH TOÁN'
                                    : 'CHƯA THANH TOÁN'}
                            </div>
                            {item.orderItems.map((orderItem, index) => (
                                <div
                                    className="flex my-2 py-2"
                                    key={`${index}-order-item`}
                                >
                                    <img
                                        src={orderItem.image}
                                        alt=""
                                        className="object-cover h-20"
                                    />
                                    <div className="flex flex-1 justify-between">
                                        <div className="ml-5">
                                            <p>{orderItem.name}</p>
                                            <p>x{orderItem.amount}</p>
                                        </div>
                                        <div className="mr-5">
                                            {formater(orderItem.price)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="bg-[#fffefb] p-2">
                                <div className="text-end">
                                    <span>Thành tiền: </span>
                                    <span className="text-xl font-medium text-primary">
                                        {formater(item.totalPrice)}
                                    </span>
                                </div>
                                <div className="text-end mt-2">
                                    <button className="bg-primary text-white px-12 py-2 rounded-sm mr-2">
                                        Mua lại
                                    </button>
                                    <button className="px-4 py-2 rounded-sm border-[1px]">
                                        Liên hệ người bán
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {typeNumber === 2 && (
                <ul>
                    {listOrdered.map((item, index) => {
                        if (item.isPaid) {
                            return (
                                <li
                                    className="mt-10 border-[1px] p-2"
                                    key={index}
                                >
                                    <div className="text-primary text-end">
                                        {item.isPaid
                                            ? 'ĐÃ THANH TOÁN'
                                            : 'CHƯA THANH TOÁN'}
                                    </div>
                                    {item.orderItems.map((orderItem, index) => (
                                        <div
                                            className="flex my-2 py-2"
                                            key={`${index}-order-item`}
                                        >
                                            <img
                                                src={orderItem.image}
                                                alt=""
                                                className="object-cover h-20"
                                            />
                                            <div className="flex flex-1 justify-between">
                                                <div className="ml-5">
                                                    <p>{orderItem.name}</p>
                                                    <p>x{orderItem.amount}</p>
                                                </div>
                                                <div className="mr-5">
                                                    {formater(orderItem.price)}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="bg-[#fffefb] p-2">
                                        <div className="text-end">
                                            <span>Thành tiền: </span>
                                            <span className="text-xl font-medium text-primary">
                                                {formater(item.totalPrice)}
                                            </span>
                                        </div>
                                        <div className="text-end mt-2">
                                            <button className="bg-primary text-white px-12 py-2 rounded-sm mr-2">
                                                Mua lại
                                            </button>
                                            <button className="px-4 py-2 rounded-sm border-[1px]">
                                                Liên hệ người bán
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            );
                        }
                    })}
                </ul>
            )}
            {typeNumber === 3 && (
                <ul>
                    {listOrdered.map((item, index) => {
                        if (!item.isDelivery) {
                            return (
                                <li
                                    className="mt-10 border-[1px] p-2"
                                    key={index}
                                >
                                    <div className="text-primary text-end">
                                        {item.isPaid
                                            ? 'ĐÃ THANH TOÁN'
                                            : 'CHƯA THANH TOÁN'}
                                    </div>
                                    {item.orderItems.map((orderItem, index) => (
                                        <div
                                            className="flex my-2 py-2"
                                            key={`${index}-order-item`}
                                        >
                                            <img
                                                src={orderItem.image}
                                                alt=""
                                                className="object-cover h-20"
                                            />
                                            <div className="flex flex-1 justify-between">
                                                <div className="ml-5">
                                                    <p>{orderItem.name}</p>
                                                    <p>x{orderItem.amount}</p>
                                                </div>
                                                <div className="mr-5">
                                                    {formater(orderItem.price)}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="bg-[#fffefb] p-2">
                                        <div className="text-end">
                                            <span>Thành tiền: </span>
                                            <span className="text-xl font-medium text-primary">
                                                {formater(item.totalPrice)}
                                            </span>
                                        </div>
                                        <div className="text-end mt-2">
                                            <button className="bg-primary text-white px-12 py-2 rounded-sm mr-2">
                                                Mua lại
                                            </button>
                                            <button className="px-4 py-2 rounded-sm border-[1px]">
                                                Liên hệ người bán
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            );
                        }
                    })}
                </ul>
            )}
            {typeNumber === 4 && (
                <ul>
                    {listOrdered.map((item, index) => {
                        if (!item.isDelivery) {
                            return (
                                <li
                                    className="mt-10 border-[1px] p-2"
                                    key={index}
                                >
                                    <div className="text-primary text-end">
                                        {item.isPaid
                                            ? 'ĐÃ THANH TOÁN'
                                            : 'CHƯA THANH TOÁN'}
                                    </div>
                                    {item.orderItems.map((orderItem, index) => (
                                        <div
                                            className="flex my-2 py-2"
                                            key={`${index}-order-item`}
                                        >
                                            <img
                                                src={orderItem.image}
                                                alt=""
                                                className="object-cover h-20"
                                            />
                                            <div className="flex flex-1 justify-between">
                                                <div className="ml-5">
                                                    <p>{orderItem.name}</p>
                                                    <p>x{orderItem.amount}</p>
                                                </div>
                                                <div className="mr-5">
                                                    {formater(orderItem.price)}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="bg-[#fffefb] p-2">
                                        <div className="text-end">
                                            <span>Thành tiền: </span>
                                            <span className="text-xl font-medium text-primary">
                                                {formater(item.totalPrice)}
                                            </span>
                                        </div>
                                        <div className="text-end mt-2">
                                            <button className="bg-primary text-white px-12 py-2 rounded-sm mr-2">
                                                Mua lại
                                            </button>
                                            <button className="px-4 py-2 rounded-sm border-[1px]">
                                                Liên hệ người bán
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            );
                        }
                    })}
                </ul>
            )}
            {typeNumber === 5 && (
                <ul>
                    {listOrdered.map((item, index) => {
                        if (item.isDelivered && item.isPaid) {
                            return (
                                <li
                                    className="mt-10 border-[1px] p-2"
                                    key={index}
                                >
                                    <div className="text-primary text-end">
                                        HOÀN THÀNH
                                    </div>
                                    {item.orderItems.map((orderItem, index) => (
                                        <div
                                            className="flex my-2 py-2"
                                            key={`${index}-order-item`}
                                        >
                                            <img
                                                src={orderItem.image}
                                                alt=""
                                                className="object-cover h-20"
                                            />
                                            <div className="flex flex-1 justify-between">
                                                <div className="ml-5">
                                                    <p>{orderItem.name}</p>
                                                    <p>x{orderItem.amount}</p>
                                                </div>
                                                <div className="mr-5">
                                                    {formater(orderItem.price)}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="bg-[#fffefb] p-2">
                                        <div className="text-end">
                                            <span>Thành tiền: </span>
                                            <span className="text-xl font-medium text-primary">
                                                {formater(item.totalPrice)}
                                            </span>
                                        </div>
                                        <div className="text-end mt-2">
                                            <button className="bg-primary text-white px-12 py-2 rounded-sm mr-2">
                                                Mua lại
                                            </button>
                                            <button className="px-4 py-2 rounded-sm border-[1px]">
                                                Liên hệ người bán
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            );
                        }
                    })}
                </ul>
            )}
        </Loading>
    );
}

export default PurchasePage;
