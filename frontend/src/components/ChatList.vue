<template>
    <b-card class="comp-container" no-body>
        <b-card-header class="py-0 chat-header">
            <b-form-input placeholder="Поиск..." size="sm"></b-form-input>
        </b-card-header>

        <b-card-body class="list-container">
            <b-list-group-item
                class="d-flex justify-content-between align-items-center chat-item px-2"
                button
            >
                <div class="chat-item__info">
                    <b-avatar size="40px"></b-avatar>
                    <div class="text">
                        <span class="pl-2 name">Имя Фамилия</span>
                        <span class="pl-2 message"
                            >Текст последнего сообщения...</span
                        >
                    </div>
                </div>

                <b-badge variant="primary" pill>2</b-badge>
            </b-list-group-item>
        </b-card-body>
    </b-card>
</template>

<script>
export default {
    name: 'ChatList',
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
        }
    }
}
</style>
