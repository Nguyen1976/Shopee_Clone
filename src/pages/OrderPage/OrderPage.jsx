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
import useToast from '~/hooks/useToast';
import ToastMessage from '~/components/ToastMessage';
import { formatter } from '~/utils/formater';
import * as AddressService from '~/services/AddressService';
import { useOrder } from '~/context/OrderContext';

function OrderPage() {
    const [listOrderProduct, setlistOrderProduct] = useState([]);
    const [listProductSelect, setlistProductSelect] = useState([]);
    const [checked, setChecked] = useState(false);
    const [userId, setUserId] = useState('');
    const [shippingAddress, setShippingAddress] = useState({});

    const { setIsOrderConfirmed } = useOrder();

    const order = useSelector((state) => state.order);
    const userInfo = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { toast, showToast, setToast } = useToast(3000);

    useEffect(() => {
        setlistOrderProduct(order.orderItems);
    }, [order.orderItems]);

    useEffect(() => {
        setUserId(userInfo.id);
    }, [userInfo]);

    useEffect(() => {
        if (checked) {
            if (Array.isArray(listOrderProduct)) {
                dispatch(
                    selectedAllOrder({
                        listChecked: listOrderProduct.map(
                            (item) => item.product
                        ),
                    })
                );
            }
        } else {
            dispatch(removeAllOrderItemsSelected());
        }
    }, [checked, listOrderProduct, dispatch]);

    useEffect(() => {
        setlistProductSelect(order.orderItemsSelected);
    }, [order.orderItemsSelected]);

    const itemsPrice = useMemo(() => {
        return listProductSelect.reduce(
            (acc, item) => acc + item.price * item.amount,
            0
        );
    }, [listProductSelect]);

    const shippingPrice = useMemo(() => {
        if (itemsPrice > 200000) {
            return 10000;
        } else if (itemsPrice === 0) {
            return 0;
        } else {
            return 20000;
        }
    }, [itemsPrice]);

    const totalPrice = useMemo(() => {
        return itemsPrice + shippingPrice;
    }, [itemsPrice, shippingPrice]);

    const getAddressDefault = useCallback(async () => {
        if (userId) {
            const address = await AddressService.getAddressDefault(userId);
            setShippingAddress(address);
        }
    }, [userId]);

    useEffect(() => {
        getAddressDefault();
    }, [getAddressDefault]);

    const handleBuy = () => {
        if (listProductSelect.length && shippingAddress) {
            navigate(config.routes.payment);
            setIsOrderConfirmed(true);
            dispatch(setItemsPrice({ itemsPrice }));
            dispatch(setTotalPrice({ totalPrice }));
            dispatch(setShippingPrice({ shippingPrice }));
            console.log(shippingAddress);
            dispatch(addShippingAddress({ shippingAddress }));
        } else {
            showToast('Hãy chọn sản phẩm cần mua');
        }
    };

    return (
        <div className="bg-[#f5f5f5] h-full">
            {toast && (
                <ToastMessage message={toast} onClose={() => setToast('')} />
            )}
            <div className="container-custom">
                <div className="">
                    <div className="bg-white rounded-sm p-3 text-zinc-600 flex justify-between">
                        <div className="flex items-center gap-2">
                            <input
                                className="rounded-sm "
                                type="checkbox"
                                checked={checked}
                                onChange={(e) => setChecked(e.target.checked)}
                            />
                            <span className=" text-md">Sản phẩm</span>
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
                            {listOrderProduct.map((item, index) => (
                                <ProductItem
                                    item={item}
                                    key={index}
                                    checkedAll={checked}
                                    setCheckAll={setChecked}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="w-4/5 bg-white flex justify-between items-center m-auto fixed bottom-0 left-0 right-0 py-5 px-2">
                <div className="flex items-center gap-2">
                    <input
                        className="rounded-sm"
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => setChecked(e.target.checked)}
                    />
                    <span>Chọn tất cả({listOrderProduct.length})</span>
                </div>
                <div>Xóa</div>
                <div>Bỏ sản phẩm không hoạt động</div>
                <div className="text-primary">Lưu vào mục đã thanh toán</div>
                <div className="flex items-center gap-3">
                    <div>
                        Tổng thanh toán({listProductSelect.length} Sản phẩm):{' '}
                        <span className="text-primary text-lg">
                            {formatter(itemsPrice)}
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
