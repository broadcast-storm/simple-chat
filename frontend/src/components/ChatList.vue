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
            :class="{ 'empty-list': getChatList.length === 0 }"
        >
            <template v-if="!isChatListLoading">
                <b-list-group-item
                    v-for="chat in getChatList"
                    :key="chat.id"
                    class="d-flex justify-content-between align-items-start chat-item px-2"
                    button
                    @click="changeChatId(chat.chatId)"
                >
                    <div class="chat-item__info">
                        <b-avatar size="40px"></b-avatar>
                        <div class="text">
                            <span class="pl-2 name">{{ chat.name }}</span>
                            <span class="pl-2 message">{{
                                chat.last_message
                            }}</span>
                        </div>
                    </div>
                    <div class="chat-item__last-msg">
                        <span class="chat-item__last-msg__date">{{
                            chat.last_message_date
                        }}</span>
                        <b-badge
                            v-if="chat.unread_count !== 0"
                            variant="primary"
                            pill
                            >{{ chat.unread_count }}
                        </b-badge>
                    </div>
                </b-list-group-item>
                <div v-if="getChatList.length === 0" class="no-chats">
                    <span>У вас нет чатов</span>
                    <br />
                    <span>Начните общаться! =)</span>
                </div>
            </template>
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
    },
    methods: {
        ...mapMutations('appParams', { changeChatId: OPENED_CHAT_ID_CHANGE }),
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
