import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import * as UserService from '~/services/UserService';
import Image from '~/components/Image';
import { formater, formatTime } from '~/utils/formater';

function OrderItem({ data }) {
    const [userOrder, setUserOrder] = useState({});

    useEffect(() => {
        const fetchDataUser = async () => {
            const res = await UserService.getDetailsUser(data.user);
            setUserOrder(res.data);
        };
        fetchDataUser();
    }, [data.user]);

    return (
        <div className="border-1 rounded-md">
            <div className="flex items-center gap-3 text-zinc-500 bg-zinc-100 px-4">
                <div className="flex py-1 gap-2">
                    <div className="rounded-full h-7 w-7 overflow-hidden">
                        <Image src={userOrder.avatar} alt="avatar-user" />
                    </div>
                    <span>{userOrder.name}</span>
                </div>
                <div>|</div>
                <div className="flex items-center gap-2">
                    Mã đơn hàng:
                    <span className="underline">{data._id}</span>
                </div>
            </div>
            <div className="flex p-4">
                <ul>
                    {data.orderItems.map((item, index) => (
                        <li key={index} className="flex gap-5">
                            <div className="flex gap-2">
                                <div className="w-14">
                                    <Image
                                        src={item.image}
                                        alt={index}
                                        className="w-14"
                                    />
                                </div>
                                <span>
                                    <p>{item.name}</p>
                                    <p>x{item.amount}</p>
                                </span>
                            </div>
                            <div>
                                <span className="text-sm text-zinc-500">
                                    <p>Doanh thu dự kiến</p>
                                    <p className="text-md font-semibold">
                                        {formater(data.totalPrice)}
                                    </p>
                                </span>
                            </div>
                            <div>
                                <span>Trạng thái</span>
                                <div className="text-zinc-500">
                                    {data.canceled
                                        ? 'Đã hủy'
                                        : data.isDelivered
                                          ? 'Giao hàng thành công'
                                          : 'Đang giao hàng'}
                                </div>
                            </div>
                            <div>
                                <span>Thời gian đặt hàng</span>
                                <div className="text-zinc-500">
                                    {formatTime(data.createdAt)}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

OrderItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default React.memo(OrderItem);
