import PropTypes from "prop-types";
import React from "react";
import Footer from "~/components/Footer";

function FooterLayout({ children }) {
    return (  
        <>
            {children}
            <Footer />
        </>
    );
}

FooterLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default React.memo(FooterLayout);