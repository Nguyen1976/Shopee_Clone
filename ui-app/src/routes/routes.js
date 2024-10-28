import AccessLayout from "~/components/AccessLayout";
import DefaultLayout from "~/components/DefaultLayout";
import HomePage from "~/pages/HomePage";
import NotFoundPage from "~/pages/NotFoundPage";
import ProductDetailPage from "~/pages/ProductDetailPage";
import ProfilePage from "~/pages/ProfilePage";
import SignInPage from "~/pages/SignInPage";
import SignUpPage from "~/pages/SignUpPage";

export const routes = [
    { path: '/', component: HomePage, layout: DefaultLayout },
    { path: '/user/account/profile', component: ProfilePage, layout: DefaultLayout },
    { path: '/sign-in', component: SignInPage, layout: AccessLayout },
    { path: '/sign-up', component: SignUpPage, layout: AccessLayout },
    { path: '/details-order/:id', component: ProductDetailPage },
    { path: '*', component: NotFoundPage },
];