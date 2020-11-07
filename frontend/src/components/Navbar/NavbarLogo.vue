<template>
    <div class="logo">
        <LogoSvg class="logo__svg" />
        <p class="logo__text">
            <span class="logo__text__first-letter">S</span>imple
            <span class="logo__text__first-letter">C</span>hat
        </p>
    </div>
</template>

<script>
import LogoSvg from '@/assets/icons/logoNavbar.svg'
export default {
    name: 'NavbarLogo',
    components: { LogoSvg },
    data() {
        return {}
    },
}
</script>

<style lang="scss" scoped>
.logo {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    &__svg {
        width: 30px;
        color: $basic-blue !important;
    }
    &__text {
        font-weight: bold;
        color: $basic-grey;
        margin-bottom: 0;
        margin-left: 10px;
        &__first-letter {
            color: $basic-blue;
            font-weight: bold;
        }
    }
}
</style>
