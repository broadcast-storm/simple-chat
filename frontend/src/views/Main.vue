<template>
    <div class="main-container">
        <h1>Основной экран</h1>
        <div class="main-container__content">
            <router-view name="main-router" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'Main',
    components: {},
    data() {
        return {}
    },
}
</script>

<style lang="scss">
.main-container {
    box-sizing: border-box;
}
</style>
