<template>
    <div class="forgot-password-container">
        <b-form @submit="onSubmit">
            <b-form-group
                id="input-group-1"
                label="Введите почту, куда отправится письмо для восстановления пароля"
                label-for="input-1"
            >
                <b-form-input
                    id="input-1"
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="Введите почту"
                ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary" block class="mt-4"
                >Отправить письмо</b-button
            >
        </b-form>
        <b-row align-h="center" class="ml-0 mr-0 mt-5">
            <b-link :to="routesList.authPage.children.signInPage"
                >Вспомнили пароль?</b-link
            >
        </b-row>
    </div>
</template>

<script>
import routesList from '@/router/routesList'

export default {
    name: 'ForgotPasswordForm',
    components: {},
    data() {
        return {
            routesList,
            form: {
                email: '',
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
.forgot-password-container {
    box-sizing: border-box;
    max-width: 600px;
    margin: 0 auto;
}
</style>
