import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Slider from '~/components/Slider';
import * as ProductService from '~/services/ProductService';
import images from '~/assets/images';
import { useDispatch, useSelector } from 'react-redux';
import {
    faCar,
    faCartShopping,
    faChevronDown,
    faMinus,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
import Tooltip from '~/components/Tooltip';
import { addOrderProduct } from '~/redux/slices/OrderSlice';
import { useToast } from '~/context';

function ProductDetailPage() {
    const [product, setProduct] = useState({});
    const [listImages, setListImages] = useState([]);
    const [detailImage, setDetailImage] = useState('');
    const [indexImage, setIndexImage] = useState('');
    const [addressUser, setAddressUser] = useState('');
    const [quantity, setQuantity] = useState(1);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { addToast } = useToast();

    const useInfo = useSelector((state) => state.user);

    const order = useSelector((state) => state.order);

    const imageRef = useRef();

    const param = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await ProductService.getDetailProduct(param.id);
                setProduct(res.data);
                setListImages(res.data.image);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };
        fetchData();
    }, [param]);

    useEffect(() => {
        if (listImages.length > 0) {
            setDetailImage(listImages[0]);
        }
    }, [listImages]);

    useEffect(() => {
        setAddressUser(useInfo?.address);
    }, [useInfo]);

    const handleAddOrderProduct = () => {
        if (!useInfo?.id) {
            navigate('/sign-in', { state: location?.pathname });
        } else {
            const orderRedux = order?.orderItems?.find(
                (item) => item.product === product?._id
            );
            // Kiểm tra điều kiện để thêm sản phẩm vào giỏ hàng
            const isStockSufficient =
                orderRedux?.amount + quantity <= orderRedux?.countInstock;
            const isProductInStock = !orderRedux && product?.countInStock > 0;
            if (isStockSufficient || isProductInStock) {
                dispatch(
                    addOrderProduct({
                        orderItem: {
                            name: product?.name,
                            amount: quantity,
                            image: detailImage,
                            price: product?.price,
                            product: product?._id,
                            discount: product?.discount,
                            countInstock: product?.countInStock,
                        },
                    })
                );
                addToast('Thêm vào giỏ hàng thành công', 'success');
            } else {
                addToast('Không đủ số lượng sản phẩm trong kho', 'warning');
            }
        }
    };

    return (
        <div className="bg-[#f5f5f5] pt-5">
            <div className="container-custom mt-5">
                <div className="bg-white flex p-3 gap-4">
                    <div className="w-2/5 py-3">
                        <img
                            className="w-full object-cover h-4/5"
                            src={detailImage || ''}
                            alt="image-product"
                        />
                        <div className="h-20 mt-3">
                            <Slider
                                slidesPerView={5}
                                spaceBetween={20}
                                loop={false}
                            >
                                {listImages.map((item, index) => (
                                    <SwiperSlide key={`key-slider-${index}`}>
                                        <img
                                            onMouseOver={(e) => {
                                                setDetailImage(e.target.src);
                                                setIndexImage(index);
                                                setDetailImage(
                                                    listImages[index]
                                                );
                                            }}
                                            ref={imageRef}
                                            className={`
                                                h-full w-full object-cover border-1
                                                ${
                                                    index === indexImage
                                                        ? 'border-1 border-red-500'
                                                        : ''
                                                }
                                            `}
                                            src={item}
                                            alt={`Image-slider-product-${index}`}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Slider>
                        </div>
                    </div>
                    <div className="w-3/5 px-5">
                        <h2 className="text-xl font-normal">{product.name}</h2>
                        <div className="flex gap-3 items-center">
                            <div className="flex items-center">
                                <FontAwesomeIcon
                                    className="w-4 h-4 text-yellow-300 me-1"
                                    icon={faStar}
                                />
                                <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white underline">
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
                        <ul>
                            <li className="flex items-center mt-10">
                                <div className="text-zinc-400">Mã giảm giá</div>
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
                            <li className="flex gap-3 mt-8">
                                <div className="text-zinc-400">Bảo hiểm</div>
                                <div className="">Bảo hiểm người tiêu dùng</div>
                            </li>
                            <li className="flex gap-5 mt-8">
                                <div className="text-zinc-400">Vận chuyển</div>
                                <div className="">
                                    <div className="h-6 flex items-center">
                                        <img
                                            className="object-cover h-full"
                                            src={images.freeShip}
                                            alt="Freeship"
                                        />
                                        <span>Miễn phí vận chuyển</span>
                                    </div>
                                    <div className="flex gap-3 items-center mt-5">
                                        <FontAwesomeIcon icon={faCar} />
                                        <span className="text-zinc-500">
                                            Vận chuyển tới
                                        </span>
                                        <span>{addressUser}</span>
                                    </div>
                                    <div className="flex gap-3 items-center mt-5">
                                        <span>Phí vận chuyển</span>
                                        <Tooltip
                                            funcRender={() => (
                                                <div className="w-full z-auto p-3">
                                                    <div className="py-3">
                                                        <div className="text-black font-semibold hover:text-primary flex items-center justify-between">
                                                            <span>
                                                                Hàng cồng kềnh
                                                            </span>
                                                            <span>22.000đ</span>
                                                        </div>
                                                        <div className="mt-2 text-sm">
                                                            <div className="text-primary">
                                                                Miễn phí vận
                                                                chuyển
                                                                <span className="text-zinc-400 ml-3">
                                                                    Đơn tối
                                                                    thiểu 0đ
                                                                </span>
                                                            </div>
                                                            <div className="text-primary">
                                                                Miễn phí vận
                                                                chuyển
                                                                <span className="text-zinc-400 ml-3">
                                                                    Đơn tối
                                                                    thiểu
                                                                    500.000đ
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="py-3">
                                                        <div className="text-black font-semibold hover:text-primary flex items-center justify-between">
                                                            <span>Nhanh</span>
                                                            <span>16.000đ</span>
                                                        </div>
                                                        <div className="mt-2 text-sm">
                                                            <div className="text-primary">
                                                                Miễn phí vận
                                                                chuyển
                                                                <span className="text-zinc-400 ml-3">
                                                                    Đơn tối
                                                                    thiểu 0đ
                                                                </span>
                                                            </div>
                                                            <div className="text-primary">
                                                                Miễn phí vận
                                                                chuyển
                                                                <span className="text-zinc-400 ml-3">
                                                                    Đơn tối
                                                                    thiểu
                                                                    500.000đ
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            top={20}
                                            left={-90}
                                            width={350}
                                            hideDefault={true}
                                        >
                                            <span className="hover:text-primary cursor-pointer">
                                                0đ
                                                <FontAwesomeIcon
                                                    className="text-zinc-400 ml-1"
                                                    icon={faChevronDown}
                                                />
                                            </span>
                                        </Tooltip>
                                    </div>
                                </div>
                            </li>
                            <li className="flex gap-3 mt-8 items-center">
                                <div className="text-zinc-400">Số lượng</div>
                                <div className="h-9 w-32 border-1 rounded-sm border-zinc-300 text-zinc-300 text-center px-1 ml-5">
                                    <button
                                        className="h-full pr-1 mr-1"
                                        onClick={() => {
                                            setQuantity((prev) =>
                                                prev === 1 ? prev : (prev -= 1)
                                            );
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faMinus} />
                                    </button>
                                    <input
                                        className="h-full w-3/5 text-center border-zinc-300 border-x-2 border-y-0 select-none"
                                        type="number"
                                        disabled
                                        value={quantity}
                                    />
                                    <button
                                        className="h-full pl-1 ml-1"
                                        onClick={() => {
                                            setQuantity((prev) => (prev += 1));
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </div>
                            </li>
                        </ul>
                        <div className="flex items-center mt-10 gap-5">
                            <button
                                className="p-3 bg-[#d0011b14] border-[#d0011b] border-1"
                                onClick={handleAddOrderProduct}
                            >
                                <FontAwesomeIcon
                                    className="mr-3"
                                    icon={faCartShopping}
                                />
                                Thêm vào giỏ hàng
                            </button>
                            <button className="text-white bg-[#d0011b] py-3 px-10 border-[#d0011b] border-1">
                                Mua Ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;
