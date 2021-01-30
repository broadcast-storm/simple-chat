import axios from 'axios'
import {
    CHAT_LIST_REQUEST,
    CHAT_LIST_SUCCESS,
} from '@/store/action-types/chat-list'

const actions = {
    [CHAT_LIST_REQUEST]: async ({ commit }) => {
        try {
            const response = await axios.get('/api/chat/get-chatlist', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            console.log(response.data)
            commit(CHAT_LIST_SUCCESS, {
                ...response.data,
            })
        } catch (error) {
            console.log(error)
            throw error
        }
    },
}

export default actions
