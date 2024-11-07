import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

function OrderPage() {
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="bg-[#f5f5f5] h-screen">
            <div className="container-custom">
                <div>Giỏ hàng</div>
                <div className="">
                    <div className="bg-white rounded-sm p-3 text-zinc-600 flex justify-between">
                        <div className="flex items-center gap-2">
                            <input className="rounded-sm " type="checkbox" />
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
                            <li className="p-3 border-b-2 flex items-center justify-between">
                                <div className="flex items-center gap-3 w-1/2">
                                    <input
                                        className="rounded-sm "
                                        type="checkbox"
                                    />
                                    <img
                                        src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lh5z7qyktvjnd3@resize_w80_nl.webp"
                                        alt=""
                                    />
                                    <div>Giày cầu lông Yonex nữ</div>
                                </div>
                                <div className="flex justify-between flex-1 mr-4">
                                    <div>đ599.000</div>
                                    <div className="h-9 w-32 border-1 rounded-sm border-zinc-300 text-zinc-300 text-center px-1 ml-5">
                                        <button
                                            className="h-full pr-1 mr-1"
                                            onClick={() => {
                                                setQuantity((prev) =>
                                                    prev === 1
                                                        ? prev
                                                        : (prev -= 1)
                                                );
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faMinus} />
                                        </button>
                                        <input
                                            className="h-full w-3/5 text-center border-zinc-300 border-x-2 border-y-0 select-none"
                                            type="number"
                                            disabled
                                            value={quantity}
                                        />
                                        <button
                                            className="h-full pl-1 ml-1"
                                            onClick={() => {
                                                setQuantity(
                                                    (prev) => (prev += 1)
                                                );
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </div>
                                    <div className="text-primary">đ599.000</div>
                                    <div>
                                        <FontAwesomeIcon
                                            className="text-primary"
                                            icon={faTrash}
                                        />
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
                <div className="w-4/5 bg-white flex justify-between items-center m-auto fixed bottom-0 left-0 right-0 py-5 px-2">
                    <div className="flex items-center gap-2">
                        <input className="rounded-sm" type="checkbox" />
                        <span>Chọn tất cả(29)</span>
                    </div>
                    <div>Xóa</div>
                    <div>Bỏ sản phẩm không hoạt động</div>
                    <div className="text-primary">
                        Lưu vào mục đã thanh toán
                    </div>
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

export default OrderPage;
