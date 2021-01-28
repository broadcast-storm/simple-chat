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
import { mapGetters } from 'vuex'

import ChatList from '@/components/ChatList'
import OpenedChat from '@/components/OpenedChat'

export default {
    name: 'Profile',
    components: { ChatList, OpenedChat },
    props: {},
    computed: {
        ...mapGetters('appParams', ['getWindowWidth', 'getOpenedChatId']),
    },
    mounted() {
        console.log(this.getWindowWidth)
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
