import React from 'react';

import { useToast } from '~/context';
import ToastItem from './component/ToastItem';

//status : { error, success }
function ListToast() {
    const { toasts } = useToast();
    

    return (
        <div className='z-50 fixed top-10 right-5'>
            {toasts.map((toast) => (
                <ToastItem
                    key={toast.id}
                    status={toast.status}
                    message={toast.message}
                    id={toast.id}
                />
            ))}
        </div>
    );
}

export default React.memo(ListToast);
