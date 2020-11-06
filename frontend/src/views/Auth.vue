<template>
    <div class="auth-container pt-5">
        <AuthLogo />
        <div class="container"><router-view name="auth-router" /></div>
    </div>
</template>

<script>
import AuthLogo from '@/components/AuthLogo'
export default {
    name: 'Auth',
    components: { AuthLogo },
}
</script>

<style lang="scss" scoped>
.auth-container {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: $basic-grey;
}
</style>
