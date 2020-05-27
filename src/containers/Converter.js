import { connect } from 'react-redux'
import Converter from '../components/Converter'
import { setInput, firstSelect, secondSelect, result, count } from '../actions'

const validationInput = (value) => {
    switch (true) {
        case value === '': return 'введите число'
        case isNaN(value) === true: return 'введен нечисловой символ'
        case !/[^\s]/gim.test(value): return 'удалите пробелы'
        default: return parseFloat(value)
    }
}

const mapStateToProps = (state) => ({
    valutes: state.readyApi.valutes,
    getInput: state.convertation.input,
    firstSelect: state.convertation.firstSelect,
    secondSelect: state.convertation.secondSelect,
    result: state.convertation.result
})

const mapDispatchToProps = (dispatch) => ({
    changeInput: (e) => {
        e.preventDefault()
        const validly = validationInput(e.target.value)
        if (typeof validly === 'number') {
            dispatch(setInput(validly))
            dispatch(count())
        } else {
            dispatch(setInput(0))
            dispatch(result(validly))
        }
    },
    changeFirstOption: (e) => {
        dispatch(firstSelect(e.target.value))
        dispatch(count())
    },
    changeSecondOption: (e) => {
        dispatch(secondSelect(e.target.value))
        dispatch(count())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Converter)

