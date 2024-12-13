import AccessLayout from '~/layouts/AccessLayout';
import DefaultLayout from '~/layouts/DefaultLayout';
import UserLayout from '~/layouts/UserLayout';
import HomePage from '~/pages/users/HomePage';
import NotFoundPage from '~/pages/users/NotFoundPage';
import ProductDetailPage from '~/pages/users/ProductDetailPage';
import ProfilePage from '~/pages/users/ProfilePage';
import SignInPage from '~/pages/users/SignInPage';
import SignUpPage from '~/pages/users/SignUpPage';
import config from '~/configs';
import OrderPage from '~/pages/users/OrderPage';
import HeaderLayout from '~/layouts/HeaderLayout/';
import PaymentPage from '~/pages/users/PaymentPage';
import FooterLayout from '~/layouts/FooterLayout';
import AddressPage from '~/pages/users/AddressPage';
import PurchasePage from '~/pages/users/PurchasePage';
import CreateProductAdminPage from '~/pages/admin/CreateProductAdminPage';
import ProductAdminPage from '~/pages/admin/ProductAdminPage';
import AdminLayout from '~/layouts/AdminLayout/AdminLayout';
import UserAdminPage from '~/pages/admin/UserAminPage';
import OrderAdminPage from '~/pages/admin/OrderAdminPage';

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
        path: config.routes.createProductAdmin,
        component: CreateProductAdminPage,
        layout: AdminLayout,
        isAdmin: true,
    },
    {
        path: config.routes.productAdmin,
        component: ProductAdminPage,
        layout: AdminLayout,
        isAdmin: true,
    },
    {
        path: config.routes.userAdmin,
        component: UserAdminPage,
        layout: AdminLayout,
        isAdmin: true,
    },
    {
        path: config.routes.orderAdmin,
        component: OrderAdminPage,
        layout: AdminLayout,
        isAdmin: true,
    },
    { path: '*', component: NotFoundPage, layout: null },
];
