import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from '~/routes';
import DefaultLayout from './components/DefaultLayout';

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    {routes.map((route, index) => {
                        const Page = route.component;

                        let Layout = route.layout || DefaultLayout;

                        if (route.layout === null) {
                            Layout = Fragment;  // Không sử dụng layout
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
