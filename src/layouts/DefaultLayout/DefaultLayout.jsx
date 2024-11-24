import React from 'react';
import PropTypes from 'prop-types';

import Footer from '~/components/Footer';
import Header from '~/components/Header';

function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default React.memo(DefaultLayout);
