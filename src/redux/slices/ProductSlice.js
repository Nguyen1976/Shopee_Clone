import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    type: '',
    price: 0,
    countInStock: 0,
    rating: 0,
    description: '',
    discount: 0,
    selled: 0,
};

export const ProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        createProduct: (state, action) => {
            const productItem = action.payload;

            // Kiểm tra productItem trước khi xử lý
            if (productItem && typeof productItem === 'object') {
                Object.entries(productItem).forEach(([key, value]) => {
                    // Chỉ cập nhật nếu thuộc tính tồn tại trong state
                    if (Object.prototype.hasOwnProperty.call(state, key)) {
                        state[key] = value;
                    }
                });
            } else {
                console.error('Invalid productItem:', productItem);
            }
        },
    },
});

export const { createProduct } = ProductSlice.actions;

export default ProductSlice.reducer;
