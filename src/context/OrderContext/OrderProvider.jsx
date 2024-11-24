import { useState } from 'react';
import PropTypes from 'prop-types';

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

OrderProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
