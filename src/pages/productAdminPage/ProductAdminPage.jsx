import React, { useState } from 'react';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import InputFile from './components/InputFile/InputFile';

function ProductAdminPage() {
    const [files, setFiles] = useState([]);

    return (
        <div className="bg-white p-6 rounded-md">
            <h1 className="font-medium text-xl">Thông tin cơ bản</h1>
            <div className="mt-5 flex gap-5">
                <p className="text-sm">Hình ảnh sản phẩm</p>
                <InputFile setFiles={setFiles} isMultiple={true}>
                    <FontAwesomeIcon icon={faImages} />
                    <div className="text-sm">
                        Thêm hình ảnh ({files.length}/6)
                    </div>
                </InputFile>
            </div>
        </div>
    );
}

export default React.memo(ProductAdminPage);
