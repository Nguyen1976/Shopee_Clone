import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

function ToastMessage({ isError, message }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);

        // Tự động ẩn toast sau 3 giây
        const id = setTimeout(() => {
            setVisible(false);
        }, 3000);

        return () => clearTimeout(id);
    }, []);

    const handleClose = () => {
        setVisible(false);
    };

    if (!visible) return null; //component sẽ trả về null
    return (
        <>
            {!isError ? (
                <div className="fixed top-10 right-5 z-50 animate-toast-message">
                    <div
                        className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
                        role="alert"
                    >
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                            <FontAwesomeIcon icon={faCircleCheck} />
                            <span className="sr-only">Check icon</span>
                        </div>
                        <div className="ms-3 text-sm font-normal">
                            {message}
                        </div>
                        <button
                            type="button"
                            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                            onClick={handleClose}
                            aria-label="Close"
                        >
                            <span className="sr-only">Close</span>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="fixed top-10 right-5 z-50 animate-toast-message">
                    <div
                        className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
                        role="alert"
                    >
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                            <FontAwesomeIcon icon={faXmark} />
                            <span className="sr-only">Check icon</span>
                        </div>
                        <div className="ms-3 text-sm font-normal">
                            {message}
                        </div>
                        <button
                            type="button"
                            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                            onClick={handleClose}
                            aria-label="Close"
                        >
                            <span className="sr-only">Close</span>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

ToastMessage.propTypes = {
    message: PropTypes.string.isRequired,
};

export default React.memo(ToastMessage);
