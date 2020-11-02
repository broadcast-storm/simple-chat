import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.config.productionTip = false

Vue.use(BootstrapVue)

Vue.use(IconsPlugin)

new Vue({
    render: (h) => h(App),
    router: router,
}).$mount('#app')
