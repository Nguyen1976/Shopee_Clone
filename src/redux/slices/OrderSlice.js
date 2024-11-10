import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orderItems: [],
    orderItemsSelected: [],
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
        increaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state?.orderItems?.find(
                (item) => item?.product === idProduct
            );
            const itemOrderSelected = state?.orderItemsSlected?.find(
                (item) => item?.product === idProduct
            );
            itemOrder.amount++;
            if (itemOrderSelected) {
                itemOrderSelected.amount++;
            }
        },
        decreaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state?.orderItems?.find(
                (item) => item?.product === idProduct
            );
            const itemOrderSelected = state?.orderItemsSlected?.find(
                (item) => item?.product === idProduct
            );
            itemOrder.amount--;
            if (itemOrderSelected) {
                itemOrderSelected.amount--;
            }
        },
        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload;
            // Kiểm tra `orderItems` và `orderItemsSelected` có phải là mảng trước khi gọi `.filter()`
            state.orderItems = Array.isArray(state.orderItems)
                ? state.orderItems.filter((item) => item?.product !== idProduct)
                : [];
            state.orderItemsSelected = Array.isArray(state.orderItemsSelected)
                ? state.orderItemsSelected.filter(
                      (item) => item?.product !== idProduct
                  )
                : [];
        },

        selectedAllOrder: (state, action) => {
            const { listChecked } = action.payload;

            // Kiểm tra xem listChecked có phải là mảng không
            if (Array.isArray(listChecked)) {
                state.orderItemsSelected = state.orderItems.filter((order) =>
                    listChecked.includes(order.product)
                );
            } else {
                // Nếu không phải mảng, gán mảng rỗng
                state.orderItemsSelected = [];
                console.error(
                    'listChecked is not an array or is undefined:',
                    listChecked
                );
            }
        },

        selectedOrder: (state, action) => {
            const { idProduct } = action.payload;
            const productToAdd = state.orderItems.find(
                (item) => item.product === idProduct
            );

            if (Array.isArray(state.orderItemsSelected)) {
                if (
                    !state.orderItemsSelected.some(
                        (item) => item.product === idProduct
                    )
                ) {
                    state.orderItemsSelected.push(productToAdd);
                }
            }
        },

        removeOrderProductSelected: (state, action) => {
            const { idProduct } = action.payload;

            // Kiểm tra xem orderItemsSelected có phải là mảng không trước khi gọi filter
            if (Array.isArray(state.orderItemsSelected)) {
                state.orderItemsSelected = state.orderItemsSelected.filter(
                    (item) => item.product !== idProduct
                );
            }
        },
        removeAllOrderItemsSelected: (state) => {
            // Kiểm tra xem orderItemsSelected có phải là mảng không
            if (Array.isArray(state.orderItemsSelected)) {
                state.orderItemsSelected = [];
            }
        },
    },
});

export const {
    addOrderProduct,
    decreaseAmount,
    removeOrderProduct,
    increaseAmount,
    selectedAllOrder,
    removeOrderProductSelected,
    selectedOrder,
    removeAllOrderItemsSelected,
} = OrderSlice.actions;

export default OrderSlice.reducer;
