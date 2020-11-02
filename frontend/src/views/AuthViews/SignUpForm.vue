<template>
    <div class="login-container"><h1>Зарегистрироваться</h1></div>
</template>

<script>
import routesList from '@/router/routesList'
export default {
    name: 'SignUpForm',
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
    box-sizing: border-box;
}
</style>
