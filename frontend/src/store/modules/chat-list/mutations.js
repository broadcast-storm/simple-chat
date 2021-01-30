import {
    CHAT_LIST_SUCCESS,
    CLEAR_CHAT_LIST,
} from '@/store/action-types/chat-list'

const mutations = {
    [CHAT_LIST_SUCCESS]: (state, chatList) => {
        state.chatList = chatList
        state.isLoading = false
    },
    [CLEAR_CHAT_LIST]: (state) => {
        state.chatList = null
        state.isLoading = true
        state.newUserList = null
    },
}

export default mutations
