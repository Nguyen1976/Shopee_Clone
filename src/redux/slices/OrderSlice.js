import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orderItems: [],
    orderItemsSlected: [],
    shippingAddress: {},
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',
    isSucessOrder: false,
};

export const OrderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            const { orderItem } = action.payload;
            //Kiểm tra sản phẩm có trong giỏ hàng
            const itemOrder = state?.orderItems?.find(
                (item) => item?.product === orderItem.product
            );
            //Cập nhật số lượng sản phẩm nếu có trong đơn
            if (itemOrder) {
                if (itemOrder.amount <= itemOrder.countInstock) {
                    itemOrder.amount += orderItem?.amount;
                    state.isSucessOrder = true;
                    state.isErrorOrder = false;
                }
            } else {
                state.orderItems.push(orderItem);
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    addOrderProduct,
} = OrderSlice.actions;

export default OrderSlice.reducer;
