import { useEffect, useState } from 'react';
import Image from '~/components/Image';

import Loading from '~/components/Loading';
import { useToast } from '~/context';
import * as UserService from '~/services/UserService';

function UserAdminPage() {
    const [listUsers, setListUsers] = useState([]);
    const [listUserDelete, setListUserDelete] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const { addToast } = useToast();

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const res = await UserService.getAllUsers();
            setListUsers(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCheckAll = (e) => {
        if (e.target.checked) {
            setListUserDelete(listUsers.map((item) => item._id));
        } else {
            setListUserDelete([]);
        }
    };

    const handleAddUserDelete = (id) => {
        setListUserDelete((prev) => [...prev, id]);
    };

    const handleRemoveUserDelete = (id) => {
        setListUserDelete((prev) => prev.filter((idUser) => idUser !== id));
    };

    const handleDeleteProduct = async () => {
        try {
            setIsLoading(true);
            if (listUserDelete.length > 0) {
                await UserService.deleteManyUsers(listUserDelete);
                fetchData();
                setListUserDelete([]);
            } else {
                addToast('Hãy chọn người dùng cần xóa', 'warning');
            }
        } catch (err) {
            console.error('Failed to delete users:', err);
            addToast('Xóa người dùng thất bại', 'error');
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
                        Xóa Người Dùng
                    </button>
                    <span className="text-black">(Chọn tất cả)</span>
                    <input
                        type="checkbox"
                        onChange={(e) => handleCheckAll(e)}
                    />
                </div>
                <div className="text-lg font-bold text-zinc-500">
                    Tất cả người dùng
                </div>
                <ul className="">
                    {listUsers.length > 0 ? (
                        listUsers.map((item, index) => (
                            <li
                                className="border-b-2 border-gray-200 flex justify-between p-4"
                                key={index}
                            >
                                <div className="">
                                    <div className="flex gap-4 items-center">
                                        <div className="rounded-full h-16 w-16 overflow-hidden border-1">
                                            <Image
                                                src={item.avatar}
                                                alt="avatar"
                                            />
                                        </div>
                                        <div className="ml-2">
                                            <p>{item.username}</p>
                                            <p>
                                                {item.email} |{' '}
                                                <span className="text-zinc-500 text-sm">
                                                    {item.isAdmin
                                                        ? 'Admin'
                                                        : 'User'}
                                                </span>
                                            </p>
                                            <div className="text-zinc-500">
                                                {item.phone}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={listUserDelete.includes(item._id)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            handleAddUserDelete(item._id);
                                        } else {
                                            handleRemoveUserDelete(item._id);
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

export default UserAdminPage;
