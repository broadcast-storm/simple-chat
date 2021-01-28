<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { WINDOW_WIDTH_UPDATE } from '@/store/action-types/app-params'

export default {
    data() {
        return {
            windowWidth: window.innerWidth,
        }
    },
    async mounted() {
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize)
        })
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize)
    },
    methods: {
        ...mapMutations('appParams', {
            updateWindowWidth: WINDOW_WIDTH_UPDATE,
        }),
        onResize() {
            if (window.innerWidth !== this.windowWidth) {
                this.windowWidth = window.innerWidth
                this.updateWindowWidth(window.innerWidth)
            }
        },
    },
}
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
    font-family: Helvetica;
    font-style: normal;
    font-weight: normal;
}
html {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
}
</style>
