<template>
    <div class="forgot-password-container">
        <h1>Забыл пароль</h1>
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
        }
    },
}
</script>

<style lang="scss" scoped>
.forgot-password-container {
    box-sizing: border-box;
}
</style>
