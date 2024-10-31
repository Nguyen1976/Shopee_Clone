import { faStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import Slider from '~/components/Slider';

import * as ProductService from '~/services/ProductService';

function ProducDetailPage() {
    const [product, setProduct] = useState({});
    const [listImages, setListImages] = useState([]);
    const param = useParams();
    useEffect(() => {
        const fetchData = async () => {
            const res = await ProductService.getDetailProduct(param.id);
            setProduct(res.data);
            setListImages(res.data.image);
        };
        fetchData();
    }, [param]);
    return (
        <div className="bg-[#f5f5f5] pt-5">
            <div className="container-custom mt-5">
                <div className="bg-white flex p-3 gap-4">
                    <div className="w-2/5 py-3">
                        <img
                            className="w-full object-cover h-4/5"
                            src={listImages[0] || ''}
                            alt="image-product"
                        />
                        <div className='h-20 mt-3'>
                            <Slider 
                                slidesPerView={5}
                                spaceBetween={20}
                                loop={false}
                            >
                                {listImages.map((item, index) => (
                                    <SwiperSlide key={`key-slider-${index}`}>
                                        <img
                                            className='h-full w-full object-cover'
                                            src={item}
                                            alt={`Image-slider-product-${index}`}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Slider>
                        </div>
                    </div>
                    <div className="w-3/5 px-5">
                        <div className="text-xl font-normal">
                            {product.name}
                        </div>
                        <div className="flex gap-3 items-center">
                            <div className="flex items-center">
                                <FontAwesomeIcon
                                    className="w-4 h-4 text-yellow-300 me-1"
                                    icon={faStar}
                                />
                                <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">
                                    {product.rating}
                                </p>
                                <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                            </div>
                            <div>|</div>
                            <div>
                                <span className="underline">
                                    Còn {product.countInStock} sản phẩm
                                </span>
                            </div>
                        </div>
                        <div>
                            <ul>
                                <li className="flex items-center mt-5">
                                    <div className="text-zinc-400">
                                        Mã giảm giá
                                    </div>
                                    <div className="ml-3 flex gap-2">
                                        <div className="relative">
                                            <div
                                                className="bg-[#d0011b14] text-[#d0011b] w-max affter-wavy before-wavy px-1
                                        "
                                            >
                                                Giảm 5k
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <div
                                                className="bg-[#d0011b14] text-[#d0011b] w-max affter-wavy before-wavy px-1
                                        "
                                            >
                                                Giảm 5k
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="flex gap-3 mt-3">
                                    <div className="text-zinc-400">
                                        Bảo hiểm
                                    </div>
                                    <div className="">
                                        Bảo hiểm người tiêu dùng
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProducDetailPage;
