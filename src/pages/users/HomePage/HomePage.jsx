import CardProduct from '~/components/CardProduct';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';

import Slider from '~/components/Slider';
import images from '~/assets/images';
import * as ProductService from '~/services/ProductService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import config from '~/configs';
import Loading from '~/components/Loading';

function HomePage() {
    const [allProduct, setAllProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const pages = [1, 2, 3, 4, 5];

    const navigate = useNavigate();

    const location = useLocation();

    let query = new URLSearchParams(location.search);
    const pageNumberQuerry = parseInt(query.get('pageNumber')) || 1;

    const [pageNumber, setPageNumber] = useState(pageNumberQuerry);

    const fetchDataProduct = async (page) => {
        try {
            setIsLoading(true);
            setAllProduct([]);
            const res = await ProductService.getProductNavigate(page - 1, 10);
            setAllProduct(res.data);
        } catch (error) {
            console.error('Error fetching product data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDataProduct(pageNumber); // Gọi hàm fetchData để lấy dữ liệu
    }, [pageNumber]);

    const listSlide = [
        {
            image: images.slider1,
        },
        {
            image: images.slider2,
        },
        {
            image: images.slider3,
        },
        {
            image: images.slider4,
        },
        {
            image: images.slider5,
        },
    ];

    const handlePagePrev = () => {
        setPageNumber((prevPageNumber) => {
            const newPageNumber = prevPageNumber - 1;
            query.set('pageNumber', newPageNumber);
            return newPageNumber;
        });
        navigate(`/?pageNumber=${pageNumber - 1}`);
    };
    const handlePageNext = () => {
        setPageNumber((prevPageNumber) => {
            const newPageNumber = prevPageNumber + 1;
            query.set('pageNumber', newPageNumber);
            return newPageNumber;
        });
        navigate(`/?pageNumber=${pageNumber + 1}`);
    };

    return (
        <>
            <div
                className="container-custom mt-7 flex gap-1 pb-7 bg-no-repeat bg-cover bg-center"
                style={{
                    backgroundImage:
                        'url(https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-m3ahvxp9g7vw92)',
                }}
            >
                <div className="w-2/3">
                    <Slider slidesPerView={1} loop={false}>
                        {listSlide.map((item, index) => (
                            <SwiperSlide key={`key-slider-${index}`}>
                                <img src={item.image} alt={`Image-${index}`} />
                            </SwiperSlide>
                        ))}
                    </Slider>
                </div>
                <div className="w-1/3 flex flex-col gap-1">
                    <div>
                        <img src={images.banner1} alt="banner1" />
                    </div>
                    <div>
                        <img src={images.banner2} alt="banner2" />
                    </div>
                </div>
            </div>
            <div className="bg-[#f5f5f5] pt-7 pb-16">
                <div className="container-custom sticky top-32 z-10">
                    <div className="bg-white w-full border-primary border-b-4 p-3 text-center text-xl font-normal">
                        <span className="text-primary">Gợi ý hôm nay</span>
                    </div>
                </div>
                <div className="container-custom mt-5">
                    <Loading isLoading={isLoading}>
                        <div className="grid grid-cols-6 gap-4 min-h-7">
                            {allProduct.map((item, index) => (
                                <Link
                                    to={`/product-detail/${item._id}`}
                                    key={item._id || `key-hot-search-${index}`}
                                >
                                    <CardProduct
                                        countInStock={item.countInStock}
                                        price={item.price}
                                        image={item.coverImage[0] || ''}
                                        name={item.name}
                                        discount={item?.discount}
                                    />
                                </Link>
                            ))}
                        </div>
                    </Loading>
                    <nav className="text-center mt-10 text-zinc-400 ">
                        <ul className="inline-flex -space-x-px text-2xl gap-10">
                            <li onClick={handlePagePrev}>
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </li>
                            {pages.map((page, index) => (
                                <li
                                    key={index}
                                    className={
                                        pageNumber === page
                                            ? 'bg-primary px-2 text-white'
                                            : ''
                                    }
                                    onClick={() => setPageNumber(page)}
                                >
                                    <Link
                                        to={`${config.routes.home}?pageNumber=${page}`}
                                    >
                                        {page}
                                    </Link>
                                </li>
                            ))}
                            <li>...</li>
                            <li onClick={handlePageNext}>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="bg-white border-primary border-t-2 py-12">
                <div className="container-custom">
                    <div className="font-bold text-sm mt-5">
                        SHOPEE - GÌ CŨNG CÓ, MUA HẾT Ở SHOPEE
                    </div>
                    <div className="text-xs mt-2">
                        <span>
                            Shopee - ứng dụng mua sắm trực tuyến thú vị, tin
                            cậy, an toàn và miễn phí! Shopee là nền tảng giao
                            dịch trực tuyến hàng đầu ở Đông Nam Á, có trụ sở
                            chính ở Singapore, đã có mặt ở khắp các khu vực
                        </span>
                    </div>
                    <div className="font-bold text-sm mt-7">
                        MUA SẮM VÀ BÁN HÀNG ONLINE ĐƠN GIẢN, NHANH CHÓNG VÀ AN
                        TOÀN
                    </div>
                    <div className="text-xs mt-2">
                        <span>
                            Nếu bạn đang tìm kiếm một trang web để mua và bán
                            hàng trực tuyến thì Shopee.vn là một sự lựa chọn
                            tuyệt vời dành cho bạn. Shopee là trang thương mại
                            điện tử cho phép người mua và người bán tương tác và
                            trao đổi dễ dàng thông tin về sản phẩm và chương
                            trình khuyến mãi của shop. Do đó, việc mua bán trên
                            Shopee trở nên nhanh chóng và đơn giản hơn. Bạn có
                            thể trò chuyện trực tiếp với nhà bán hàng để hỏi
                            trực tiếp về mặt hàng cần mua. Còn nếu bạn muốn tìm
                            mua những dòng sản phẩm chính hãng, uy tín, Shopee
                            Mall chính là sự lựa chọn lí tưởng dành cho bạn. Để
                            bạn có thể dễ dàng khi tìm hiểu và sử dụng sản phẩm,
                            Shopee Blog - trang blog thông tin chính thức của
                            Shopee - sẽ giúp bạn có thể tìm được cho mình các
                            kiến thức về xu hướng thời trang, review công nghệ,
                            mẹo làm đẹp, tin tức tiêu dùng và deal giá tốt bất
                            ngờ.
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;
