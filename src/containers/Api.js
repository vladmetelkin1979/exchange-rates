import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Wrapper from '../components/Wrapper'

const mapStateToProps = state => ({
    date: state.readyApi.date,
    previousDate: state.readyApi.previousDate,
    timestamp: state.readyApi.timestamp,
    valutes: state.readyApi.valutes
})

// Странно тут назначать propTypes а не в компоненте. Инкапсуляция нарушается.
Wrapper.propTypes = {
    date: PropTypes.string,
    previousDate: PropTypes.string,
    timestamp: PropTypes.string,
    valutes: PropTypes.array
}


export default connect(mapStateToProps)(Wrapper)

