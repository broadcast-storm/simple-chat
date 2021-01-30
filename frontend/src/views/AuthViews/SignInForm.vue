<template>
    <div class="signin-container">
        <b-form @submit="onSubmit">
            <b-alert
                variant="danger"
                :show="dismissCountDown"
                dismissible
                fade
                @dismissed="dismissCountDown = 0"
                @dismiss-count-down="countDownChanged"
                >Неверный адрес эл. почты или пароль</b-alert
            >
            <b-form-group id="input-group-1" label="Email" label-for="input-1">
                <b-form-input
                    id="input-1"
                    v-model.lazy="$v.form.email.$model"
                    type="email"
                    required
                    placeholder="Введите почту"
                ></b-form-input>
                <small v-show="$v.form.email.$error" class="text-danger">
                    <template v-if="!$v.form.email.required">
                        Это поле необходимо заполнить
                    </template>
                    <template v-if="!$v.form.email.email">
                        Нужно ввести электронную почту
                    </template>
                </small>
            </b-form-group>

            <b-form-group id="input-group-2" label="Пароль" label-for="input-2">
                <b-input
                    id="input-2"
                    v-model.lazy="$v.form.password.$model"
                    type="password"
                    placeholder="Введите пароль"
                    required
                ></b-input>
                <small v-if="$v.form.password.$error" class="text-danger">
                    <template v-if="!$v.form.password.required">
                        Это поле необходимо заполнить
                    </template>
                </small>
            </b-form-group>

            <b-row align-h="end" class="ml-0 mr-0">
                <b-link :to="routesList.authPage.children.forgotpasswordPage"
                    >Забыли пароль?</b-link
                >
            </b-row>

            <b-button type="submit" variant="primary" block class="mt-3"
                ><b-spinner
                    v-if="isPending"
                    label="Loading..."
                    variant="light"
                    small
                ></b-spinner>
                <template v-else>Войти</template></b-button
            >
        </b-form>
        <b-row align-h="center" class="ml-0 mr-0 mt-5">
            <span
                >Нет аккаунта?
                <b-link :to="routesList.authPage.children.signUpPage.path"
                    >Зарегистрируйтесь!</b-link
                ></span
            >
        </b-row>
    </div>
</template>

<script>
import routesList from '@/router/routesList'
import { required, email } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import { FIRST_AUTH_REQUEST } from '@/store/action-types/user-info'

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

            isPending: false,
            dismissSecs: 3,
            dismissCountDown: 0,
        }
    },
    validations() {
        return {
            form: {
                email: {
                    required,
                    email,
                },

                password: {
                    required,
                },
            },
        }
    },
    methods: {
        ...mapActions('userInfo', [FIRST_AUTH_REQUEST]),
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        async onSubmit(evt) {
            evt.preventDefault()
            if (this.$v.form.$anyError) {
                return
            }
            await this.signin()
        },
        async signin() {
            try {
                this.isPending = true
                await this.FIRST_AUTH_REQUEST({
                    email: this.form.email,
                    password: this.form.password,
                })

                this.isPending = false

                this.$router.push(routesList.mainPage.path)
            } catch (error) {
                this.isPending = false
                this.dismissCountDown = this.dismissSecs
            }
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
