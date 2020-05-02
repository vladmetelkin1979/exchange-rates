export default function searchValute(valute, listValute) {              
    const firstDefaultSelect = listValute.filter((element) => {
        if (element.Name === valute) {
            return element
        }
        return false
    })

    return firstDefaultSelect[0]
}
