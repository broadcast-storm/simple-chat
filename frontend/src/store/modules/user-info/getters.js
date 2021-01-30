const getters = {
    getUserMainInfo: (state) => {
        return {
            _id: state.userInfo._id,
            gender: state.userInfo.gender,
            login: state.userInfo.login,
            name: state.userInfo.name,
            surname: state.userInfo.surname,
            photoId: state.userInfo.photoId,
        }
    },
    getIsAuthentificated: (state) => state.isAuthentificated,
}

export default getters
