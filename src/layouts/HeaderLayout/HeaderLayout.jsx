import Header from "~/components/Header";

function HeaderLayout({ children }) {
    return (  
        <div>
            <Header/>
            {children}
        </div>
    );
}

export default HeaderLayout;