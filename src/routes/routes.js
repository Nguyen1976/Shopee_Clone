import AccessLayout from '~/layouts/AccessLayout';
import AdminLayout from '~/layouts/AdminLayout';
import DefaultLayout from '~/layouts/DefaultLayout';
import UserLayout from '~/layouts/UserLayout';
import AdminProductPage from '~/pages/AdminProductPage';
import AdminUserPage from '~/pages/AdminUserPage';
import HomePage from '~/pages/HomePage';
import NotFoundPage from '~/pages/NotFoundPage';
import ProductDetailPage from '~/pages/ProductDetailPage';
import ProfilePage from '~/pages/ProfilePage';
import SignInPage from '~/pages/SignInPage';
import SignUpPage from '~/pages/SignUpPage';
import config from '~/configs';

export const routes = [
    { path: config.routes.home, component: HomePage, layout: DefaultLayout },
    { path: config.routes.profile, component: ProfilePage, layout: UserLayout },
    { path: config.routes.signIn, component: SignInPage, layout: AccessLayout },
    { path: config.routes.signUp, component: SignUpPage, layout: AccessLayout },
    {
        path: config.routes.productDetail,
        component: ProductDetailPage,
        layout: DefaultLayout,
    },
    { path: config.routes.adminProduct, component: AdminProductPage, layout: AdminLayout, isAdmin: true },
    { path: config.routes.adminUser, component: AdminUserPage, layout: AdminLayout, isAdmin: true },
    { path: '*', component: NotFoundPage },
];
