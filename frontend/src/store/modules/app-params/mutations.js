import { WINDOW_WIDTH_UPDATE } from '@/store/action-types/app-params'

const mutations = {
    [WINDOW_WIDTH_UPDATE]: (state, payload) => {
        state.windowWidth = payload
    },
}

export default mutations
