import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loading from '~/components/Loading';
import config from '~/configs';

import * as OrderService from '~/services/OrderService';
import PurchaseItem from './components/PurchaseItem';
import PurchaseSuccess from './components/PurchaseSuccess';
import PurchaseCanceled from './components/PurchaseCanceled';

function PurchasePage() {
    const [listOrdered, setListOrdered] = useState([]);
    const [typeNumber, setTypeNumber] = useState(1);
    const [isloading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState('');

    const userInfo = useSelector((state) => state.user);

    const navigate = useNavigate();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type');

    useEffect(() => {
        setUserId(userInfo?.id);
    }, [userInfo]);

    useEffect(() => {
        setTypeNumber(parseInt(type));
    }, [type]);

    useEffect(() => {
        navigate(`${config.routes.purchase}/?type=1`);
    }, [navigate]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                if (userId) {
                    const res = await OrderService.getAllOrderDetails(userId);
                    setListOrdered(res.data);
                }
            } catch (error) {
                console.error('fetchData order', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [userId]);

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
                        className={`cursor-pointer hover:text-primary
                            ${page.type === typeNumber && 'text-primary'}`}
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
                    {listOrdered.map((item, index) => {
                        if (item.isPaid && !item.canceled) {
                            if (item.isDelivered) {
                                return (
                                    <li key={index}>
                                        <PurchaseSuccess item={item} />
                                    </li>
                                );
                            } else {
                                return (
                                    <li key={index}>
                                        <PurchaseItem item={item} />
                                    </li>
                                );
                            }
                        } else if (!item.isDelivered && !item.canceled) {
                            return (
                                <li key={index}>
                                    <PurchaseItem item={item} />
                                </li>
                            );
                        } else {
                            return (
                                <li key={index}>
                                    <PurchaseCanceled item={item} />
                                </li>
                            );
                        }
                    })}
                </ul>
            )}
            {typeNumber === 2 && (
                <ul>
                    {listOrdered.map((item, index) => {
                        if (item.isPaid) {
                            return (
                                <li key={index}>
                                    <PurchaseItem item={item} />
                                </li>
                            );
                        }
                    })}
                </ul>
            )}
            {typeNumber === 3 && (
                <ul>
                    {listOrdered.map((item, index) => {
                        if (!item.isDelivery && !item.canceled) {
                            return (
                                <li key={index}>
                                    <PurchaseItem item={item} />
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
                                <li key={index}>
                                    <PurchaseCanceled item={item} />
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
                                <li key={index}>
                                    <PurchaseSuccess item={item} />
                                </li>
                            );
                        }
                    })}
                </ul>
            )}
        </Loading>
    );
}

export default React.memo(PurchasePage);
