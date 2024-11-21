import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import * as OrderService from '~/services/OrderService';

function PurchasePage() {
    const userInfo = useSelector(state => state.user)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await OrderService.getAllOrderDetails(userInfo?.id);
                console.log(res.data)
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, []);
    return <>PurchasePage</>;
}

export default PurchasePage;
