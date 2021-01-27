<template>
    <div class="main-container pt-5">
        <LoadingOverlay :show-overlay="showOverlay" />
        <Navbar />
        <b-container class="main-container__content px-0 pt-2" fluid="lg">
            <router-view name="main-router" />
        </b-container>
    </div>
</template>

<script>
import routesList from '@/router/routesList'
import LoadingOverlay from '@/components/LoadingOverlay'
import Navbar from '@/components/Navbar'

export default {
    name: 'Main',
    components: { Navbar, LoadingOverlay },
    data() {
        return {
            routesList,
            showOverlay: true,
        }
    },
    mounted() {
        setTimeout(() => {
            if (!localStorage.token) {
                this.$router.push(routesList.authPage.children.signInPage)
            } else {
                this.showOverlay = false
            }
        }, 1000)
    },
}
</script>

<style lang="scss">
.main-container {
    box-sizing: border-box;
    background-color: $basic-grey;
    height: 100vh;
    &__content {
        height: 100%;
        background-color: whitesmoke;
    }
    .overlay {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &__text {
            color: $basic-grey-dark;
            vertical-align: baseline;
        }
    }
}
</style>
