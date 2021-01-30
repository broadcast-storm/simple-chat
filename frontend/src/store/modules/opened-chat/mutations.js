import {
    MESSAGES_SUCCESS,
    CLEAR_OPENED_CHAT,
    OPENED_CHAT_ID_CHANGE,
    OPENED_CHAT_USER_CHANGE,
} from '@/store/action-types/opened-chat'

const mutations = {
    [MESSAGES_SUCCESS]: (state, messagesList) => {
        state.messagesList = messagesList
        state.isLoading = false
    },
    [OPENED_CHAT_ID_CHANGE]: (state, payload) => {
        state.openedChatId = payload
    },
    [OPENED_CHAT_USER_CHANGE]: (state, payload) => {
        state.userInfo = payload
    },
    [CLEAR_OPENED_CHAT]: (state) => {
        state.messagesList = null
        state.userInfo = null
        state.isLoading = true
    },
}

export default mutations
