# Проект: «Simple Chat»

Задачи:

-   Разработка структуры базы данных
-   Создание базы данных на Mongo DB
-   Реализовать backend часть на Nest.js
-   REST API
-   Подключить Web Socket'ы
-   Реализовать frontend часть на Vue.js
-   Создать мобильное приложение

## Участники

| Учебная группа | Имя пользователя | ФИО          |
| -------------- | ---------------- | ------------ |
| 181-322        | @nikita220800    | Поздняков Н. |
| 181-322        | @fusioneery      | Абрамов В.   |
| 181-321        | @megas781        | Калачев Г.   |

# Установка

Для запуска на ПК должны быть установлены:
[Node.js](https://nodejs.org/);
[Yarn](https://yarnpkg.com/);
[Vue-CLI](https://cli.vuejs.org/guide/installation.html);
[Git](https://git-scm.com/);

Склонируйте репозиторий

```sh
$ git clone https://github.com/nikita220800/simple-chat.git
```

### 1) Настройка Nest.js

В корне проекта установите необходимые пакеты node_modules

```sh
$ yarn install
```

### 2) Создайте файл .env.development и скопируйте в него содержимое файла .env.example

### 3) В системе должна быть запущена mongoDB

Создайте базу данных с названием "simple-chat"

В базе данных должны быть следующие коллекции:

```sh
$ chats
$ messages
$ tokens
$ users
```

### 4) Запустите Nest.js

```sh
$ yarn start:dev
```

### 2) Настройка Vue

Из корня проекта перейдите в папку frontend и сделайте установку необходимых зависимостей

```sh
$ cd ./frontend/
$ yarn install
```

Создайте файл .env.development и введите эти значения

```sh
$ BASE_URL=http://127.0.0.1:3000
$ VUE_APP_SOCKET_URL=http://127.0.0.1:3080
```

Убедитесь, что в редакторе (если у вас VS Code) установлены:
[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode);
[ESlint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Запустите проект

```sh
$ yarn serve
```

(Nest и Vue нужно запускать в отдельных терминалах)
