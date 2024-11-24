import PropTypes from 'prop-types';
import { useState } from 'react';
import images from '~/assets/images';

function Image({ src, alt, fallback: customFallback = images.noAvatar }) {
    const [fallback, setFallback] = useState('');

    const handleError = () => {
        setFallback(customFallback);
    };
    return (
        <>
            <img
                className="w-full h-full rounded-full overflow-hidden"
                src={fallback || src}
                alt={alt}
                onError={handleError}
            />
        </>
    );
}

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    fallback: PropTypes.string,
};

export default Image;
