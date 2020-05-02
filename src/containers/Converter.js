import React from 'react'
import { connect } from 'react-redux'
import { setInput, firstSelect, secondSelect, result, count } from '../actions'
import SearchValute from './SearchValute'
import CreateInput from '../components/CreateInput'
import CreateSelect from '../components/CreateSelect'
import PropTypes from 'prop-types'

class Converter extends React.Component {
    constructor(props) {
        super(props)
        this.changeInput = this.changeInput.bind(this)
        this.changeFirstOption = this.changeFirstOption.bind(this)
        this.changeSecondOption = this.changeSecondOption.bind(this)
        this.props.list.push({
            ID: 'R0000',
            NumCode: '000',
            CharCode: 'RUB',
            Nominal: 1,
            Name: 'Российских рублей',
            Value: 1,
            Previous: 1
        })        
    }

    componentDidMount() {
        const { dispatch } = this.props        
        dispatch(firstSelect(SearchValute('Доллар США', this.props.list)))        
        dispatch(secondSelect(SearchValute('Российских рублей', this.props.list)))
        dispatch(count())
    }

    changeInput(e) {
        e.preventDefault()
        const { dispatch } = this.props
        if (e.target.value === '') {
            dispatch(result(e.target.value))
        }
        if (!e.target.value.trim()) {
            return
        }
        dispatch(setInput(e.target.value))
        dispatch(count(e.target.value))
    }

    changeFirstOption(e) {
        e.preventDefault()
        const { dispatch } = this.props
        dispatch(firstSelect(SearchValute(e.target.value, this.props.list)))
        dispatch(count(e.target.value))
    }

    changeSecondOption(e) {
        e.preventDefault()
        const { dispatch } = this.props
        dispatch(secondSelect(SearchValute(e.target.value, this.props.list)))
        dispatch(count(e.target.value))
    }
    render() {
        return <div>
            <CreateInput changeInput={this.changeInput} defaultValue={this.props.getInput} />
            <CreateSelect list={this.props.list}
                changeFirstOption={this.changeFirstOption}
                changeSecondOption={this.changeSecondOption} />
            <h3>{typeof this.props.result !== 'number' || Number.isNaN(this.props.result) || this.props.getInput === '' ? 'введите число' : this.props.result.toFixed(2) + ' ' + this.props.secondSelect.CharCode}</h3>
        </div>
    }
}

Converter.propTypes = {    
    getInput: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    firstSelect: PropTypes.object,
    secondSelect: PropTypes.object,
    result: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    SearchValute: PropTypes.func
}

const mapStateToProps = (state) => {    
    return {
        getInput: state.convertation.input,
        firstSelect: state.convertation.firstSelect,
        secondSelect: state.convertation.secondSelect,
        result: state.convertation.result
    }
}

export default connect(mapStateToProps)(Converter)

