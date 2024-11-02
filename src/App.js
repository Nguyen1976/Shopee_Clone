import React, { Fragment } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import { routes } from '~/routes';
import DefaultLayout from './layouts/DefaultLayout';
import { useSelector } from 'react-redux';

function App() {
    const userInfo = useSelector((state) => state.user);

    return (
        <div>
            <Router>
                <Routes>
                    {routes.map((route, index) => {
                        let Page = route.component;

                        let Layout = route.layout || DefaultLayout;

                        if (route.isAdmin && userInfo && !userInfo?.isAdmin) {
                            // Chuyển hướng về trang chủ nếu người dùng không phải admin
                            return (
                                <Route
                                    key={index}
                                />
                            );
                        }

                        if (route.layout === null) {
                            Layout = Fragment; // Không sử dụng layout
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
