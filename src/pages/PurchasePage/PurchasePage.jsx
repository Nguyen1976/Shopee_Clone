import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import * as OrderService from '~/services/OrderService';

function PurchasePage() {
    const userInfo = useSelector((state) => state.user);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await OrderService.getAllOrderDetails(userInfo?.id);
                console.log(res.data);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, [userInfo?.id]);

    return (
        <div className="">
            <ul className="flex justify-between items-center border-b-[1px] pb-2">
                <li className="hover:text-primary">Tất cả</li>
                <li className="hover:text-primary">Chờ thanh toán</li>
                <li className="hover:text-primary">Vận chuyển</li>
                <li className="hover:text-primary">Chờ giao hàng</li>
                <li className="hover:text-primary">Hoàn thành</li>
            </ul>
        </div>
    );
}

export default PurchasePage;
