import Header from "../Header";

function DefaultLayout({ children }) {
    return (  
        <>
            <Header />
            {children}
        </>
    );
}

export default DefaultLayout;