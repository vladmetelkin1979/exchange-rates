import React from 'react'
import { connect } from 'react-redux'
import getRequestApi from '../actions'
import Converter from './Converter'
import CreateTable from '../components/CreateTable'
import PropTypes from 'prop-types'

class Api extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getRequestApi())
    }
    render() {
        const { getload } = this.props
        if (typeof getload !== 'object') {
            return <h3 className="container center-align">Загрузка данных...</h3>
        } else {
            const date = new Date(Date.parse(getload.Date)).toLocaleString(),
                previousDate = new Date(Date.parse(getload.PreviousDate)).toLocaleString(),
                timestamp = new Date(Date.parse(getload.Timestamp)).toLocaleString(),
                valute = getload.Valute
            const arrayList = []

            for (const key in valute) {
                if (valute.hasOwnProperty(key)) {
                    arrayList.push(valute[key])
                }
            }

            const list = arrayList.map((prop) => {
                return <CreateTable key={prop.ID} name={prop.Name} code={prop.CharCode} value={prop.Value} target={prop.Nominal} />
            })

            return (<div className="container center-align">
                <Converter  list={arrayList} />                                           
                <h5 style={{ marginTop: '2em' }}>Курс на: {date}</h5>
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
    return {
        getload: state.requestApi.getload
    }
}

export default connect(mapStateToProps)(Api)

