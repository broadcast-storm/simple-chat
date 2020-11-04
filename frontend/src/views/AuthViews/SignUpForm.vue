<template>
    <div class="login-container pt-4 pb-4">
        <b-form v-if="!userCreated" @submit="onSubmit">
            <b-form-group label="Логин" label-for="login" class="mb-2">
                <b-form-input
                    id="login"
                    v-model.lazy="$v.form.login.$model"
                    required
                    placeholder="Придумайте уникальный логин"
                    :state="validateState('login')"
                ></b-form-input>
                <small v-show="$v.form.login.$error" class="text-danger mt-1">
                    <template v-if="!$v.form.login.required">
                        Это поле необходимо заполнить
                    </template>
                    <template v-if="!$v.form.login.minLength">
                        Количество символов не менее 4
                    </template>
                    <template v-if="!$v.form.login.maxLength">
                        Количество символов не более 12
                    </template>
                    <template v-if="!$v.form.login.alphaNum">
                        Логин может состоять из латинских букв и цифр
                    </template>
                    <template v-if="!$v.form.login.isLoginAvailable">
                        Этот логин уже используется
                    </template>
                </small>
            </b-form-group>
            <b-form-group label="Email" label-for="mail" class="mb-2">
                <b-form-input
                    id="mail"
                    v-model.lazy="$v.form.email.$model"
                    :state="validateState('email')"
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
                    <template v-if="!$v.form.email.isEmailAvailable">
                        Эта почта уже используется
                    </template>
                </small>
            </b-form-group>
            <div class="params mb-2">
                <b-form-group
                    label="Имя"
                    label-for="name"
                    class="names mr-1 mb-0"
                >
                    <b-form-input
                        id="name"
                        v-model.lazy="$v.form.name.$model"
                        :state="validateState('name')"
                        required
                        placeholder="Ваше имя"
                    ></b-form-input>
                    <small v-show="$v.form.name.$error" class="text-danger">
                        <template v-if="!$v.form.name.required">
                            Это поле необходимо заполнить
                        </template>
                        <template v-if="!$v.form.name.alpha">
                            Имя может состоять только из букв
                        </template>
                    </small>
                </b-form-group>
                <b-form-group
                    label="Фамилия"
                    label-for="surname"
                    class="names mb-0"
                >
                    <b-form-input
                        id="surname"
                        v-model.lazy="$v.form.surname.$model"
                        :state="validateState('surname')"
                        required
                        placeholder="Ваша фамилия"
                    ></b-form-input>
                    <small v-show="$v.form.surname.$error" class="text-danger">
                        <template v-if="!$v.form.surname.required">
                            Это поле необходимо заполнить
                        </template>
                        <template v-if="!$v.form.surname.alpha">
                            Фамилия может состоять только из букв
                        </template>
                    </small>
                </b-form-group>
            </div>
            <div class="params date-gender mb-1">
                <b-form-group class="mr-1">
                    <label for="date">Дата рождения</label>
                    <b-input-group>
                        <b-form-input
                            id="date"
                            v-model.lazy="$v.form.date.$model"
                            :state="validateState('date')"
                            type="text"
                            placeholder="ДД.ММ.ГГГГ"
                            autocomplete="off"
                            size="sm"
                        ></b-form-input>

                        <b-input-group-append>
                            <b-form-datepicker
                                start-weekday="1"
                                required
                                :min="min"
                                :max="max"
                                button-only
                                :date-format-options="{
                                    day: 'numeric',
                                    month: 'numeric',
                                    year: 'numeric',
                                }"
                                size="sm"
                                @context="onContext"
                            ></b-form-datepicker>
                        </b-input-group-append>
                    </b-input-group>
                    <small v-if="$v.form.date.$error" class="text-danger mt-1">
                        <template v-if="!$v.form.date.required">
                            Это поле необходимо заполнить
                        </template>
                        <template v-if="!$v.form.date.validDate">
                            Дата должна быть в формате ДД.ММ.ГГГГ
                        </template>
                        <template
                            v-if="
                                $v.form.date.validDate && !$v.form.date.maxValue
                            "
                        >
                            Нельзя совершать временные парадоксы
                        </template>
                    </small>
                </b-form-group>

                <b-form-group label="Пол" label-for="gender" class="mb-2">
                    <b-form-select
                        id="gender"
                        v-model.lazy="$v.form.gender.$model"
                        :state="validateState('gender')"
                        :options="genders"
                        required
                        size="sm"
                    ></b-form-select>
                    <small
                        v-if="$v.form.gender.$error"
                        class="text-danger mt-1"
                    >
                        <template v-if="!$v.form.gender.required">
                            Это поле необходимо заполнить
                        </template>
                    </small>
                </b-form-group>
            </div>

            <b-form-group label="Пароль" label-for="password" class="mb-2">
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

            <b-button type="submit" variant="primary" block class="mt-4">
                <b-spinner
                    v-if="isPending"
                    label="Loading..."
                    variant="light"
                    small
                ></b-spinner>
                <template v-else>Зарегистрироваться</template>
            </b-button>
        </b-form>
        <b-row v-else align-h="center" class="ml-0 mr-0 mt-5">
            <span>
                Мы отправили на вашу почту
                <strong>{{ form.email }}</strong> письмо для подтверждения
                аккаунта</span
            >
            <b-button
                variant="primary"
                block
                class="mt-4"
                :to="routesList.authPage.children.signInPage"
            >
                Я подтвердил аккаунт
            </b-button>
        </b-row>

        <b-row v-if="!userCreated" align-h="center" class="ml-0 mr-0 mt-5">
            <span
                >Уже есть аккаунт?
                <b-link :to="routesList.authPage.children.signInPage"
                    >Войти!</b-link
                ></span
            >
        </b-row>
    </div>
</template>

<script>
import routesList from '@/router/routesList'
import {
    required,
    minLength,
    maxLength,
    alphaNum,
    email,
    sameAs,
    helpers,
} from 'vuelidate/lib/validators'
import {
    isLoginAvailable,
    isEmailAvailable,
    isPasswordSafe,
} from './customValidators'
import moment from 'moment'
import axios from 'axios'

const alpha = helpers.regex('alpha', /^[a-zA-Zа-яА-Я]*$/)

export default {
    name: 'SignUpForm',
    components: {},
    data() {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const minDate = new Date(today)
        minDate.setFullYear(1960)
        minDate.setMonth(1)
        minDate.setDate(1)
        const maxDate = new Date(today)
        return {
            routesList,
            genders: [
                { text: 'муж', value: 'male' },
                { text: 'жен', value: 'female' },
            ],
            min: minDate,
            max: maxDate,
            form: {
                login: '',
                name: '',
                surname: '',
                email: '',
                date: '',
                gender: '',
                password: '',
                confirmPassword: '',
            },
            emailExisting: () => true,
            isValidEmail: false,
            loginExisting: () => true,
            isValidLogin: false,
            isPending: false,
            userCreated: false,
        }
    },
    watch: {
        'form.email': function () {
            if (
                this.$v.form.email.required &&
                this.$v.form.email.email &&
                !this.isValidEmail
            ) {
                this.emailExisting = isEmailAvailable
                this.isValidEmail = true
            }

            if (
                (!this.$v.form.email.required || !this.$v.form.email.email) &&
                this.isValidEmail
            ) {
                this.emailExisting = () => true
                this.isValidEmail = false
            }
        },

        'form.login': function () {
            if (
                this.$v.form.login.required &&
                this.$v.form.login.minLength &&
                this.$v.form.login.maxLength &&
                this.$v.form.login.alphaNum &&
                !this.isValidLogin
            ) {
                this.loginExisting = isLoginAvailable
                this.isValidLogin = true
            }

            if (
                (!this.$v.form.login.required ||
                    !this.$v.form.login.minLength ||
                    !this.$v.form.login.maxLength ||
                    !this.$v.form.login.alphaNum) &&
                this.isValidLogin
            ) {
                this.loginExisting = () => true
                this.isValidLogin = false
            }
        },
    },
    validations() {
        return {
            form: {
                login: {
                    required,
                    minLength: minLength(4),
                    maxLength: maxLength(12),
                    alphaNum,
                    isLoginAvailable: this.loginExisting,
                },
                name: {
                    required,
                    alpha,
                },
                surname: {
                    required,
                    alpha,
                },

                email: {
                    required,
                    email,
                    isEmailAvailable: this.emailExisting,
                },

                date: {
                    required,
                    validDate: (val) =>
                        moment(val, 'DD.MM.YYYY', true).isValid(),
                    maxValue: (val) =>
                        moment(val, 'DD.MM.YYYY', true).toISOString() <
                        new Date().toISOString(),
                },

                gender: {
                    required,
                },

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
        onSubmit(evt) {
            evt.preventDefault()
            this.$v.form.$touch()
            if (this.$v.form.$anyError) {
                return
            }
            this.signup()
        },
        onContext(ctx) {
            if (ctx.selectedFormatted !== 'No date selected')
                this.form.date = ctx.selectedFormatted
        },
        validateState(name) {
            const { $dirty, $error } = this.$v.form[name]
            return $dirty ? !$error : null
        },
        async signup() {
            this.isPending = true
            const birthday = moment(this.form.date, 'DD.MM.YYYY')
                .toDate()
                .toISOString()

            const result = await axios.post('/api/auth/signUp', {
                login: this.form.login,
                email: this.form.email,
                password: this.form.password,
                name: this.form.name,
                surname: this.form.surname,
                gender: this.form.gender,
                birthday: birthday,
            })

            this.isPending = false

            console.log(result)

            if (result.data === true) {
                this.userCreated = true
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.login-container {
    box-sizing: border-box;
    max-width: 600px;
    margin: 0 auto;

    .params {
        display: flex;
        justify-content: space-between;
        .names {
            flex-grow: 1;
        }
    }
    .date-gender {
        justify-content: flex-start;
    }
}
</style>
