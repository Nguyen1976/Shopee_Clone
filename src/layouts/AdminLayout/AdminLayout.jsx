import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDropbox } from '@fortawesome/free-brands-svg-icons';
import Tooltip from '~/components/Tooltip';
import Image from '~/components/Image';
import { useSelector } from 'react-redux';

function AdminLayout({ children }) {
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');

    const userInfo = useSelector((state) => state.user);

    useEffect(() => {
        setName(userInfo?.name);
        setAvatar(userInfo?.avatar);
        console.log(userInfo);
    }, [userInfo]);

    return (
        <div>
            <header className="flex items-center justify-between p-5">
                <div className="flex items-center gap-3">
                    <img className="w-24" src={images.logoColor} alt="Logo" />
                    <span className="text-lg mt-1">Kênh Người Bán</span>
                </div>
                <div className="flex gap-3 items-center">
                    <Tooltip
                        funcRender={() => (
                            <div className="w-full">
                                <div className="flex justify-center">
                                    <img src={images.qrcode} alt="qr code" />
                                </div>
                                <div className="flex flex-wrap px-3 gap-4">
                                    <img
                                        className="w-2/5"
                                        src={images.appstore}
                                        alt="app store"
                                    />
                                    <img
                                        className="w-2/5"
                                        src={images.googleplay}
                                        alt="google play"
                                    />
                                    <img
                                        className="w-2/5"
                                        src={images.appgallery}
                                        alt="app gallery"
                                    />
                                </div>
                            </div>
                        )}
                        top={20}
                        left={0}
                        width={208}
                        afterArrow={false}
                        scaleTop={true}
                    >
                        <FontAwesomeIcon
                            className="text-2xl"
                            icon={faDropbox}
                        />
                    </Tooltip>
                    <div>|</div>
                    <div className="flex items-center">
                        <Image className="h-5" src={avatar} alt="avatar" />
                        <span>{name}</span>
                    </div>
                </div>
            </header>
            {children}
        </div>
    );
}

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default React.memo(AdminLayout);
