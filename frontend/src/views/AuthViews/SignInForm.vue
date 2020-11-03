<template>
    <div class="signin-container">
        <b-form @submit="onSubmit">
            <b-form-group id="input-group-1" label="Email" label-for="input-1">
                <b-form-input
                    id="input-1"
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="Введите почту"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Пароль" label-for="input-2">
                <b-input
                    id="input-2"
                    v-model="form.password"
                    type="password"
                    placeholder="Введите пароль"
                    required
                ></b-input>
            </b-form-group>

            <b-row align-h="end" class="ml-0 mr-0">
                <b-link :to="routesList.authPage.children.forgotpasswordPage"
                    >Забыли пароль?</b-link
                >
            </b-row>

            <b-button type="submit" variant="primary" block class="mt-3"
                >Войти</b-button
            >
        </b-form>
        <b-row align-h="center" class="ml-0 mr-0 mt-5">
            <span
                >Нет аккаунта?
                <b-link :to="routesList.authPage.children.signUpPage"
                    >Зарегистрируйтесь!</b-link
                ></span
            >
        </b-row>
    </div>
</template>

<script>
import routesList from '@/router/routesList'
export default {
    name: 'SignInForm',
    components: {},
    data() {
        return {
            routesList,
            form: {
                email: '',
                password: '',
            },
        }
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault()
            console.log(JSON.stringify(this.form))
        },
    },
}
</script>

<style lang="scss" scoped>
.signin-container {
    box-sizing: border-box;
    max-width: 600px;
    margin: 0 auto;
}
</style>
