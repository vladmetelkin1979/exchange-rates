import React from 'react'
import getRequestApi from '../actions'
import Converter from '../containers/Converter'
import Table from './Table'

class Wrapper extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getRequestApi())
    }
    render() {        
        if (typeof this.props.date === 'undefined') {
            return (
                <div>
                    <h3 className="container center-align">Загрузка данных...</h3>
                </div>
            )
        } else {
            return (
                <div className="container center-align">
                    <Converter />
                    <Table
                        date={this.props.date}
                        previousDate={this.props.previousDate}
                        timestamp={this.props.timestamp}
                        valutes={this.props.valutes}
                    />
                </div>
            )
        }
    }
}

export default Wrapper