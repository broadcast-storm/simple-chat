import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuelidate from 'vuelidate'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import VueSocketIO from 'vue-socket.io'

Vue.use(
    new VueSocketIO({
        debug: true,
        connection: process.env.VUE_APP_SOCKET_URL,
        vuex: {
            store,
            actionPrefix: 'SOCKET_',
            mutationPrefix: 'SOCKET_',
        },
        options: {}, //Optional options
    })
)

Vue.config.productionTip = false

Vue.use(Vuelidate)

Vue.use(BootstrapVue)

Vue.use(IconsPlugin)

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app')
