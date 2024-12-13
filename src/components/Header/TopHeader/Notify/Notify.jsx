import React from 'react';
import { useNavigate } from 'react-router-dom';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Tooltip from '~/components/Tooltip';
import images from '~/assets/images';
import config from '~/configs';

function Notify() {
    const navigate = useNavigate();

    return (
        <div>
            <Tooltip
                funcRender={() => (
                    <div className="w-full flex flex-col justify-center items-center">
                        <div className="w-1/3 py-16">
                            <img src={images.notNotify} alt="" />
                        </div>
                        <div className="text-sm text-black py-5">
                            Đăng nhập để xem thông báo
                        </div>
                        <div className="w-full flex justify-between items-center">
                            <div
                                className="w-1/2 text-black bg-[#f5f5f5] p-2 hover:bg-[#e8e8e8] hover:text-primary text-center"
                                onClick={() => navigate(config.routes.signUp)}
                            >
                                Đăng ký
                            </div>
                            <div
                                className="w-1/2 text-black bg-[#f5f5f5] p-2 hover:bg-[#e8e8e8] hover:text-primary text-center"
                                onClick={() => navigate(config.routes.signIn)}
                            >
                                Đăng nhập
                            </div>
                        </div>
                    </div>
                )}
                top={35}
                right={0}
                width={320}
                afterArrow={true}
                scaleTopRight={true}
            >
                <a className="hover:opacity-50" href="/">
                    <FontAwesomeIcon icon={faBell} />
                    <span className="pl-1">Thông báo</span>
                </a>
            </Tooltip>
        </div>
    );
}

export default React.memo(Notify);
