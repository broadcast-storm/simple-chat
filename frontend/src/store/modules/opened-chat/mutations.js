import {
    MESSAGES_SUCCESS,
    CLEAR_OPENED_CHAT,
} from '@/store/action-types/opened-chat'

const mutations = {
    [MESSAGES_SUCCESS]: (state, messagesList) => {
        state.messagesList = messagesList
        state.isLoading = false
    },
    [CLEAR_OPENED_CHAT]: (state) => {
        state.messagesList = null
        state.isLoading = true
    },
}

export default mutations
