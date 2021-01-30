import axios from 'axios'

const AXIOS_YG_API = axios.create({
    timeout: 2000,
})

// if (localStorage.getItem('token') !== null)
//     AXIOS_YG_API.defaults.headers['Authorization'] =
//         'Bearer ' + localStorage.getItem('token')

export { AXIOS_YG_API }
