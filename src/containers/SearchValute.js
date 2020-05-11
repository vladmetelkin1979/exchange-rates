// Почему эта функция в сонтейнерах и еще с большой буквы файл
// Выглядит как Контейнер
// Можно переписать проще типа
// listValute.find(element => element.Name === valute)
export default function searchValute(valute, listValute) {              
    const firstDefaultSelect = listValute.filter((element) => {
        if (element.Name === valute) {
            return element
        }
        return false
    })

    return firstDefaultSelect[0]
}
