import axios from 'axios'

export const isLoginAvailable = async (value) => {
    if (value === '') {
        return true
    }
    try {
        const res = await axios.get('/api/auth/checkLogin', {
            params: {
                login: value,
            },
        })
        return !res.data.isExisting
    } catch (error) {
        return true
    }
}

export const isEmailAvailable = async (value) => {
    if (value === '') {
        return true
    }
    try {
        const res = await axios.get('/api/auth/checkEmail', {
            params: {
                email: value,
            },
        })
        return !res.data.isExisting
    } catch (error) {
        return true
    }
}

export const isPasswordSafe = (value) => {
    if (value === '') {
        return true
    }
    return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value)
}
