import PropTypes from 'prop-types';
import React from 'react';

import { formater } from '~/utils/formater';
import * as OrderService from '~/services/OrderService';

function PurchaseItem({ item }) {
    const handleCancelOrder = async () => {
        try {
            const res = await OrderService.cancelOrder(
                item.user,
                item.orderItems,
                item._id
            );
            console.log(res);
        } catch (err) {
            console.error('Failed to cancel order:', err);
        }
    };

    return (
        <div className="mt-10 bg-[#f7f7f7] px-2 py-4">
            <div className="text-primary text-end">
                {item.isPaid ? 'ĐÃ THANH TOÁN' : 'CHƯA THANH TOÁN'}
            </div>
            {item.orderItems.map((orderItem, index) => (
                <div className="flex my-2 py-2" key={`${index}-order-item`}>
                    <img
                        src={orderItem.image}
                        alt=""
                        className="object-cover h-20"
                    />
                    <div className="flex flex-1 justify-between">
                        <div className="ml-5">
                            <p>{orderItem.name}</p>
                            <p>x{orderItem.amount}</p>
                        </div>
                        <div className="mr-5">{formater(orderItem.price)}</div>
                    </div>
                </div>
            ))}
            <div className="p-2">
                <div className="text-end">
                    <span>Thành tiền: </span>
                    <span className="text-xl font-medium text-primary">
                        {formater(item.totalPrice)}
                    </span>
                </div>
                <div className="text-end mt-2">
                    <button
                        className="bg-primary text-white px-12 py-2 rounded-sm mr-2"
                        onClick={() => handleCancelOrder()}
                    >
                        Hủy đơn hàng
                    </button>
                    <button className="px-4 py-2 rounded-sm border-[1px]">
                        Liên hệ người bán
                    </button>
                </div>
            </div>
        </div>
    );
}

PurchaseItem.propTypes = {
    item: PropTypes.shape({
        user: PropTypes.string,
        _id: PropTypes.string,
        isPaid: PropTypes.bool,
        orderItems: PropTypes.arrayOf(
            PropTypes.shape({
                image: PropTypes.string,
                name: PropTypes.string,
                amount: PropTypes.number,
                price: PropTypes.number,
            })
        ),
        totalPrice: PropTypes.number,
    }).isRequired,
};

export default React.memo(PurchaseItem);
