import Footer from "~/components/Footer";

function FooterLayout({ children }) {
    return (  
        <>
            {children}
            <Footer />
        </>
    );
}

export default FooterLayout;