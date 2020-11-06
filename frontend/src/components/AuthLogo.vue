<template>
    <div class="logo mb-5">
        <LogoSvg class="logo__svg" />
        <h1 class="logo__text">
            <span class="logo__text__first-letter">S</span>imple
            <span class="logo__text__first-letter">C</span>hat
        </h1>
    </div>
</template>

<script>
import LogoSvg from '@/assets/icons/logo.svg'
export default {
    name: 'AuthLogo',
    components: { LogoSvg },
}
</script>

<style lang="scss" scoped>
.logo {
    display: flex;
    justify-content: center;
    align-items: center;
    &__svg {
        width: 45px;
        color: $basic-blue !important;
    }
    &__text {
        font-weight: bold;
        color: $basic-grey-dark;
        margin-bottom: 0;
        margin-left: 10px;
        &__first-letter {
            color: $basic-blue;
            font-weight: bold;
        }
    }
}
</style>
