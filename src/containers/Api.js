import { connect } from 'react-redux'
import Wrapper from '../components/Wrapper'
import { readyApi } from '../actions'


const mapStateToProps = state => ({
    date: state.readyApi.date,
    previousDate: state.readyApi.previousDate,
    timestamp: state.readyApi.timestamp,
    valutes: state.readyApi.valutes
})

const mapDispatchToProps = dispatch => ({
    getApi: () => {
        fetch('https://www.cbr-xml-daily.ru/daily_json.js')
            .then((response) => {
                if (response.ok === true) {
                    return response
                } else {
                    let error = new Error(response.statusText)
                    error.response = response
                    throw error
                }
            })
            // Зачем этот then. Тут в предыдущем then значение возвращается а не промис. Можно это сделать в предыдущем блоке
            .then((response) => {
                if (typeof response !== 'object') {
                    let error = new Error('Получен недопустимый формат данных')
                    throw error
                }
                return response;
            })
            .then((response) => {
                return response.json()
            })
            .then((API) => {
                dispatch(readyApi(API))
            })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper)

