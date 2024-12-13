import React, { useEffect, useState } from 'react';
import Loading from '~/components/Loading';

import * as OrderService from '~/services/OrderService';
import OrderItem from './components/OrderItem';

function OrderAdminPage() {
    const [listOrder, setListOrder] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const featchData = async () => {
        try {
            setIsLoading(true);
            const res = await OrderService.getAllOrder();
            setListOrder(res.data);
            console.log(res.data);
        } catch (err) {
            console.error('Failed to fetch data:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        featchData();
    }, []);
    return (
        <div>
            <Loading isLoading={isLoading}>
                <ul>
                    {listOrder.map((item, index) => (
                        <li key={index} className="mt-5">
                            <OrderItem data={item} />
                        </li>
                    ))}
                </ul>
            </Loading>
        </div>
    );
}

export default React.memo(OrderAdminPage);
