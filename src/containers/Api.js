import React from 'react'
import { connect } from 'react-redux'
import getRequestApi from '../actions'
import Converter from './Converter'
import CreateTable from '../components/CreateTable'
import PropTypes from 'prop-types'

// Не понял чем Containers отличаются от Components
// Обычно в Containers нет верстки
class Api extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getRequestApi())
    }
    render() {
        const { getload } = this.props
        // Странный элемент стора. Лучше просто завести в значения в сторе. 1 для ошибки а другое для данных
        if (typeof getload !== 'object') {
            return <h3 className="container center-align">Загрузка данных...</h3>
        } else {
            const date = new Date(Date.parse(getload.Date)).toLocaleString(),
                previousDate = new Date(Date.parse(getload.PreviousDate)).toLocaleString(),
                timestamp = new Date(Date.parse(getload.Timestamp)).toLocaleString(),
                valute = getload.Valute
            const arrayList = []

            for (const key in valute) {
                // Можно было при загрузке данных преобьразовывать их в удобный формат и хранить в сторе в удобном формате
                // Либо тут использоать Object.values() для получения списка значений
                if (valute.hasOwnProperty(key)) {
                    arrayList.push(valute[key])
                }
            }

            const list = arrayList.map((prop) => {
                // В стрелочной функции если сразу идет возврат можно без return обойтись
                // Судя повсему это строка таблицы создается а называется Table. Не очевидно
                return <CreateTable key={prop.ID} name={prop.Name} code={prop.CharCode} value={prop.Value} target={prop.Nominal} />
            })

            return (<div className="container center-align">
                <Converter  list={arrayList} />                                           
                <h5 style={{ marginTop: '2em' }}>Курс на: {date}</h5>
                {/* Тут обычно бы писали с использованием шаблонных строк */}
                {/* https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/template_strings */}
                <h5>Предыдущий срез на: {previousDate}</h5>
                <h5>Отметка времени: {timestamp}</h5>
                <table>
                    <thead>
                        <tr>
                            <th>Код</th><th>Номинал</th><th>Валюта</th><th>Курс к рублю</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table>

            </div>)
        }
    }
}

Api.propTypes = {
    getload: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

const mapStateToProps = state => {
    // Тут можно без return написать
    return {
        getload: state.requestApi.getload
    }
}

export default connect(mapStateToProps)(Api)

