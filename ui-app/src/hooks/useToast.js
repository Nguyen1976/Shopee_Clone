import { useState } from 'react';

const useToast = (duration = 3000) => {
    const [toast, setToast] = useState('');

    const showToast = (message) => {
        setToast(message);
        
        setTimeout(() => {
            setToast('');
        }, duration);
    };

    return { toast, showToast, setToast };
};

export default useToast;
