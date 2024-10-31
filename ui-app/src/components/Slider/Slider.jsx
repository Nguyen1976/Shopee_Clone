import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';

function Slider() {
    const swiperRef = useRef(null);
    const [isShowNav, setIsShowNav] = useState(false);

    const listSlide = [
        {
            image: images.slider1
        },
        {
            image: images.slider2
        },
        {
            image: images.slider3
        },
        {
            image: images.slider4
        },
        {
            image: images.slider5
        },
    ]

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
                spaceBetween={50}
                slidesPerView={1}
                loop={true}
            >
                {listSlide.map((item, index) => (
                    <SwiperSlide key={`key-slider-${index}`}>
                        <img src={item.image} alt={`Image-${index}`} />
                    </SwiperSlide>
                ))}
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

export default Slider;
