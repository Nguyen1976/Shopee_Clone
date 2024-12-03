import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ProductItem from './components/ProductItem';
import {
    removeAllOrderItemsSelected,
    selectedAllOrder,
    setItemsPrice,
    setShippingPrice,
    setTotalPrice,
    addShippingAddress,
} from '~/redux/slices/OrderSlice';
import config from '~/configs';

import { formater } from '~/utils/formater';
import * as AddressService from '~/services/AddressService';
import { useOrder, useToast } from '~/context';

function OrderPage() {
    const [checked, setChecked] = useState(false);

    const { setIsOrderConfirmed } = useOrder();
    const { addToast } = useToast();

    const order = useSelector((state) => state.order);
    const userInfo = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { orderItems, orderItemsSelected } = order;
    const { id: userId } = userInfo;

    useEffect(() => {
        if (checked && orderItems.length) {
            dispatch(
                selectedAllOrder({
                    listChecked: orderItems.map((item) => item.product),
                })
            );
        } else {
            dispatch(removeAllOrderItemsSelected());
        }
    }, [checked, orderItems, dispatch]);

    const itemsPrice = useMemo(
        () =>
            orderItemsSelected.reduce(
                (acc, item) => acc + item.price * item.amount,
                0
            ),
        [orderItemsSelected]
    );

    const shippingPrice = useMemo(() => {
        if (itemsPrice > 200000) return 10000;
        return itemsPrice === 0 ? 0 : 20000;
    }, [itemsPrice]);

    const totalPrice = useMemo(
        () => itemsPrice + shippingPrice,
        [itemsPrice, shippingPrice]
    );

    const getAddressDefault = useCallback(async () => {
        try {
            if (userId) {
                const address = await AddressService.getAddressDefault(userId);
                return address;
            }
        } catch (error) {
            console.error('Error fetching address default:', error);
            return null;
        }
    }, [userId]);

    const handleBuy = async () => {
        const address = await getAddressDefault();

        if (orderItemsSelected.length && address) {
            setIsOrderConfirmed(true);
            dispatch(setItemsPrice({ itemsPrice }));
            dispatch(setTotalPrice({ totalPrice }));
            dispatch(setShippingPrice({ shippingPrice }));
            dispatch(addShippingAddress({ shippingAddress: address }));
            navigate(config.routes.payment);
        } else {
            addToast('Hãy chọn sản phẩm cần mua', 'warning');
        }
    };

    return (
        <div className="bg-[#f5f5f5] h-full">
            <div className="container-custom">
                <div className="bg-white rounded-sm p-3 text-zinc-600 flex justify-between">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            className="rounded-sm"
                            checked={checked}
                            onChange={(e) => setChecked(e.target.checked)}
                        />
                        <span className="text-md">Sản phẩm</span>
                    </div>
                    <div className="flex gap-32">
                        <div>Đơn giá</div>
                        <div>Số lượng</div>
                        <div>Số tiền</div>
                        <div>Thao tác</div>
                    </div>
                </div>
                <div className="bg-white mt-5 rounded-sm pb-16">
                    <ul>
                        {orderItems.map((item, index) => (
                            <ProductItem
                                key={index}
                                item={item}
                                checkedAll={checked}
                                setCheckAll={setChecked}
                            />
                        ))}
                    </ul>
                </div>
            </div>
            <div className="fixed bottom-0 left-0 right-0 bg-white w-4/5 m-auto flex justify-between items-center py-5 px-2">
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        className="rounded-sm"
                        checked={checked}
                        onChange={(e) => setChecked(e.target.checked)}
                    />
                    <span>Chọn tất cả ({orderItems.length})</span>
                </div>
                <div>Xóa</div>
                <div>Bỏ sản phẩm không hoạt động</div>
                <div className="text-primary">Lưu vào mục đã thanh toán</div>
                <div className="flex items-center gap-3">
                    <div>
                        Tổng thanh toán ({orderItemsSelected.length} sản phẩm):{' '}
                        <span className="text-primary text-lg">
                            {formater(itemsPrice)}
                        </span>
                    </div>
                    <button
                        className="py-2 px-16 bg-primary text-white"
                        onClick={handleBuy}
                    >
                        Mua hàng
                    </button>
                </div>
            </div>
        </div>
    );
}

export default React.memo(OrderPage);
