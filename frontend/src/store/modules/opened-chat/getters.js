const getters = {
    getMessagesList: (state) => state.messagesList,
    isOpenedChatLoading: (state) => state.isLoading,
    getOpenedChatId: (state) => state.openedChatId,
    getOpenedChatUserInfo: (state) => state.userInfo,
}

export default getters
