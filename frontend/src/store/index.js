import Vue from 'vue'
import Vuex from 'vuex'

import appParams from '@/store/modules/app-params'
import chatList from '@/store/modules/chat-list'
import openedChat from '@/store/modules/opened-chat'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        appParams,
        chatList,
        openedChat,
    },
})
