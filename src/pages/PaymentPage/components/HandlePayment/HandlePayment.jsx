import React, { useEffect, useState } from 'react';
import * as OrderService from '~/services/OrderService';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

import { formater } from '~/utils/formater';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useToast } from '~/context';
import config from '~/configs';
import images from '~/assets/images';
import * as PaymentService from '~/services/PaymentService';

function HandlePayment({
    setIsLoading,
    deliveryPrice,
    totalPrice,
    totalItems,
    listProductOrder,
    shippingAddress,
    userId,
}) {
    const [clientID, setClientID] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('later_money');

    const navigate = useNavigate();

    const { addToast } = useToast();

    const handleChangeOptionPayment = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handlePayment = async () => {
        try {
            setIsLoading(true);

            // Tạo đơn hàng
            const createOrderPromise = OrderService.createOrder({
                orderItems: listProductOrder,
                paymentMethod,
                itemsPrice: totalItems,
                shippingPrice: deliveryPrice,
                totalPrice,
                shippingAddress,
                user: userId,
                isPaid: paymentMethod === 'paypal',
                paidAt: new Date(),
            });

            // Chờ các thao tác liên quan (nếu có thêm dispatch từ Redux)
            await createOrderPromise;

            // Chuyển hướng khi mọi thứ đã hoàn tất
            navigate(config.routes.purchase);
        } catch (err) {
            console.error(err);
            addToast('Thanh toán không thành công', 'error');
        } finally {
            setIsLoading(false);
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

    return (
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
                                    checked={'later_money' === paymentMethod}
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
                            <span>{formater(totalItems)}</span>
                        </div>
                        <div className="flex justify-between mt-5">
                            <span className="text-sm text-zinc-500">
                                Tổng tiền phí vận chuyển
                            </span>
                            <span>{formater(deliveryPrice)}</span>
                        </div>
                        <div className="flex justify-between mt-5 items-center">
                            <span className="text-sm text-zinc-500">
                                Tổng thanh toán
                            </span>
                            <span className="text-2xl text-primary">
                                {formater(totalPrice)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t-[1px] border-zinc-300 bg-[#fffefb] p-6 flex items-center justify-between">
                <div className="text-sm text-zinc-500">
                    <p>
                        Nhấn &quot;Đặt hàng&quot; đồng nghĩa với việc bạn đồng ý
                        tuân theo
                    </p>
                    <Link className="text-blue-600 text-md ml-2" to={'/'}>
                        Điều khoản Shoppe
                    </Link>
                </div>
                {paymentMethod === 'later_money' ? (
                    <button
                        className="py-2 px-16 bg-primary text-white"
                        onClick={() => {
                            handlePayment();
                        }}
                    >
                        Đặt hàng
                    </button>
                ) : (
                    <PayPalScriptProvider options={{ 'client-id': clientID }}>
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
    );
}

HandlePayment.propTypes = {
    setIsLoading: PropTypes.func.isRequired,
    deliveryPrice: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
    listProductOrder: PropTypes.array.isRequired,
    shippingAddress: PropTypes.object.isRequired,
    userId: PropTypes.number.isRequired,
    totalItems: PropTypes.number.isRequired,
};

export default React.memo(HandlePayment);
