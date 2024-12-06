import React from 'react';
import PropTypes from 'prop-types';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Loading({ isLoading, children }) {
    return (
        <div className="relative">
            {isLoading && (
                <div className="absolute top-0 left-0 bottom-0 right-0 bg-[#ffffff7a] flex items-center justify-center z-30">
                    <FontAwesomeIcon
                        className="animate-spin text-primary text-xl"
                        icon={faSpinner}
                    />
                </div>
            )}
            {children}
        </div>
    );
}

Loading.propTypes = {
    isLoading: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

export default React.memo(Loading);
