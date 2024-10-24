import Slider from '~/components/Slider';
import images from '~/assets/images';
import CardProduct from '~/components/CardProduct';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faInstagram,
    faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

function HomePage() {
    return (
        <>
            <div className="container-custom mt-7 flex gap-1 pb-7">
                <div className="w-2/3">
                    <Slider />
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
                    <div className="grid grid-cols-6 gap-4">
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                        <CardProduct />
                    </div>
                    <div className="text-center">
                        <button className="w-24 bg-white p-2 shadow-sm">
                            Xem thêm
                        </button>
                    </div>
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
            <div className="bg-[#f5f5f5] py-12">
                <div className="container-custom grid grid-cols-5 gap-5">
                    <div>
                        <div className="font-bold text-sm">
                            CHĂM SÓC KHÁCH HÀNG
                        </div>
                        <ul className="text-xs">
                            <li className="hover:text-primary mt-4">
                                <a href="/">Trung Tâm Trợ Giúp</a>
                            </li>
                            <li className="hover:text-primary mt-4">
                                <a href="/">Shopee Blog</a>
                            </li>
                            <li className="hover:text-primary mt-4">
                                <a href="/">Shopee Mall</a>
                            </li>
                            <li className="hover:text-primary mt-4">
                                <a href="/">Hướng Dẫn Mua Hàng</a>
                            </li>
                            <li className="hover:text-primary mt-4">
                                <a href="/">Hướng Dẫn Bán Hàng</a>
                            </li>
                            <li className="hover:text-primary mt-4">
                                <a href="/">Thanh Toán</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <div className="font-bold text-sm">VỀ SHOPEE</div>
                        <ul className="text-xs">
                            <li className="hover:text-primary mt-4">
                                <a href="/">Giới Thiệu Về Shopee Việt Nam</a>
                            </li>
                            <li className="hover:text-primary mt-4">
                                <a href="/">Tuyển dụng</a>
                            </li>
                            <li className="hover:text-primary mt-4">
                                <a href="/">Điều khoản</a>
                            </li>
                            <li className="hover:text-primary mt-4">
                                <a href="/">Chính hảng</a>
                            </li>
                            <li className="hover:text-primary mt-4">
                                <a href="/">Kênh người bán</a>
                            </li>
                            <li className="hover:text-primary mt-4">
                                <a href="/">Flash sales</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <div className="font-bold text-sm">
                            Đơn vị vận chuyển
                        </div>
                        <div className="mt-5">
                            <img src={images.delivery} alt="" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold text-sm">
                            Theo dõi chúng tôi trên
                        </div>
                        <div className="mt-5">
                            <div className="flex items-center mt-2">
                                <FontAwesomeIcon icon={faFacebook} />
                                <a
                                    className="hover:text-primary text-sm ml-1"
                                    href="/"
                                >
                                    Facebook
                                </a>
                            </div>
                            <div className="flex items-center mt-2">
                                <FontAwesomeIcon icon={faInstagram} />
                                <a
                                    className="hover:text-primary text-sm ml-1"
                                    href="/"
                                >
                                    Instagram
                                </a>
                            </div>
                            <div className="flex items-center mt-2">
                                <FontAwesomeIcon icon={faLinkedin} />
                                <a
                                    className="hover:text-primary text-sm ml-1"
                                    href="/"
                                >
                                    Linkedin
                                </a>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="font-bold text-sm">
                            TẢI ỨNG DỤNG SHOPEE NGAY THÔI
                        </div>
                        <img className='mt-2' src={images.qrcode} alt="qrcode" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;
