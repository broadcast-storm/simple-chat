<template>
    <div class="auth-container">
        <div class="container"><router-view name="auth-router" /></div>
    </div>
</template>

<script>
export default {
    name: 'Auth',
}
</script>

<style lang="scss" scoped>
.auth-container {
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $basic-grey;
}
</style>
