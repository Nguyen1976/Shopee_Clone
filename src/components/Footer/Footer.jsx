import {
    faFacebook,
    faInstagram,
    faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import images from '~/assets/images';

function Footer() {
    return (
        <footer className="bg-[#f5f5f5] py-12">
            <div className="container-custom grid grid-cols-5 gap-5">
                <div>
                    <div className="font-bold text-sm">CHĂM SÓC KHÁCH HÀNG</div>
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
                    <div className="font-bold text-sm">Đơn vị vận chuyển</div>
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
                    <img className="mt-2" src={images.qrcode} alt="qrcode" />
                </div>
            </div>
        </footer>
    );
}

export default React.memo(Footer);
