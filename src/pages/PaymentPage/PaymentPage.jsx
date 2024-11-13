import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

import { formatter } from '~/utils/formater';
import config from '~/configs';
import images from '~/assets/images';
import TopHeader from '~/components/Header/TopHeader';
import * as OrderService from '~/services/OrderService';
import * as PaymentService from '~/services/PaymentService';

function PaymentPage() {
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [totalItems, setTotalItems] = useState(0);
    const [deliveryPrice, setDeliveryPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [listProductOrder, setListProductOrder] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('later_money');
    const [clientID, setClientID] = useState('');
    const [isPaid, setIsPaid] = useState(false);
    const fullName = 'Nguyen';
    const city = 'Hanoi';
    const order = useSelector((state) => state.order);
    const userInfo = useSelector((state) => state.user);

    useEffect(() => {
        setName(userInfo?.name);
        setPhone(userInfo?.phone);
        setAddress(userInfo?.address);
        setEmail(userInfo?.email);
        setUserId(userInfo?.id);
    }, [userInfo]);

    useEffect(() => {
        setListProductOrder(order?.orderItemsSelected);
        setTotalItems(order?.itemsPrice);
        setDeliveryPrice(order?.shippingPrice);
        setTotalPrice(order?.totalPrice);
    }, [order]);

    const handlePayment = async () => {
        try {
            const res = await OrderService.createOrder({
                orderItems: listProductOrder,
                paymentMethod,
                itemsPrice: totalItems,
                shippingPrice: deliveryPrice,
                totalPrice,
                fullName,
                address,
                phone,
                city,
                email,
                user: userId,
                isPaid,
                paidAt: new Date(),
            });
            console.log(res);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const getConfig = async () => {
            const { data } = await PaymentService.getConfig();
            if (data) {
                setClientID(data);
            }
        };
        getConfig();
    }, []);

    const handleChangeOptionPayment = (e) => {
        setPaymentMethod(e.target.value);
    };

    return (
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
            <div className="container-custom mt-4">
                <div className="border-payment"></div>
                <div className="bg-white p-6">
                    <div className="text-primary text-lg flex items-center gap-3">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <div>Địa Chỉ Nhận Hàng</div>
                    </div>
                    <div className="mt-3 flex gap-4">
                        <span className="font-semibold">
                            {name} {phone}
                        </span>
                        <span>{address}</span>
                        <span className="text-blue-600">Thay Đổi</span>
                    </div>
                </div>
            </div>
            <div className="container-custom mt-4">
                <div className="bg-white">
                    <div className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="text-lg">Sản phẩm</div>
                            <div className="flex items-center gap-20 text-zinc-500">
                                <span>Đơn giá</span>
                                <span>Số lượng</span>
                                <span>Thành tiền</span>
                            </div>
                        </div>
                        <ul>
                            {listProductOrder?.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex gap-3 items-center h-10 justify-between mt-4"
                                >
                                    <div className="h-full flex items-center gap-4">
                                        <img
                                            className="object-cover h-full"
                                            src={item.image}
                                            alt=""
                                        />
                                        <div>{item.name}</div>
                                    </div>
                                    <div className="flex gap-28">
                                        <div>{formatter(item.price)}</div>
                                        <div>{item.amount}</div>
                                        <div>
                                            {formatter(
                                                item.price * item.amount
                                            )}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="border-t-[1px] border-zinc-300 mt-5">
                        <div className="p-6 flex justify-end gap-3">
                            <span>Tồng số tiền (các sản phẩm) : </span>
                            <span className="text-primary text-lg">
                                {formatter(totalItems)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-custom mt-4">
                <div className="bg-white py-2">
                    <div className="p-6">
                        <div className="font-normal text-lg">
                            Phương thức thanh toán
                        </div>
                        <div className="flex items-center gap-20">
                            <div>
                                <label className="flex h-14 items-center gap-3 mt-4">
                                    <input
                                        type="radio"
                                        value="later_money"
                                        checked={
                                            'later_money' === paymentMethod
                                        }
                                        onChange={handleChangeOptionPayment}
                                    />
                                    <img
                                        className="h-full object-cover"
                                        src={images.laterMoney}
                                        alt="laterMoney"
                                    />
                                    <span>Thanh toán khi nhận hàng</span>
                                </label>
                            </div>
                            <div>
                                <label className="flex h-14 items-center gap-3 mt-4">
                                    <input
                                        type="radio"
                                        value="paypal"
                                        checked={'paypal' === paymentMethod}
                                        onChange={handleChangeOptionPayment}
                                    />
                                    <img
                                        className="h-full object-cover"
                                        src={images.paypal}
                                        alt="paypal"
                                    />
                                    <span>Thanh toán với PayPal</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t-[1px] border-zinc-300 bg-[#fffefb]">
                    <div className="grid grid-cols-4 p-6">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div>
                            <div className="flex justify-between">
                                <span className="text-sm text-zinc-500">
                                    Tổng tiền hàng
                                </span>
                                <span>{formatter(totalItems)}</span>
                            </div>
                            <div className="flex justify-between mt-5">
                                <span className="text-sm text-zinc-500">
                                    Tổng tiền phí vận chuyển
                                </span>
                                <span>{formatter(deliveryPrice)}</span>
                            </div>
                            <div className="flex justify-between mt-5 items-center">
                                <span className="text-sm text-zinc-500">
                                    Tổng thanh toán
                                </span>
                                <span className="text-2xl text-primary">
                                    {formatter(totalPrice)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t-[1px] border-zinc-300 bg-[#fffefb] p-6 flex items-center justify-between">
                    <div className="text-sm text-zinc-500">
                        Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo
                        <Link className="text-blue-600 text-md ml-2" to={'/'}>
                            Điều khoản Shoppe
                        </Link>
                    </div>
                    {paymentMethod === 'later_money' ? (
                        <button
                            className="py-2 px-16 bg-primary text-white"
                            onClick={handlePayment}
                        >
                            Đặt hàng
                        </button>
                    ) : (
                        <PayPalScriptProvider
                            options={{ 'client-id': clientID }}
                        >
                            <PayPalButtons
                                style={{
                                    layout: 'vertical',
                                    color: 'blue',
                                    shape: 'pill',
                                    label: 'pay',
                                }}
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [
                                            {
                                                amount: {
                                                    value: totalPrice, // Giá trị thanh toán
                                                    currency_code: 'USD',
                                                },
                                            },
                                        ],
                                    });
                                }}
                                // Xử lý khi thanh toán thành công
                                onApprove={() => {
                                    setIsPaid(true)
                                    handlePayment();
                                }}
                                // Xử lý khi có lỗi
                                onError={(err) => {
                                    console.error(
                                        'Error during PayPal transaction:',
                                        err
                                    );
                                    // setError(
                                    //     'An error occurred during the transaction.'
                                    // );
                                }}
                            />
                        </PayPalScriptProvider>
                    )}
                </div>
            </div>
        </div>
    );
}

export default React.memo(PaymentPage);
