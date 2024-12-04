import { createContext, useContext } from 'react';
import { useState } from 'react';

import ListToast from '~/components/ToastMessage/ListToast';
import PropTypes from 'prop-types';

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    const addToast = (message, status) => {
        const id = new Date().getTime();
        setToasts((prevToasts) => [...prevToasts, { id, message, status }]);
        setTimeout(() => {
            setToasts((prevToasts) =>
                prevToasts.filter((toast) => toast.id !== id)
            ); //sau 3s lọc bỏ toast cũ
        }, 5000);
    };

    const closeToast = (id) => {
        setToasts((prevToasts) =>
            prevToasts.filter((toast) => toast.id !== id)
        );
    };
    return (
        <ToastContext.Provider value={{ toasts, addToast, closeToast }}>
            <ListToast />
            {children}
        </ToastContext.Provider>
    );
};

ToastProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useToast = () => useContext(ToastContext);
