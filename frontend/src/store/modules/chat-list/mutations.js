import { CHAT_LIST_SUCCESS } from '@/store/action-types/chat-list'

const mutations = {
    [CHAT_LIST_SUCCESS]: (state, chatList) => {
        state.chatList = chatList
        state.isLoading = false
    },
}

export default mutations
