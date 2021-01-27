<template>
    <b-card class="comp-container" no-body>
        <b-card-header class="py-0 opened-header">
            <div>
                <b-avatar size="45px"></b-avatar>
                <span class="pl-2">Имя Фамилия</span>
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
        <div class="messages-list">
            <div class="yours messages">
                <div class="message last">
                    <span class="text">Hello, how's it going?</span>
                    <span class="time">15:30</span>
                </div>
            </div>
            <div class="mine messages">
                <div class="message last">
                    <span class="text">
                        How about you? How about you? How about you? How about
                        you? How about you?
                    </span>
                    <span class="time">15:39</span>
                </div>
            </div>
        </div>
        <b-form class="message-form">
            <b-form-textarea
                size="sm"
                placeholder="Написать сообщение..."
                max-rows="8"
                class="message-form__input"
            ></b-form-textarea>
            <button class="message-form__btn">
                <b-img alt="Отправить" :src="defaultImg" class="img"> </b-img>
            </button>
        </b-form>
    </b-card>
</template>

<script>
export default {
    name: 'OpenedChat',
    data() {
        return {
            defaultImg: require('@/assets/images/send.png'),
        }
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
        padding: 0 10px;
        box-sizing: border-box;
        overflow-x: hidden;

        .messages {
            margin-top: 30px;
            display: flex;
            flex-direction: column;
        }

        .message {
            max-width: 80%;
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
            align-items: flex-start;
        }

        .yours .message {
            background-color: #eee;
            position: relative;
        }

        .yours .message.last:before {
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
        .yours .message.last:after {
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
            align-items: flex-end;
        }

        .mine .message {
            color: white;
            background: $basic-blue;
            background-attachment: fixed;
            position: relative;
        }

        .mine .message.last:before {
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

        .mine .message.last:after {
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
</style>
