<template>
    <div class="forgot-password-container">
        <b-row v-if="sendSuccess" align-h="center" class="ml-0 mr-0 mt-5">
            <span class="text-center">
                Письмо для восстановления пароля успешно отправлено на почту
                <strong>{{ form.email }}</strong>
            </span>
        </b-row>
        <b-form v-else @submit="onSubmit">
            <b-alert
                variant="danger"
                :show="dismissCountDown"
                dismissible
                fade
                @dismissed="dismissCountDown = 0"
                @dismiss-count-down="countDownChanged"
                >Неверный адрес эл. почты</b-alert
            >
            <b-form-group
                id="input-group-1"
                :label="
                    sendSuccess
                        ? `Письмо успешно отправлено на почту ${form.email}`
                        : 'Введите почту, куда отправится письмо для восстановления пароля'
                "
                label-for="input-1"
            >
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

            <b-button type="submit" variant="primary" block class="mt-4"
                ><b-spinner
                    v-if="isPending"
                    label="Loading..."
                    variant="light"
                    small
                ></b-spinner>
                <template v-else>Отправить письмо</template></b-button
            >
        </b-form>
        <b-row v-if="!sendSuccess" align-h="center" class="ml-0 mr-0 mt-5">
            <b-link :to="routesList.authPage.children.signInPage"
                >Вспомнили пароль?</b-link
            >
        </b-row>
    </div>
</template>

<script>
import routesList from '@/router/routesList'
import { required, email } from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
    name: 'ForgotPasswordForm',
    components: {},
    data() {
        return {
            routesList,
            form: {
                email: '',
            },
            isPending: false,
            sendSuccess: false,
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
            },
        }
    },
    methods: {
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        async onSubmit(evt) {
            evt.preventDefault()
            if (this.$v.form.$anyError) {
                return
            }
            await this.sendEmail()
        },
        async sendEmail() {
            try {
                this.isPending = true
                const result = await axios.post('/api/auth/forgotPassword', {
                    email: this.form.email,
                })

                this.isPending = false
                this.sendSuccess = true
                console.log(result)
            } catch (error) {
                this.isPending = false
                this.dismissCountDown = this.dismissSecs
            }
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
