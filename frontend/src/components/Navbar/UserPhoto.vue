<template>
    <div>
        <b-img
            id="user-photo"
            v-bind="mainProps"
            rounded="circle"
            alt=""
            :src="defaultImg"
        >
        </b-img>
        <b-popover target="user-photo" triggers="click blur" placement="bottom">
            <template #title>{{
                getUserMainInfo.name + ' ' + getUserMainInfo.surname
            }}</template>
            <p class="logout" @click="logout()">Выйти</p>
            <p class="logout" @click="logoutAll()">Выйти со всех устройств</p>
        </b-popover>
    </div>
</template>

<script>
import routesList from '@/router/routesList'
import {
    AUTH_LOGOUT,
    CLEAR_ALL,
    AUTH_LOGOUT_ALL_DEVICES,
} from '@/store/action-types/user-info'
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'UserPhoto',
    components: {},
    data() {
        return {
            mainProps: {
                blank: false,
                blankColor: '#ffffff',
                width: 38,
                height: 38,
                class: 'user-image',
            },
            defaultImg: require('@/assets/images/profile-user.png'),
        }
    },
    computed: {
        ...mapGetters('userInfo', ['getUserMainInfo']),
    },
    methods: {
        ...mapActions('userInfo', [
            AUTH_LOGOUT,
            CLEAR_ALL,
            AUTH_LOGOUT_ALL_DEVICES,
        ]),
        async logout() {
            try {
                await this.AUTH_LOGOUT()
                this.$router.push(routesList.authPage.children.signInPage, () =>
                    this.CLEAR_ALL()
                )
            } catch (error) {
                console.log(error)
            }
        },
        async logoutAll() {
            try {
                await this.AUTH_LOGOUT_ALL_DEVICES()
                this.$router.push(routesList.authPage.children.signInPage, () =>
                    this.CLEAR_ALL()
                )
            } catch (error) {
                console.log(error)
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.user-image {
    cursor: pointer;
}
.logout:hover {
    color: red;
    cursor: pointer;
}
</style>
