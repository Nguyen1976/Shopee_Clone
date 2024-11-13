import React from 'react';
import PropTypes from 'prop-types';

function Modal({ children, showModal }) {
    return (
        <div
            className={`fixed top-0 right-0 bottom-0 left-0 z-50 w-screen h-screen bg-[#0000001e] ${
                showModal ? 'block' : 'hidden'
            }`}
            aria-hidden={!showModal}
        >
            <div className='h-full w-full relative'>
                <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-auto animate-scale">
                    {/* Modal content */}
                    <div className="relative bg-white shadow">
                        <div>{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
};

export default React.memo(Modal);
