import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Converter from '../components/Converter'

Converter.propTypes = {
    getInput: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    firstSelect: PropTypes.object,
    secondSelect: PropTypes.object,
    result: PropTypes.oneOfType([PropTypes.string, PropTypes.number])   
}

const mapStateToProps = (state) => ({
    valutes: state.readyApi.valutes,
    getInput: state.convertation.input,
    firstSelect: state.convertation.firstSelect,
    secondSelect: state.convertation.secondSelect,
    result: state.convertation.result
})

export default connect(mapStateToProps)(Converter)

