const routesList = {
    mainPage: {
        path: '/',
        header: 'Экран со списком диалогов и открытым диалогом',
    },

    authPage: {
        path: '/auth',
        header: 'Авторизация',
        children: {
            signInPage: {
                header: 'Вход в аккаунт',
                path: '/auth/signin',
            },
            signUpPage: {
                header: 'Зарегистрироваться',
                path: '/auth/signup',
            },
            confirmAccountPage: {
                header: 'Подтверждение аккаунта',
                path: '/auth/confirm',
            },
            forgotpasswordPage: {
                header: 'Забыл пароль',
                path: '/auth/forgot-password',
            },
        },
    },
}

export default routesList
