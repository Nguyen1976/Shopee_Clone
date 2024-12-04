import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

    return (
        <OrderContext.Provider
            value={{ isOrderConfirmed, setIsOrderConfirmed }}
        >
            {children}
        </OrderContext.Provider>
    );
};

OrderProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useOrder = () => {
    return useContext(OrderContext);
};
