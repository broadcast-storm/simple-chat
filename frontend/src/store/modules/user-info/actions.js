import axios from 'axios'
import {
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_LOGOUT,
    FIRST_AUTH_REQUEST,
    FIRST_AUTH_REQUEST_SUCCESS,
    AUTH_LOGOUT_SUCCESS,
    CLEAR_ALL,
    AUTH_LOGOUT_ALL_DEVICES,
} from '@/store/action-types/user-info'

import { CLEAR_OPENED_CHAT } from '@/store/action-types/opened-chat'
import { CLEAR_CHAT_LIST } from '@/store/action-types/chat-list'

const actions = {
    [AUTH_REQUEST]: async ({ commit }) => {
        try {
            const response = await axios.get('/api/auth/signInByToken', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            commit(AUTH_SUCCESS, {
                ...response.data,
            })
        } catch (error) {
            localStorage.removeItem('token')
            throw error
        }
    },
    [FIRST_AUTH_REQUEST]: async ({ commit }, userCredentials) => {
        try {
            const response = await axios.post('/api/auth/signIn', {
                headers: {
                    'Content-Type': 'application/json',
                },
                email: userCredentials.email,
                password: userCredentials.password,
            })
            localStorage.setItem('token', response.data.accessToken)
            commit(FIRST_AUTH_REQUEST_SUCCESS, {
                ...response.data,
            })
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    [AUTH_LOGOUT]: async () => {
        try {
            await axios.get('/api/auth/logout', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                params: {
                    token: localStorage.getItem('token'),
                },
            })
            localStorage.removeItem('token')
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    [AUTH_LOGOUT_ALL_DEVICES]: async () => {
        try {
            await axios.get('/api/auth/logout-all-devices', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            localStorage.removeItem('token')
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    [CLEAR_ALL]: ({ commit }) => {
        try {
            commit(AUTH_LOGOUT_SUCCESS)
            commit(`openedChat/${CLEAR_OPENED_CHAT}`, null, { root: true })
            commit(`chatList/${CLEAR_CHAT_LIST}`, null, { root: true })
        } catch (error) {
            console.log(error)
            throw error
        }
    },
}

export default actions
