import { useState } from 'react';
import { ToastContext } from './ToastContext';
import ListToast from '~/components/ToastMessage/ListToast';

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
        setToasts(prevToasts => prevToasts.filter((toast) => toast.id !== id))
    }
    return (
        <ToastContext.Provider value={{ toasts, addToast, closeToast }}>
            <ListToast />
            {children}
        </ToastContext.Provider>
    );
};
