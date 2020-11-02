<template>
    <div class="auth-container"><router-view name="auth-router" /></div>
</template>

<script>
export default {
    name: 'Auth',
}
</script>

<style lang="scss" scoped>
.auth-container {
    width: 100%;
    height: 100vh;
}
</style>
