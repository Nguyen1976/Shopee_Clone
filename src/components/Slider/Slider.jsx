import { Swiper } from 'swiper/react';
import 'swiper/css';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

function Slider({ children, spaceBetween, slidesPerView, loop }) {
    const swiperRef = useRef(null);
    const [isShowNav, setIsShowNav] = useState(false);

   
    return (
        <div
            className="w-full h-full mx-auto relative"
            onMouseOver={() => setIsShowNav(true)}
            onMouseLeave={() => setIsShowNav(false)}
        >
            <Swiper
                navigation
                pagination={{ clickable: true }}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                spaceBetween={spaceBetween || 1}
                slidesPerView={slidesPerView || 1}
                loop={loop}
            >
                {children}
                {isShowNav && (
                    <>
                        <div
                            onClick={() => swiperRef.current.slidePrev()}
                            className="absolute top-1/2 transform -translate-y-1/2 z-10 animate-fade-in"
                        >
                            <button className="text-white bg-[#a7a7a7a1] p-2 py-4">
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>
                        </div>
                        <div
                            onClick={() => swiperRef.current.slideNext()}
                            className="absolute top-1/2 transform -translate-y-1/2 z-10 right-0 animate-fade-in"
                        >
                            <button className="text-white bg-[#a7a7a7a1] p-2 py-4">
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                        </div>
                    </>
                )}
            </Swiper>
        </div>
    );
}

Slider.propTypes = {
    children: PropTypes.node.isRequired,
    spaceBetween: PropTypes.number,
    slidesPerView: PropTypes.number,
    loop: PropTypes.bool,
}

export default React.memo(Slider);
