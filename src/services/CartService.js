import axios from "axios"

export const getProductToCart = async (userId) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/cart`, {
        params: { userId }
    });
    return res.data;
};

export const addProductToCart = async (userId, productId, quantity, price) => {
    try {
        const response = await axios.post('http://localhost:3001/api/cart/add', {
            userId,         // Truyền userId vào body
            productId,      // Truyền productId vào body
            quantity,       // Truyền quantity vào body
            price           // Truyền price vào body
        });
        
        console.log('Product added to cart:', response.data);
    } catch (error) {
        console.error('Error adding product to cart:', error.response ? error.response.data : error.message);
    }
};
