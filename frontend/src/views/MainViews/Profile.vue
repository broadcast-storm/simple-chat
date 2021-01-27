<template>
    <div class="chats-openedchat-container">
        <ChatList class="chats-list" />
        <OpenedChat class="opened-chat" />
    </div>
</template>

<script>
import ChatList from '@/components/ChatList'
import OpenedChat from '@/components/OpenedChat'

export default {
    name: 'Profile',
    components: { ChatList, OpenedChat },
    props: {},
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
</style>
