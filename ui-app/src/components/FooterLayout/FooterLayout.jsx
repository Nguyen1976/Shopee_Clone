import Footer from "../Footer";

function FooterLayout({ children }) {
    return (  
        <>
            {children}
            <Footer />
        </>
    );
}

export default FooterLayout;