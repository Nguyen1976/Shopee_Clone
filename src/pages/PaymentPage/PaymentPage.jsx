import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

import { formater } from '~/utils/formater';
import config from '~/configs';
import images from '~/assets/images';
import TopHeader from '~/components/Header/TopHeader';
import * as OrderService from '~/services/OrderService';
import * as PaymentService from '~/services/PaymentService';
import Modal from '~/components/Modal';
import * as AddressService from '~/services/AddressService';
import { addShippingAddress } from '~/redux/slices/OrderSlice';
import { useOrder, useToast } from '~/context';
import Loading from '~/components/Loading';

function PaymentPage() {
    const [userId, setUserId] = useState('');
    const [totalItems, setTotalItems] = useState(0);
    const [deliveryPrice, setDeliveryPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [listProductOrder, setListProductOrder] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('later_money');
    const [clientID, setClientID] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [listAddress, setListAddress] = useState([]);
    const [shippingAddress, setShippingAddress] = useState({});

    const [isLoading, setIsLoading] = useState(false);

    const order = useSelector((state) => state.order);
    const userInfo = useSelector((state) => state.user);

    const { addToast } = useToast();

    //Nhận address khi select nhưng chưa nhấn Xác nhận (lưu trữ tạm thời)
    const [shippingAddressSelectedTemp, setShippingAddressSelectedTemp] =
        useState({});

    const dispatch = useDispatch();

    const navigate = useNavigate();

    //twoway binding input raido address
    const [selectAddress, setSelectAddress] = useState('option-0');

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

    const handlePayment = async () => {
        try {
            setIsLoading(true);
            await OrderService.createOrder({
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
            navigate(config.routes.purchase);
        } catch (err) {
            console.error(err);
            addToast('Thanh toán không thành công', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchDataAddress = useCallback(async () => {
        try {
            if (userId) {
                const res = await AddressService.getAddress(userId);
                setListAddress(res || []); // Đảm bảo là mảng nếu không có dữ liệu
            }
        } catch (err) {
            console.error(err);
        }
    }, [userId]);

    useEffect(() => {
        fetchDataAddress();
    }, [fetchDataAddress]);

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

    const handleSelectAddress = (e) => {
        setSelectAddress(e.target.value);
    };
    const handleSelectAddressDelivery = () => {
        setShippingAddress(shippingAddressSelectedTemp);
        dispatch(addShippingAddress({ shippingAddress }));
        setShowModal(false);
    };

    return (
        <Loading isLoading={isLoading}>
            <div className="bg-[#f5f5f5] border-b-2 border-primary pb-5">
                <Modal showModal={showModal}>
                    <div className="p-4 h-[600px] w-[500px]">
                        <h3 className="text-lg m-2 border-b-[1px] pb-2">
                            Địa Chỉ Của Tôi
                        </h3>
                        <ul className="mt-2 overflow-y-scroll no-scrollbar h-4/5">
                            {listAddress
                                .sort((a, b) => b.default - a.default)
                                .map((item, index) => (
                                    <li
                                        className="border-b pb-5 mb-5 flex gap-3"
                                        key={index}
                                    >
                                        <input
                                            className="custom-outline mt-2"
                                            type="radio"
                                            checked={
                                                selectAddress ===
                                                `option-${index}`
                                            }
                                            value={`option-${index}`}
                                            onChange={handleSelectAddress}
                                            onClick={() =>
                                                setShippingAddressSelectedTemp(
                                                    item
                                                )
                                            }
                                        />
                                        <div className="">
                                            <div>
                                                {item.name} |{' '}
                                                <span className="text-zinc-500 text-sm">
                                                    {item.phone}
                                                </span>
                                            </div>
                                            <div className="text-zinc-500 text-sm mt-1">
                                                {item.address}
                                            </div>
                                            <div className="text-zinc-500 text-sm mt-1">
                                                {item.commune +
                                                    ', ' +
                                                    item.district +
                                                    ', ' +
                                                    item.city}
                                            </div>
                                            {item.default && (
                                                <button className="bg-transparent border-primary border-1 text-primary text-sm px-1 mt-1">
                                                    Mặc định
                                                </button>
                                            )}
                                        </div>
                                    </li>
                                ))}
                        </ul>
                        <div className="border-t-[1px] border-zinc-300">
                            <div className="pt-4 flex justify-end items-center gap-3">
                                <button
                                    className="py-2 px-12 border-zinc-300 border-1"
                                    onClick={() => setShowModal(false)}
                                >
                                    Hủy
                                </button>
                                <button
                                    className="py-2 px-8 text-white bg-primary"
                                    onClick={() =>
                                        handleSelectAddressDelivery()
                                    }
                                >
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>
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
                                {shippingAddress.name} {shippingAddress.phone}
                            </span>
                            <span>{shippingAddress.address}</span>
                            <span
                                className="text-blue-600 cursor-pointer"
                                onClick={() => setShowModal(true)}
                            >
                                Thay Đổi
                            </span>
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
                                            <div>{formater(item.price)}</div>
                                            <div>{item.amount}</div>
                                            <div>
                                                {formater(
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
                                    {formater(totalItems)}
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
                                Nhấn &quot;Đặt hàng&quot; đồng nghĩa với việc
                                bạn đồng ý tuân theo
                            </p>
                            <Link
                                className="text-blue-600 text-md ml-2"
                                to={'/'}
                            >
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
        </Loading>
    );
}

export default React.memo(PaymentPage);
