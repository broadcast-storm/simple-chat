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
import { mapActions, mapGetters } from 'vuex'
import { AUTH_REQUEST } from '@/store/action-types/user-info'
import { CHAT_LIST_REQUEST } from '@/store/action-types/chat-list'

export default {
    name: 'Main',
    components: { Navbar, LoadingOverlay },
    data() {
        return {
            routesList,
            showOverlay: true,
        }
    },
    computed: {
        ...mapGetters('userInfo', ['getIsAuthentificated']),
    },

    async mounted() {
        try {
            if (!localStorage.getItem('token')) {
                this.$router.push(routesList.authPage.children.signInPage)
            } else {
                if (!this.getIsAuthentificated) await this.AUTH_REQUEST()
                await this.CHAT_LIST_REQUEST()
                this.showOverlay = false
            }
        } catch (error) {
            console.log(error)
            this.$router.push(routesList.authPage.children.signInPage)
        }
    },
    methods: {
        ...mapActions('userInfo', [AUTH_REQUEST]),
        ...mapActions('chatList', [CHAT_LIST_REQUEST]),
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
