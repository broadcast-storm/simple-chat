import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main'
import SignInForm from '@/views/AuthViews/SignInForm'
import SignUpForm from '@/views/AuthViews/SignUpForm'
import ConfirmAccount from '@/views/AuthViews/ConfirmAccount'
import ForgotPassword from '@/views/AuthViews/ForgotPassword'
import ChangePassword from '@/views/AuthViews/ChangePassword'
import routesList from '@/router/routesList'

Vue.use(VueRouter)

const routes = [
    {
        path: routesList.mainPage.path,
        component: Main,
        children: [
            {
                path: routesList.mainPage.path,
                components: {
                    'main-router': () =>
                        import('@/views/MainViews/Profile.vue'),
                },
            },
        ],
    },
    {
        path: routesList.authPage.path,
        component: () => import('@/views/Auth.vue'),
        children: [
            {
                path: routesList.authPage.children.signInPage.path,
                components: {
                    'auth-router': SignInForm,
                },
            },
            {
                path: routesList.authPage.children.signUpPage.path,
                components: {
                    'auth-router': SignUpForm,
                },
            },
            {
                path: routesList.authPage.children.confirmAccountPage.path,
                components: {
                    'auth-router': ConfirmAccount,
                },
            },
            {
                path: routesList.authPage.children.forgotpasswordPage.path,
                components: {
                    'auth-router': ForgotPassword,
                },
            },
            {
                path: routesList.authPage.children.changepasswordPage.path,
                components: {
                    'auth-router': ChangePassword,
                },
            },
        ],
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
