import { useState } from 'react';

import { OrderContext } from './OrderContext';

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
