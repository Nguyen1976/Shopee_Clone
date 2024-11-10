import { useDispatch, useSelector } from 'react-redux';

import ProductItem from './components/ProductItem';
import React, { useEffect, useState } from 'react';
import {
    removeAllOrderItemsSelected,
    selectedAllOrder,
} from '~/redux/slices/OrderSlice';

function OrderPage() {
    const order = useSelector((state) => state.order);

    const [checked, setChecked] = useState(false);

    const dispatch = useDispatch();

    const [listOrderProduct, setlistOrderProduct] = useState([]);

    useEffect(() => {
        setlistOrderProduct(order.orderItems);
    }, [order.orderItems]);

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
        console.log(order.orderItemsSelected);
    }, [order.orderItemsSelected]);

    return (
        <div className="bg-[#f5f5f5] h-screen">
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
                    <div className="bg-white mt-5 rounded-sm">
                        <ul>
                            {listOrderProduct.map((item, index) => (
                                <ProductItem
                                    item={item}
                                    key={index}
                                    checkedAll={checked}
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
                        Tổng thanh toán(0 Sản phẩm):{' '}
                        <span className="text-primary text-lg">đ0</span>
                    </div>
                    <button className="py-2 px-16 bg-primary text-white">
                        Mua hàng
                    </button>
                </div>
            </div>
        </div>
    );
}

export default React.memo(OrderPage);
