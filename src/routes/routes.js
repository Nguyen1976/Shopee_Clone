import AccessLayout from '~/layouts/AccessLayout';
import DefaultLayout from '~/layouts/DefaultLayout';
import UserLayout from '~/layouts/UserLayout';
import HomePage from '~/pages/HomePage';
import NotFoundPage from '~/pages/NotFoundPage';
import ProductDetailPage from '~/pages/ProductDetailPage';
import ProfilePage from '~/pages/ProfilePage';
import SignInPage from '~/pages/SignInPage';
import SignUpPage from '~/pages/SignUpPage';
import config from '~/configs';
import OrderPage from '~/pages/OrderPage';
import HeaderLayout from '~/layouts/HeaderLayout/';
import PaymentPage from '~/pages/PaymentPage';
import FooterLayout from '~/layouts/FooterLayout';
import AddressPage from '~/pages/AddressPage';
import PurchasePage from '~/pages/PurchasePage';
import productAdminPage from '~/pages/productAdminPage';
import AdminLayout from '~/layouts/AdminLayout/AdminLayout';

export const routes = [
    { path: config.routes.home, component: HomePage, layout: DefaultLayout },
    { path: config.routes.profile, component: ProfilePage, layout: UserLayout },
    { path: config.routes.address, component: AddressPage, layout: UserLayout },
    {
        path: config.routes.purchase,
        component: PurchasePage,
        layout: UserLayout,
    },
    { path: config.routes.signIn, component: SignInPage, layout: AccessLayout },
    { path: config.routes.signUp, component: SignUpPage, layout: AccessLayout },
    {
        path: config.routes.productDetail,
        component: ProductDetailPage,
        layout: DefaultLayout,
    },
    { path: config.routes.order, component: OrderPage, layout: HeaderLayout },
    {
        path: config.routes.payment,
        component: PaymentPage,
        layout: FooterLayout,
    },
    {
        path: config.routes.productAdmin,
        component: productAdminPage,
        layout: AdminLayout,
    },
    { path: '*', component: NotFoundPage },
];
