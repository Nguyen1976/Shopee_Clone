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

export const routes = [
    { path: '/', component: HomePage, layout: DefaultLayout },
    { path: '/user/profile', component: ProfilePage, layout: UserLayout },
    { path: '/sign-in', component: SignInPage, layout: AccessLayout },
    { path: '/sign-up', component: SignUpPage, layout: AccessLayout },
    {
        path: '/product-detail/:id',
        component: ProductDetailPage,
        layout: DefaultLayout,
    },
    { path: '/system/admin/product', component: AdminProductPage, layout: AdminLayout, isAdmin: true },
    { path: '/system/admin/user', component: AdminUserPage, layout: AdminLayout, isAdmin: true },
    { path: '*', component: NotFoundPage },
];
