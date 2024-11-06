import { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

import * as UserService from '~/services/UserService';
import * as VisitService from '~/services/VisitService';
import Loading from '~/components/Loading';
import Image from '~/components/Image';
import ToastMessage from '~/components/ToastMessage';
import useToast from '~/hooks/useToast';

function AdminUserPage() {
    const [listUsers, setListUsers] = useState([]);
    const [listUsersDelete, setListUsersDelete] = useState([]);
    const [listVisits, setListVisits] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isErrorToast, setIsErrorToast] = useState(false);

    const { toast, showToast, setToast } = useToast(3000);


    const fetchAllUsers = async () => {
        try {
            const res = await UserService.getAllUsers();
            setListUsers(res.data);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchAllUsers();
    }, []);


    //Lấy ra dữ liệu thống kê số lượt truy cập của web
    useEffect(() => {
        const fetchData = async () => {
            const res = await VisitService.getVisitor();
            const listVisitTemp = res.data.map((item) => {
                return item.count;
            });
            setListVisits(listVisitTemp);
        };

        fetchData();
    }, []);

    const handleDeleteUsers = async (e) => {
        try {
            setIsLoading(true);
            await UserService.deleteManyUsers(listUsersDelete);
            setListUsers([]);//reset lại list user
            setListUsersDelete([]);//reset lại list user đã xóa
            await fetchAllUsers();
        } catch (err) {
            console.error(err);
            setIsErrorToast(true);
        } finally {
            setIsLoading(false);
            setIsLoading(false);
            if (isErrorToast) {
                showToast('Xóa người dùng không thành công');
            } else {
                showToast('Xóa người dùng thành công');
            }
        }
    };

  

    return (
        <div>
            {toast && (
                <ToastMessage
                    isError={isErrorToast}
                    message={toast}
                    onClose={() => setToast('')}
                />
            )}
            <div className="h-96 flex gap-6">
                <ul className="w-1/3 divide-y divide-gray-200 dark:divide-gray-700 overflow-y-scroll scrollbar scrollbar-thumb-primary scrollbar-track-gray-200 ml-5">
                    {listUsers.map((user, index) => {
                        if (!user.isAdmin) {
                            return (
                                <li
                                    className="pb-3 sm:pb-4 flex items-center"
                                    key={`user-admin-page-${index}`}
                                >
                                    <input
                                        id={`link-checkbox-${index}`}
                                        type="checkbox"
                                        value=""
                                        className="mr-2 ml-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setListUsersDelete([
                                                    ...listUsersDelete,
                                                    user._id,
                                                ]);
                                            } else {
                                                setListUsersDelete(
                                                    listUsersDelete.filter(
                                                        (id) => id !== user._id
                                                    )
                                                );
                                            }
                                        }}
                                    />
                                    <label
                                        htmlFor={`link-checkbox-${index}`}
                                        className="flex items-center space-x-4 rtl:space-x-reverse"
                                    >
                                        <div className="flex-shrink-0 h-8 w-8">
                                            <Image
                                                src={user.avatar}
                                                alt={`user-${index}`}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                {user.name}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                {user.email}
                                            </p>
                                        </div>
                                    </label>
                                </li>
                            );
                        } else {
                            return null;
                        }
                    })}
                </ul>
                <div className="flex-1 ml-10 text-center">
                    <p className='text-lg font-semibold'>Thống kê số lượng người dùng truy cập trang web</p>
                    <LineChart
                        xAxis={[
                            { data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
                        ]}
                        series={[
                            {
                                data: listVisits,
                                
                            },
                        ]}
                        tooltip={{ trigger: 'item' }}
                        width={500}
                        height={400}
                    />
                </div>
            </div>
            <Loading isLoading={isLoading}>
                <div className="text-center">
                    <button
                        className="bg-primary text-white py-2 px-5"
                        onClick={handleDeleteUsers}
                    >
                        Delete
                    </button>
                </div>
            </Loading>
        </div>
    );
}

export default AdminUserPage;
