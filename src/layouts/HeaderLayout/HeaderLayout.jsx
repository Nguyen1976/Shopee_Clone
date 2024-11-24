import PropTypes from 'prop-types';
import Header from '~/components/Header';

function HeaderLayout({ children }) {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
}

HeaderLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default HeaderLayout;
