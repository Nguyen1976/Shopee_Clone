import PropTypes from 'prop-types';
import { useState } from 'react';
import images from '~/assets/images';

function Image({
    src,
    alt,
    fallback: customFallback = images.noAvatar,
    className = '',
}) {
    const [fallback, setFallback] = useState('');

    const handleError = () => {
        setFallback(customFallback);
    };
    return (
        <img
            className={`h-full w-full object-cover overflow-hidden ${className}`}
            src={fallback || src}
            alt={alt}
            onError={handleError}
        />
    );
}

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    fallback: PropTypes.string,
    className: PropTypes.string,
};

export default Image;
