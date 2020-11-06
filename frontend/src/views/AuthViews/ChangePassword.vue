<template>
    <div class="change-password-container">
        <b-form v-if="!sendSuccess" @submit="onSubmit">
            <b-alert
                variant="danger"
                :show="dismissCountDown"
                dismissible
                fade
                @dismissed="dismissCountDown = 0"
                @dismiss-count-down="countDownChanged"
                >Проверьте соединение с интернетом и правильность ссылки. <br />
                Возможно истекло время использования ссылки</b-alert
            >
            <b-form-group
                label="Придумайте новый пароль"
                label-for="password"
                class="mb-2"
            >
                <b-input
                    id="password"
                    v-model.lazy="$v.form.password.$model"
                    :state="validateState('password')"
                    type="password"
                    placeholder="Введите пароль"
                    required
                ></b-input>
                <small v-if="$v.form.password.$error" class="text-danger mt-1">
                    <template v-if="!$v.form.password.required">
                        Это поле необходимо заполнить
                    </template>
                    <template v-if="!$v.form.password.isPasswordSafe">
                        длиной не менее 8 символов <br />
                        не менее одной цифры 0-9<br />
                        не менее одной буквы a-z <br />
                        не менее одной буквы A-Z <br />
                    </template>
                </small>
            </b-form-group>

            <b-form-group
                label="Повторите пароль"
                label-for="confirmPassword"
                class="mb-2"
            >
                <b-input
                    id="confirmPassword"
                    v-model.lazy="$v.form.confirmPassword.$model"
                    :state="validateState('confirmPassword')"
                    type="password"
                    placeholder="Повторите пароль"
                    required
                ></b-input>
                <small
                    v-if="$v.form.confirmPassword.$error"
                    class="text-danger mt-1"
                >
                    <template v-if="!$v.form.confirmPassword.required">
                        Это поле необходимо заполнить
                    </template>
                    <template v-if="!$v.form.confirmPassword.sameAs">
                        Пароли не совпадают
                    </template>
                </small>
            </b-form-group>

            <b-button
                v-if="!sendSuccess"
                type="submit"
                variant="primary"
                block
                class="mt-4"
                ><b-spinner
                    v-if="isPending"
                    label="Loading..."
                    variant="light"
                    small
                ></b-spinner>
                <template v-else>Сменить пароль</template></b-button
            >
        </b-form>
        <b-button
            v-else
            variant="primary"
            block
            class="mt-4"
            :to="routesList.authPage.children.signInPage"
        >
            Войти в аккаунт
        </b-button>
    </div>
</template>

<script>
import routesList from '@/router/routesList'
import { required, sameAs } from 'vuelidate/lib/validators'
import { isPasswordSafe } from './customValidators'
import axios from 'axios'

export default {
    name: 'ChangePassword',
    components: {},
    data() {
        return {
            routesList,
            form: {
                password: '',
                confirmPassword: '',
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
                password: {
                    required,
                    isPasswordSafe,
                },
                confirmPassword: {
                    required,
                    sameAs: sameAs('password'),
                },
            },
        }
    },
    methods: {
        validateState(name) {
            const { $dirty, $error } = this.$v.form[name]
            return $dirty ? !$error : null
        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        async onSubmit(evt) {
            evt.preventDefault()
            if (this.$v.form.$anyError) {
                return
            }
            await this.changePassword()
        },
        async changePassword() {
            try {
                this.isPending = true
                const config = {
                    headers: {
                        Authorization: `Bearer ${this.$route.query.token}`,
                    },
                }

                const result = await axios.patch(
                    '/api/auth/changePassword',
                    {
                        password: this.form.password,
                    },
                    config
                )

                this.isPending = false
                this.sendSuccess = result.data
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
.change-password-container {
    box-sizing: border-box;
    max-width: 600px;
    margin: 0 auto;
}
</style>
