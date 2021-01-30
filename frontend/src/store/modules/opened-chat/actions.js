import axios from 'axios'
import {
    MESSAGES_REQUEST,
    MESSAGES_SUCCESS,
} from '@/store/action-types/opened-chat'

const actions = {
    [MESSAGES_REQUEST]: async ({ commit }, chatId) => {
        try {
            const response = await axios.get('/api/chat/get-messages', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                params: { chatId: chatId },
            })
            console.log(response.data)
            commit(MESSAGES_SUCCESS, {
                ...response.data,
            })
        } catch (error) {
            console.log(error)
            throw error
        }
    },
}

export default actions
