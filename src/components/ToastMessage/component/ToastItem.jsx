import {
    faCircleCheck,
    faTriangleExclamation,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { useToast } from '~/context';

function ToastItem({ status, message, id }) {
    const { closeToast } = useToast();
    return (
        <>
            <div className="animate-toast-message">
                <div
                    className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
                    role="alert"
                >
                    {status === 'success' ? (
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                            <FontAwesomeIcon icon={faCircleCheck} />
                            <span className="sr-only">Check icon</span>
                        </div>
                    ) : status === 'error' ? (
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                            <FontAwesomeIcon icon={faXmark} />
                            <span className="sr-only">Check icon</span>
                        </div>
                    ) : (
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-yellow-500 bg-yellow-100 rounded-lg dark:bg-yellow-800 dark:text-yellow-200">
                            <FontAwesomeIcon icon={faTriangleExclamation} />
                            <span className="sr-only">Check icon</span>
                        </div>
                    )}
                    <div className="ms-3 text-sm font-normal">{message}</div>
                    <button
                        type="button"
                        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                        aria-label="Close"
                        onClick={() => closeToast(id)}
                    >
                        <span className="sr-only">Close</span>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
            </div>
        </>
    );
}

ToastItem.propTypes = {
    status: PropTypes.oneOf(['success', 'error', 'warning']),
    message: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
};

export default React.memo(ToastItem);
