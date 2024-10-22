import DefaultLayout from "~/components/DefaultLayout";
import HomePage from "~/pages/HomePage";
import NotFoundPage from "~/pages/NotFoundPage";
import ProductDetailPage from "~/pages/ProductDetailPage";
import SignInPage from "~/pages/SignInPage";
import SignUpPage from "~/pages/SignUpPage";

export const routes = [
    { path: '/', component: HomePage, layout: DefaultLayout },
    { path: '/sign-in', component: SignInPage, layout: null },
    { path: '/sign-up', component: SignUpPage, layout: null },
    { path: '/details-order/:id', component: ProductDetailPage },
    { path: '*', component: NotFoundPage },
];