import Footer from '../Footer';
import Header from '../Header';

function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}

export default DefaultLayout;
