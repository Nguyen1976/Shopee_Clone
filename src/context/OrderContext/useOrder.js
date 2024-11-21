import { useContext } from 'react';

import { OrderContext } from './OrderContext';

// Hook để sử dụng Context
export const useOrder = () => {
    return useContext(OrderContext);
};
