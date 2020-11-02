<template>
    <div class="login-container"><h1>Подтвердить акк</h1></div>
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
    box-sizing: border-box;
}
</style>
