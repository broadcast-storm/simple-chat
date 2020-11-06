<template>
    <div class="confirm-container">
        <b-row align-h="center" class="ml-0 mr-0 mt-5">
            <span>
                <template v-if="isConfirming"
                    >Идет подтверждение вашего аккаунта...</template
                >
                <template v-else-if="error">
                    Произошла ошибка! Возможно истекло время использования
                    ссылки <br /><br />
                    Пройдите в форму авторизации, письмо для подтверждения будет
                    отправлено Вам повторно
                </template>
                <template v-else>
                    Поздравляю, Ваш аккаунт подтвержден! Можете авторизоваться.
                </template>
            </span>
            <b-button
                variant="primary"
                block
                class="mt-4"
                :to="routesList.authPage.children.signInPage"
            >
                <b-spinner
                    v-if="isConfirming"
                    label="Loading..."
                    variant="light"
                    small
                ></b-spinner>
                <template v-else>Войти в аккаунт</template>
            </b-button>
        </b-row>
    </div>
</template>

<script>
import routesList from '@/router/routesList'
import axios from 'axios'
export default {
    name: 'ConfirmAccount',
    components: {},
    data() {
        return {
            routesList,
            isConfirming: true,
            error: false,
        }
    },
    async mounted() {
        await this.confirmAccount()
    },
    methods: {
        async confirmAccount() {
            try {
                const res = await axios.get('/api/auth/confirm', {
                    params: {
                        token: this.$route.query.token,
                    },
                })
                if (res.data === true) {
                    this.isConfirming = false
                }
            } catch (error) {
                this.error = true
                this.isConfirming = false
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.confirm-container {
    text-align: center;
    margin: 0 auto;
    max-width: 500px;
    box-sizing: border-box;
}
</style>
