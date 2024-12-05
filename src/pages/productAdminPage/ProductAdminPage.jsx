import React from 'react';

function ProductAdminPage() {
    return (
        <div className="bg-white p-6 rounded-md">
            <h1 className="font-medium text-xl">Thông tin cơ bản</h1>
            <p>Hình ảnh sản phẩm</p>
        </div>
    );
}

export default React.memo(ProductAdminPage);
