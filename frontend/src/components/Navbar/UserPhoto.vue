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
            <template #title>Никита Позд</template>
            Example
        </b-popover>
    </div>
</template>

<script>
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
}
</script>

<style lang="scss" scoped>
.user-image {
    cursor: pointer;
}
</style>
