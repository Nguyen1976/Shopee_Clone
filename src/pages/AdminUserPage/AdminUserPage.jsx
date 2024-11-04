import { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

import * as UserService from '~/services/UserService';

function AdminUserPage() {
    const [listUsers, setListUsers] = useState([]);
    const [listUsersDelete, setListUsersDelete] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await UserService.getAllUsers();
            setListUsers(res.data);
        };

        fetchData();
    }, []);
    useEffect(() => {
        console.log(listUsersDelete);
    }, [listUsersDelete]);

    const handleDeleteUsers = async () => {
        try {
            const res = await UserService.deleteManyUsers(listUsersDelete);
            console.log(res);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="h-96 flex gap-6">
            <ul className="w-1/3 divide-y divide-gray-200 dark:divide-gray-700">
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
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
                                    <div className="flex-shrink-0">
                                        {user.avatar ? (
                                            <img
                                                className="w-8 h-8 rounded-full"
                                                src={user.avatar}
                                                alt={`user-${index}`}
                                            />
                                        ) : (
                                            <img
                                                className="w-8 h-8 opacity-50"
                                                src="https://img.icons8.com/?size=100&id=114064&format=png&color=000000"
                                                alt="avatar-none"
                                            />
                                        )}
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
                <button onClick={handleDeleteUsers}>delete</button>
            </ul>
            <div className="flex-1">
                <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[
                        {
                            data: [2, 5.5, 2, 8.5, 1.5, 5],
                        },
                    ]}
                    width={500}
                    height={300}
                />
            </div>
        </div>
    );
}

export default AdminUserPage;
