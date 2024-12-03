import PropTypes from 'prop-types';
import React from 'react';
import { formater } from '~/utils/formater';

function ListProductPayment({ listProductOrder }) {
    return (
        <>
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
                                <div>{formater(item.price * item.amount)}</div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

ListProductPayment.propTypes = {
    listProductOrder: PropTypes.array,
};

export default React.memo(ListProductPayment);
