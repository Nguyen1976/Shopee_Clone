import PropTypes from 'prop-types';
import React, { useState } from 'react';

function Tooltip({
    funcRender,
    children,
    width,
    top,
    left,
    right,
    afterArrow,
    scaleTopRight,
    fadeIn,
    scaleTop,
    hideDefault
}) {
    const [isShow, setIsShow] = useState(false);

    if (left === 0) {
        left = '0px';
    } else if (right === 0) {
        right = '0px';
    }

    top = top + 'px';
    width = width + 'px';

    return (
        <div className="relative">
            <span
                className="group"
                onMouseEnter={() => setIsShow(true)}
                onMouseLeave={() => setIsShow(false)}
            >
                {children}
                {isShow && (
                    <div
                        className={`
                            z-40
                            absolute 
                            ${afterArrow ? 'after-arrow' : ''} 
                            bg-white 
                            shadow-lg
                            opacity-0
                            ${scaleTopRight ? 'animate-scale-top-right' : ''} 
                            ${fadeIn ? 'animate-fade-in' : ''}
                            ${scaleTop ? 'animate-scale-top' : ''}
                            ${hideDefault ? 'opacity-100' : ''}
                        `}
                        style={{
                            left: left,
                            right: right,
                            top: top,
                            width: width,
                        }}
                    >
                        {funcRender()}
                    </div>
                )}
            </span>
        </div>
    );
}

Tooltip.propTypes = {
    funcRender: PropTypes.func,
    children: PropTypes.node.isRequired,
    width: PropTypes.number,
    top: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    afterArrow: PropTypes.bool,
    scaleTopRight: PropTypes.bool,
    fadeIn: PropTypes.bool,
    scaleTop: PropTypes.bool,
    hideDefault: PropTypes.bool,
};

export default React.memo(Tooltip);
