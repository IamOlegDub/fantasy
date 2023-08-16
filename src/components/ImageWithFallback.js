import React from 'react';

const ImageWithFallback = ({ src, fallbackSrc, alt, borderColor }) => {
    const [imageSrc, setImageSrc] = React.useState(src);
    const onError = () => {
        setImageSrc(fallbackSrc);
    };

    return (
        <img
            className={`rounded-full z-10  ${borderColor}`}
            src={imageSrc}
            alt={alt}
            onError={onError}
        />
    );
};

export default ImageWithFallback;
