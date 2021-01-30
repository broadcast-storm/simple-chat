<template>
    <div class="chats-openedchat-container">
        <ChatList
            v-if="getWindowWidth > 768 || getOpenedChatId === null"
            class="chats-list"
        />
        <OpenedChat
            v-if="getWindowWidth > 768 || getOpenedChatId !== null"
            class="opened-chat"
        />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { MESSAGES_REQUEST } from '@/store/action-types/opened-chat'
import ChatList from '@/components/ChatList'
import OpenedChat from '@/components/OpenedChat'

export default {
    name: 'Profile',
    components: { ChatList, OpenedChat },
    props: {},
    computed: {
        ...mapGetters('appParams', ['getWindowWidth', 'getOpenedChatId']),
        ...mapGetters('appParams', ['getOpenedChatId']),
    },
    watch: {
        getOpenedChatId: async function (chatId) {
            if (chatId !== null) await this.MESSAGES_REQUEST(chatId)
        },
    },
    methods: {
        ...mapActions('openedChat', [MESSAGES_REQUEST]),
    },
}
</script>

<style lang="scss" scoped>
.chats-openedchat-container {
    height: 100%;
    display: flex;
    .chats-list {
        width: 35%;
    }
    .opened-chat {
        width: 65%;
    }
}
@media (max-width: 768px) {
    .chats-openedchat-container {
        .chats-list {
            width: 100%;
        }
        .opened-chat {
            width: 100%;
        }
    }
}
</style>
