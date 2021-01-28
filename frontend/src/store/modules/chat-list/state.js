const state = {
    chatList: [
        {
            id: 1,
            chatId: 1,
            photo: null,
            name: 'Вася Пупкин',
            last_message: 'Очень странные дела',
            last_message_date: '10:30',
            unread_count: 3,
        },
        {
            id: 2,
            chatId: 2,
            photo: null,
            name: 'Вася Пупкин',
            last_message: 'Очень странные дела',
            last_message_date: '10:30',
            unread_count: 3,
        },
        {
            id: 3,
            chatId: 3,
            photo: null,
            name: 'Вася Пупкин',
            last_message: 'Очень странные',
            last_message_date: '10:31',
            unread_count: 0,
        },
    ],
    isLoading: false,
}

export default state
