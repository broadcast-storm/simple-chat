<template>
    <div class="main-container">
        <b-overlay
            :show="showOverlay"
            rounded="sm"
            no-wrap
            :opacity="1"
            no-fade
        >
            <template #overlay>
                <div class="overlay">
                    <AuthLogo />
                    <span class="overlay__text"
                        >Загрузка данных профиля
                        <b-spinner
                            label="Spinning"
                            variant="primary"
                            small
                            class="ml-2"
                        ></b-spinner
                    ></span>
                </div>
            </template>
        </b-overlay>
        <h1>Основной экран</h1>
        <div class="main-container__content">
            <router-view name="main-router" />
        </div>
    </div>
</template>

<script>
import routesList from '@/router/routesList'
import AuthLogo from '@/components/AuthLogo'

export default {
    name: 'Main',
    components: { AuthLogo },
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
