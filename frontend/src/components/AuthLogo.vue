<template>
    <router-link class="logo mb-5" :to="routesList.mainPage.path">
        <LogoSvg class="logo__svg" />
        <h1 class="logo__text">
            <span class="logo__text__first-letter">S</span>imple
            <span class="logo__text__first-letter">C</span>hat
        </h1>
    </router-link>
</template>

<script>
import routesList from '@/router/routesList'
import LogoSvg from '@/assets/icons/logo.svg'
export default {
    name: 'AuthLogo',
    components: { LogoSvg },
    data() {
        return {
            routesList,
        }
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
.logo:hover {
    text-decoration: none;
}
</style>
