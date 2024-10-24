import { useState } from 'react';

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
    scaleTop
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
        <div className="relative z-50">
            <span
                className='group'
                onMouseEnter={() => setIsShow(true)}
                onMouseLeave={() => setIsShow(false)}
            >
                {children}
                {isShow && (
                    <div
                        className={`
                            absolute 
                            ${afterArrow ? 'after-arrow' : ''} 
                            bg-white 
                            shadow-lg
                            opacity-0
                            ${scaleTopRight ? 'animate-scale-top-right' : ''} 
                            ${fadeIn ? 'animate-fade-in' : ''}
                            ${scaleTop ? 'animate-scale-top' : ''}
                        `}
                        style={{
                            left: left,
                            right: right,
                            top: top,
                            width: width
                        }}
                    >
                        {funcRender()}
                    </div>
                )}
            </span>
        </div>
    );
}

export default Tooltip;
