import {
    AUTH_SUCCESS,
    FIRST_AUTH_REQUEST_SUCCESS,
} from '@/store/action-types/user-info'

const mutations = {
    [AUTH_SUCCESS]: (state, userData) => {
        state.userInfo = {
            _id: userData._id,
            birthday: userData.birthday,
            description: userData.description,
            email: userData.email,
            gender: userData.gender,
            isOnline: userData.isOnline,
            lastTimeOnline: userData.lastTimeOnline,
            login: userData.login,
            name: userData.name,
            surname: userData.surname,
            phone: userData.phone,
            photo: userData.photo,
            photoId: userData.photoId,
            role: userData.role,
            status: userData.status,
        }
        state.isAuthentificated = true
    },
    [FIRST_AUTH_REQUEST_SUCCESS]: (state, userData) => {
        state.userInfo = {
            _id: userData._id,
            birthday: userData.birthday,
            description: userData.description,
            email: userData.email,
            gender: userData.gender,
            isOnline: userData.isOnline,
            lastTimeOnline: userData.lastTimeOnline,
            login: userData.login,
            name: userData.name,
            surname: userData.surname,
            phone: userData.phone,
            photo: userData.photo,
            photoId: userData.photoId,
            role: userData.role,
            status: userData.status,
        }
        state.isAuthentificated = true
    },
}

export default mutations
