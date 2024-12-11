import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    image: {},
    coverImage: {},
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
            const { productItem } = action.payload;
            // Chỉ cập nhật các thuộc tính được cung cấp
            Object.entries(productItem).forEach(([key, value]) => {
                if (Object.prototype.hasOwnProperty.call(state, key)) {
                    state[key] = value;
                }
            });
        },
    },
});

export const { createProduct } = ProductSlice.actions;

export default ProductSlice.reducer;
