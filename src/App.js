import React, { Fragment, useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    // Navigate,
} from 'react-router-dom';
import { routes } from '~/routes';
import DefaultLayout from './layouts/DefaultLayout';
import { useSelector } from 'react-redux';
// import config from './configs';

function App() {
    const userInfo = useSelector((state) => state.user);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (userInfo) {
            setIsAdmin(userInfo.isAdmin);
        }
    }, [userInfo]);

    return (
        <div>
            <Router>
                <Routes>
                    {routes.map((route, index) => {
                        let Page = route.component;

                        let Layout = route.layout || DefaultLayout;

                        if (route.isAdmin && !isAdmin) {
                            return null;
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
