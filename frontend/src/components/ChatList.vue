<template>
    <b-card class="comp-container" no-body>
        <b-card-header class="py-0 chat-header">
            <b-form-input
                placeholder="Поиск пользователей..."
                size="sm"
            ></b-form-input>
        </b-card-header>

        <b-card-body
            class="list-container"
            :class="{
                'empty-list': getChatList === null || getChatList.length === 0,
            }"
        >
            <template v-if="!isChatListLoading">
                <b-list-group-item
                    v-for="chat in getChatList"
                    :key="chat.id"
                    class="d-flex justify-content-between align-items-start chat-item px-2"
                    button
                    @click="changeChatId(chat._id)"
                >
                    <div class="chat-item__info">
                        <b-avatar size="40px"></b-avatar>
                        <div class="text">
                            <span class="pl-2 name">{{
                                getUserName(chat)
                            }}</span>
                            <span class="pl-2 message">{{
                                chat.last_message
                            }}</span>
                        </div>
                    </div>
                    <div class="chat-item__last-msg">
                        <span class="chat-item__last-msg__date">{{
                            getTimeOfLastMessage(chat.last_message_date)
                        }}</span>
                        <b-badge
                            v-if="getUnreadCount(chat) !== 0"
                            variant="primary"
                            pill
                            >{{ getUnreadCount(chat) }}
                        </b-badge>
                    </div>
                </b-list-group-item>
                <div v-if="getChatList.length === 0" class="no-chats">
                    <span>У вас нет чатов</span>
                    <br />
                    <span>Начните общаться! =)</span>
                </div>
            </template>
            <b-spinner
                v-else
                label="Spinning"
                variant="primary"
                small
                class="ml-2"
            ></b-spinner>
        </b-card-body>
    </b-card>
</template>

<script>
import { OPENED_CHAT_ID_CHANGE } from '@/store/action-types/app-params'
import { mapMutations, mapGetters } from 'vuex'

export default {
    name: 'ChatList',
    computed: {
        ...mapGetters('chatList', ['getChatList', 'isChatListLoading']),
        ...mapGetters('userInfo', ['getUserMainInfo']),
    },
    methods: {
        ...mapMutations('appParams', { changeChatId: OPENED_CHAT_ID_CHANGE }),
        getUserName(chat) {
            const user = chat.users.find(
                (user) => user._id !== this.getUserMainInfo._id
            )
            const resName = user.name + ' ' + user.surname
            return resName.length > 20 ? resName.slice(0, 20) + '...' : resName
        },
        getUnreadCount(chat) {
            const user = chat.userHasRead.find(
                (user) => user.userId === this.getUserMainInfo._id
            )
            return user.unread_count
        },
        getTimeOfLastMessage(time) {
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
                    ][msgDate.getMonth()]
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
    .chat-header {
        box-sizing: border-box;
        border-radius: 0;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .list-container {
        padding: 0;
        overflow-y: scroll;

        .chat-item {
            border-left: none;
            border-right: none;
            border-top: none;
            &__info {
                display: flex;
                align-items: center;
                .text {
                    display: flex;
                    flex-direction: column;
                }
                .message {
                    font-size: 0.8rem;
                }
            }

            &__last-msg {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: flex-end;
                &__date {
                    padding-top: 2px;
                    font-size: 0.8rem;
                }
            }
        }

        .no-chats {
            text-align: center;
            color: $basic-grey-dark;
        }
    }
    .empty-list {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
