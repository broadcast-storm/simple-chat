<template>
    <b-card
        class="comp-container"
        :class="{ 'no-chat': getOpenedChatId === null }"
        no-body
    >
        <template v-if="getOpenedChatId !== null">
            <b-card-header class="py-0 opened-header">
                <div>
                    <button class="back-btn" @click="closeOpenedChat()">
                        <LeftArrowSvg class="back-btn__img" />
                    </button>
                    <b-avatar size="45px"></b-avatar>
                    <span class="pl-2">{{ getUserName() }}</span>
                </div>
                <b-dropdown
                    right
                    no-caret
                    variant="link"
                    toggle-class="text-decoration-none"
                >
                    <template #button-content>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </template>
                    <b-dropdown-item href="#">Удалить чат</b-dropdown-item>
                    <b-dropdown-item href="#">Заблокировать</b-dropdown-item>
                </b-dropdown>
            </b-card-header>
            <div
                class="messages-list"
                :class="{
                    'loading-list': isOpenedChatLoading,
                }"
            >
                <template v-if="!isOpenedChatLoading">
                    <div
                        v-for="(message, index) in getMessagesList"
                        :key="message._id"
                        class="message"
                        :class="{
                            mine: message.userId === getUserMainInfo._id,
                            yours: message.userId !== getUserMainInfo._id,
                            last: checkIsMessageLast(index),
                        }"
                    >
                        <span class="text">{{ message.text }}</span>
                        <span class="time">{{
                            getMessageTime(message.date)
                        }}</span>
                    </div>
                </template>
                <b-spinner
                    v-else
                    label="Spinning"
                    variant="primary"
                    small
                    class="ml-2"
                ></b-spinner>
            </div>
            <b-form class="message-form" @submit="onSubmit">
                <b-form-textarea
                    v-model="newMessageText"
                    size="sm"
                    placeholder="Написать сообщение..."
                    max-rows="8"
                    class="message-form__input"
                ></b-form-textarea>
                <button class="message-form__btn" type="submit">
                    <b-img
                        v-if="!isSendingMessage"
                        alt="Отправить"
                        :src="defaultImg"
                        class="img"
                    >
                    </b-img>
                    <b-spinner
                        v-else
                        label="Spinning"
                        variant="primary"
                        small
                    ></b-spinner>
                </button>
            </b-form>
        </template>
        <div v-else class="no-chat">
            <NoChatSvg class="no-chat__img" />
            <span>Выберите чат</span>
        </div>
    </b-card>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
import {
    CLEAR_OPENED_CHAT,
    OPENED_CHAT_ID_CHANGE,
    SEND_MESSAGE,
} from '@/store/action-types/opened-chat'
import LeftArrowSvg from '@/assets/icons/left-arrow.svg'
import NoChatSvg from '@/assets/icons/chat.svg'

export default {
    name: 'OpenedChat',
    components: { LeftArrowSvg, NoChatSvg },
    data() {
        return {
            defaultImg: require('@/assets/images/send.png'),
            name: '',
            newMessageText: '',
            isSendingMessage: false,
        }
    },
    computed: {
        ...mapGetters('userInfo', ['getUserMainInfo']),
        ...mapGetters('chatList', ['getChatList']),
        ...mapGetters('openedChat', [
            'getMessagesList',
            'isOpenedChatLoading',
            'getOpenedChatId',
            'getOpenedChatUserInfo',
        ]),
    },
    methods: {
        ...mapMutations('openedChat', {
            clearMessages: CLEAR_OPENED_CHAT,
            changeChatId: OPENED_CHAT_ID_CHANGE,
            sendMessage: SEND_MESSAGE,
        }),
        ...mapActions('openedChat', [SEND_MESSAGE]),
        async onSubmit(evt) {
            evt.preventDefault()
            try {
                if (this.newMessageText !== '' && !this.isSendingMessage) {
                    this.isSendingMessage = true
                    await this.SEND_MESSAGE({
                        text: this.newMessageText,
                        chatId: this.getOpenedChatId,
                    })
                    this.isSendingMessage = false
                    this.newMessageText = ''
                }
            } catch (error) {
                console.log(error)
                this.isSendingMessage = false
            }
        },
        closeOpenedChat() {
            this.clearMessages()
            this.changeChatId(null)
        },
        checkIsMessageLast(index) {
            if (
                parseInt(index) + 1 <
                Object.keys(this.getMessagesList).length
            ) {
                return (
                    this.getMessagesList[parseInt(index) + 1].userId !==
                    this.getMessagesList[parseInt(index)].userId
                )
            } else {
                return true
            }
        },
        getUserName() {
            return (
                this.getOpenedChatUserInfo.name +
                ' ' +
                this.getOpenedChatUserInfo.surname
            )
        },
        getMessageTime(time) {
            const msgDate = new Date(time)
            const today = new Date()
            if (
                msgDate.getDate() === today.getDate() &&
                msgDate.getMonth() === today.getMonth() &&
                msgDate.getFullYear() === today.getFullYear()
            ) {
                return (
                    (msgDate.getHours() < 10
                        ? '0' + msgDate.getHours()
                        : msgDate.getHours()) +
                    ':' +
                    (msgDate.getMinutes() < 10
                        ? '0' + msgDate.getMinutes()
                        : msgDate.getMinutes())
                )
            } else {
                return (
                    msgDate.getDate() +
                    ' ' +
                    [
                        'янв',
                        'фев',
                        'мар',
                        'апр',
                        'мая',
                        'июн',
                        'июл',
                        'авг',
                        'сен',
                        'окт',
                        'ноя',
                        'дек',
                    ][msgDate.getMonth()] +
                    ' ' +
                    ((msgDate.getHours() < 10
                        ? '0' + msgDate.getHours()
                        : msgDate.getHours()) +
                        ':' +
                        (msgDate.getMinutes() < 10
                            ? '0' + msgDate.getMinutes()
                            : msgDate.getMinutes()))
                )
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.comp-container {
    height: 100%;
    border-radius: 0 !important;
    flex-direction: column;
    box-sizing: border-box;

    .opened-header {
        box-sizing: border-box;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 0;

        .back-btn {
            border: none;
            background-color: transparent;
            margin-right: 5px;
            display: none;
            &__img {
                width: 30px;
            }
        }

        .dot {
            width: 5px;
            height: 5px;
            margin-bottom: 3px;
            background-color: gray;
            border-radius: 50%;
        }
        .dot:hover {
            background-color: $basic-grey-dark;
        }
    }

    .messages-list {
        height: 100%;
        overflow-y: scroll;
        padding: 30px 10px 0px 10px;
        box-sizing: border-box;
        overflow-x: hidden;
        // display: flex;
        // flex-direction: column;
        // justify-content: flex-end;

        .message {
            min-width: 150px;
            max-width: 70%;
            border-radius: 20px;
            padding: 8px 15px;
            margin-top: 5px;
            margin-bottom: 5px;
            display: flex;
            flex-direction: column;
            .time {
                text-align: right;
                font-size: 0.8rem;
            }
        }

        .yours {
            background-color: #eee;
            position: relative;
            margin-right: auto;
        }

        .yours.last:before {
            content: '';
            position: absolute;
            z-index: 0;
            bottom: 0;
            left: -7px;
            height: 20px;
            width: 20px;
            background: #eee;
            border-bottom-right-radius: 15px;
        }
        .yours.last:after {
            content: '';
            position: absolute;
            z-index: 1;
            bottom: 0;
            left: -10px;
            width: 10px;
            height: 20px;
            background: white;
            border-bottom-right-radius: 10px;
        }

        .mine {
            color: white;
            background: $basic-blue;
            background-attachment: fixed;
            position: relative;
            margin-left: auto;
        }

        .mine.last:before {
            content: '';
            position: absolute;
            z-index: 0;
            bottom: 0;
            right: -8px;
            height: 20px;
            width: 20px;
            background: $basic-blue;
            background-attachment: fixed;
            border-bottom-left-radius: 15px;
        }

        .mine.last:after {
            content: '';
            position: absolute;
            z-index: 1;
            bottom: 0;
            right: -10px;
            width: 10px;
            height: 20px;
            background: white;
            border-bottom-left-radius: 10px;
        }
        .last {
            margin-bottom: 30px;
        }
    }

    .loading-list {
        justify-content: center;
        align-items: center;
    }

    .message-form {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        border-top: 1px solid rgba(0, 0, 0, 0.125);
        background-color: rgba(0, 0, 0, 0.03);
        padding: 10px 5px;
        box-sizing: border-box;
        &__input {
            width: 100%;
            margin-right: 5px;
            overflow-y: auto !important;
        }
        &__btn {
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: none;
            background-color: transparent;
            .img {
                width: 25px;
            }
        }
    }
}

.no-chat {
    justify-content: center;
    align-items: center;
    .no-chat {
        display: flex;
        flex-direction: column;
        color: $basic-grey-dark;
        &__img {
            width: 50px;
        }
    }
}
@media (max-width: 768px) {
    .comp-container {
        .opened-header {
            padding-left: 5px;
            padding-right: 5px;
            .back-btn {
                display: inline-block;
            }
        }
    }
}
</style>
