import { useEffect, useState } from 'react';

import * as UserService from '~/services/UserService';

function AdminUserPage() {
    const [listUsers, setListUsers] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await UserService.getAllUsers();
            setListUsers(res.data);
        };

        fetchData();
    }, []);

    return (
        <div className="h-96">
            <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                {listUsers.map((user, index) => {
                    if (!user.isAdmin) {
                        return (
                            <li
                                className="pb-3 sm:pb-4"
                                key={`user-admin-page-${index}`}
                            >
                                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="w-8 h-8 rounded-full"
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
                                </div>
                            </li>
                        );
                    } else {
                        return null;
                    }
                })}
            </ul>
        </div>
    );
}

export default AdminUserPage;
