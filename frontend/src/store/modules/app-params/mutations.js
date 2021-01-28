import {
    WINDOW_WIDTH_UPDATE,
    OPENED_CHAT_ID_CHANGE,
} from '@/store/action-types/app-params'

const mutations = {
    [WINDOW_WIDTH_UPDATE]: (state, payload) => {
        state.windowWidth = payload
    },
    [OPENED_CHAT_ID_CHANGE]: (state, payload) => {
        state.openedChatId = payload
    },
}

export default mutations
