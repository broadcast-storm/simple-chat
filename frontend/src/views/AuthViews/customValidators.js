export const isLoginAvailable = (value) => {
    if (value === '') {
        return true
    }
    const taken = ['username', 'matt', 'matthew']
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(!taken.includes(value))
        }, 500)
    })
}

export const isEmailAvailable = (value) => {
    if (value === '') {
        return true
    }
    const taken = ['example@mail.ru', 'example@gmail.com', 'example@yandex.ru']
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(!taken.includes(value))
        }, 500)
    })
}
