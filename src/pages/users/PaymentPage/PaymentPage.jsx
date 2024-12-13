import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import config from '~/configs';
import images from '~/assets/images';
import TopHeader from '~/components/Header/TopHeader';
import { useOrder } from '~/context';
import Loading from '~/components/Loading';
import AddressPayment from './components/AddressPayment';
import ListProductPayment from './components/ListProductPayment';
import TotalItems from './components/TotalItems';
import HandlePayment from './components/HandlePayment';

function PaymentPage() {
    const [userId, setUserId] = useState('');
    const [totalItems, setTotalItems] = useState(0);
    const [deliveryPrice, setDeliveryPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [listProductOrder, setListProductOrder] = useState([]);
    const [shippingAddress, setShippingAddress] = useState({});

    const [isLoading, setIsLoading] = useState(false);

    const order = useSelector((state) => state.order);
    const userInfo = useSelector((state) => state.user);

    const navigate = useNavigate();

    const { isOrderConfirmed } = useOrder(); //Khi chưa đi qua trang order thì k thể truy cập payment
    useEffect(() => {
        if (!isOrderConfirmed) {
            navigate(config.routes.order);
        }
    }, [isOrderConfirmed, navigate]);

    useEffect(() => {
        setUserId(userInfo?.id);
    }, [userInfo]);

    useEffect(() => {
        setListProductOrder(order?.orderItemsSelected);
        setTotalItems(order?.itemsPrice);
        setDeliveryPrice(order?.shippingPrice);
        setTotalPrice(order?.totalPrice);
        setShippingAddress(order?.shippingAddress);
    }, [order]);

    return (
        <Loading isLoading={isLoading}>
            <div className="bg-[#f5f5f5] border-b-2 border-primary pb-5">
                <div className="bg-header py-2">
                    <div className="container-custom">
                        <TopHeader />
                    </div>
                </div>
                <div className="text-primary flex justify-items-start items-center container-custom h-20 py-5 gap-5 bg-white">
                    <Link to={config.routes.home} className="h-full">
                        <img
                            className="object-cover h-full"
                            src={images.logoColor}
                            alt=""
                        />
                    </Link>
                    <div className="mt-[9px] text-lg before:h-7 before:absolute before:w-[2px] before:bg-primary before:-left-3 relative">
                        Thanh toán
                    </div>
                </div>

                <AddressPayment
                    userId={userId}
                    shippingAddress={shippingAddress}
                    setShippingAddress={setShippingAddress}
                />
                <div className="container-custom mt-4">
                    <div className="bg-white">
                        <ListProductPayment
                            listProductOrder={listProductOrder}
                        />
                        <TotalItems totalItems={totalItems} />
                    </div>
                </div>
                <HandlePayment
                    setIsLoading={setIsLoading}
                    deliveryPrice={deliveryPrice}
                    totalPrice={totalPrice}
                    totalItems={totalItems}
                    listProductOrder={listProductOrder}
                    shippingAddress={shippingAddress}
                    userId={userId}
                />
            </div>
        </Loading>
    );
}

export default React.memo(PaymentPage);
