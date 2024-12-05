import PropTypes from 'prop-types';
import React, { useState } from 'react';
import images from '~/assets/images';

function Image({ src, alt, className = '' }) {
    const [image, setImage] = useState('');

    const handleError = () => {
        setImage(images.noAvatar);
    };
    return (
        <img
            className={`h-full w-full object-cover overflow-hidden ${className}`}
            src={src || image}
            alt={alt}
            onError={handleError}
        />
    );
}

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
};

export default React.memo(Image);
