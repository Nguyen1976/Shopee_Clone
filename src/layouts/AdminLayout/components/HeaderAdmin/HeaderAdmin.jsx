import React, { useEffect, useState } from 'react';

import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDropbox } from '@fortawesome/free-brands-svg-icons';
import Tooltip from '~/components/Tooltip';
import Image from '~/components/Image';
import { useSelector } from 'react-redux';
import { faChevronDown, faStore } from '@fortawesome/free-solid-svg-icons';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';

function HeaderAdmin() {
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');

    const userInfo = useSelector((state) => state.user);

    useEffect(() => {
        setName(userInfo?.name);
        setAvatar(userInfo?.avatar);
        console.log(userInfo);
    }, [userInfo]);

    return (
        <header className="flex items-center justify-between px-5 py-2 shadow-md">
            <div className="flex items-center gap-3">
                <img className="w-24" src={images.logoColor} alt="Logo" />
                <span className="text-lg mt-1">Kênh Người Bán</span>
            </div>
            <div className="flex gap-3 items-center">
                <Tooltip
                    funcRender={() => (
                        <div className="w-full py-10">
                            <div className="grid justify-between grid-cols-3 gap-5">
                                <div className="flex flex-col items-center">
                                    <div className="bg-orange-600 rounded-full w-14 h-14 flex items-center justify-center">
                                        <FontAwesomeIcon
                                            className="text-white text-2xl"
                                            icon={faClipboard}
                                        />
                                    </div>
                                    <span>Tất cả</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="bg-orange-600 rounded-full w-14 h-14 flex items-center justify-center">
                                        <FontAwesomeIcon
                                            className="text-white text-2xl"
                                            icon={faClipboard}
                                        />
                                    </div>
                                    <span>Tất cả</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="bg-orange-600 rounded-full w-14 h-14 flex items-center justify-center">
                                        <FontAwesomeIcon
                                            className="text-white text-2xl"
                                            icon={faClipboard}
                                        />
                                    </div>
                                    <span>Tất cả</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="bg-orange-600 rounded-full w-14 h-14 flex items-center justify-center">
                                        <FontAwesomeIcon
                                            className="text-white text-2xl"
                                            icon={faClipboard}
                                        />
                                    </div>
                                    <span>Tất cả</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="bg-orange-600 rounded-full w-14 h-14 flex items-center justify-center">
                                        <FontAwesomeIcon
                                            className="text-white text-2xl"
                                            icon={faClipboard}
                                        />
                                    </div>
                                    <span>Tất cả</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="bg-orange-600 rounded-full w-14 h-14 flex items-center justify-center">
                                        <FontAwesomeIcon
                                            className="text-white text-2xl"
                                            icon={faClipboard}
                                        />
                                    </div>
                                    <span>Tất cả</span>
                                </div>
                            </div>
                        </div>
                    )}
                    top={40}
                    right={-100}
                    width={320}
                    afterArrow={false}
                    scaleTop={true}
                >
                    <FontAwesomeIcon className="text-2xl" icon={faDropbox} />
                </Tooltip>
                <div>|</div>
                <Tooltip
                    funcRender={() => (
                        <div className="w-full p-2">
                            <div className="flex flex-col items-center my-5">
                                <Image
                                    className="h-14"
                                    src={avatar}
                                    alt="avatar"
                                />
                                <span>{name}</span>
                            </div>
                            <div className="w-full h-[1px] bg-zinc-100"></div>
                            <div>
                                <div className="flex items-center gap-3 my-3">
                                    <FontAwesomeIcon icon={faStore} />
                                    <span>Hồ Sơ Shop</span>
                                </div>
                                <div className="flex items-center gap-3 my-3">
                                    <FontAwesomeIcon icon={faStore} />
                                    <span>Thiết lập shop</span>
                                </div>
                                <div className="flex items-center gap-3 my-3">
                                    <FontAwesomeIcon icon={faStore} />
                                    <span>Tiếng việt</span>
                                </div>
                                <div className="w-full h-[1px] bg-zinc-100"></div>
                                <div className="flex items-center gap-3 my-3">
                                    <FontAwesomeIcon icon={faStore} />
                                    <span>Đăng xuất</span>
                                </div>
                            </div>
                        </div>
                    )}
                    top={60}
                    right={0}
                    width={290}
                    afterArrow={true}
                    scaleTop={true}
                >
                    <div className="flex items-center gap-2 hover:bg-zinc-100 p-4">
                        <Image className="h-5" src={avatar} alt="avatar" />
                        <span>{name}</span>
                        <FontAwesomeIcon
                            className="text-sm"
                            icon={faChevronDown}
                        />
                    </div>
                </Tooltip>
            </div>
        </header>
    );
}

export default React.memo(HeaderAdmin);
