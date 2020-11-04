<template>
    <div class="login-container">
        <b-row align-h="center" class="ml-0 mr-0 mt-5">
            <h4>Идет подтверждение вашего аккаунта</h4>
            <b-button
                variant="primary"
                block
                class="mt-4"
                :to="routesList.authPage.children.signInPage"
            >
                Я подтвердил аккаунт
            </b-button>
        </b-row>
    </div>
</template>

<script>
import routesList from '@/router/routesList'
export default {
    name: 'ConfirmAccount',
    components: {},
    data() {
        return {
            routesList,
        }
    },
}
</script>

<style lang="scss" scoped>
.login-container {
    text-align: center;
    margin: 0 auto;
    max-width: 500px;
    box-sizing: border-box;
}
</style>
