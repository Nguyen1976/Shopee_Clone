import { useEffect, useState } from 'react';

import Loading from '~/components/Loading';
import { useToast } from '~/context';
import * as ProductService from '~/services/ProductService';
import { formater } from '~/utils/formater';

function ProductAdminPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [listProduct, setListProduct] = useState([]);
    const [listProductDelete, setListProductDelete] = useState([]);

    const { addToast } = useToast();

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const res = await ProductService.getAllProduct();
            setListProduct(res.data);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleAddProductDelete = (id) => {
        setListProductDelete((prev) => [...prev, id]);
    };

    const handleRemoveProductDelete = (id) => {
        setListProductDelete(listProduct.filter((curentId) => curentId === id));
    };

    const handleCheckAll = (e) => {
        if (e.target.checked) {
            setListProductDelete(listProduct.map((item) => item._id));
        } else {
            setListProductDelete([]);
        }
    };

    const handleDeleteProduct = async () => {
        try {
            setIsLoading(true);
            if (listProductDelete.length > 0) {
                await ProductService.deleteProduct(listProductDelete);
                fetchData();
                setListProductDelete([]);
            } else {
                addToast('Hãy chọn sản phẩm cần xóa', 'warning');
            }
        } catch (err) {
            console.error('Failed to delete product:', err);
            addToast('Xóa sản phẩm thất bại', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Loading isLoading={isLoading}>
                <div className="absolute top-2 right-4 text-white flex items-center gap-3">
                    <button
                        className="p-2 bg-primary"
                        onClick={handleDeleteProduct}
                    >
                        Xóa sản phẩm
                    </button>
                    <span className="text-black">(Chọn tất cả)</span>
                    <input
                        type="checkbox"
                        onChange={(e) => handleCheckAll(e)}
                    />
                </div>
                <div className="text-lg font-bold text-zinc-500">
                    Tất cả sản phẩm
                </div>
                <ul className="">
                    {listProduct.length > 0 ? (
                        listProduct.map((item, index) => (
                            <li
                                className="border-b-2 border-gray-200 flex justify-between p-4"
                                key={index}
                            >
                                <div className="">
                                    <div className="flex gap-4 items-center">
                                        <img
                                            className="object-cover h-32 w-32"
                                            src={item.coverImage[0]}
                                            alt=""
                                        />
                                        <div>
                                            <div className="text-md font-medium">
                                                {item.name}
                                            </div>
                                            <div className="text-gray-500">
                                                {item.category}
                                            </div>
                                            <div className="text-gray-500">
                                                Giá: {formater(item.price)}
                                            </div>
                                            <div className="text-gray-500">
                                                Số lượng: {item.quantity}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={listProductDelete.includes(
                                        item._id
                                    )}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            handleAddProductDelete(item._id);
                                        } else {
                                            handleRemoveProductDelete(item._id);
                                        }
                                    }}
                                />
                            </li>
                        ))
                    ) : (
                        <>Không có sản phẩm nào tồn tại</>
                    )}
                </ul>
            </Loading>
        </div>
    );
}

export default ProductAdminPage;
