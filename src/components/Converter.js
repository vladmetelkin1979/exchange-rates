import React from 'react'
import { setInput, firstSelect, secondSelect, result, count } from '../actions'

class Converter extends React.Component {
  constructor(props) {
    super(props)
    this.changeInput = this.changeInput.bind(this)
    this.changeFirstOption = this.changeFirstOption.bind(this)
    this.changeSecondOption = this.changeSecondOption.bind(this)
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
    dispatch(count())
  }

  changeFirstOption(e) {
    const { dispatch } = this.props
    dispatch(firstSelect(this.props.valutes.find((valute) => {
      return valute.Name === e.target.value
    }))
    )
    dispatch(count())
  }

  changeSecondOption(e) {
    const { dispatch } = this.props
    dispatch(secondSelect(this.props.valutes.find((valute) => {
      return valute.Name === e.target.value
    }))
    )
    dispatch(count()) 
  }

  render() {   
    return (
      <div className="container center-align">
        <input defaultValue={this.props.getInput} onChange={this.changeInput} />
        <h6>Из</h6>
        <select style={{ display: 'block' }}
          value={this.props.firstSelect.Name}
          onChange={this.changeFirstOption}
        >
          {this.props.valutes.map((option) => {
            return <option key={option.ID}>{option.Name}</option>
          })}
        </select>
        <h6>перевести в</h6>
        <select style={{ display: 'block' }}
          value={this.props.secondSelect.Name}
          onChange={this.changeSecondOption}
        >
          {this.props.valutes.map((option) => {
            return <option key={option.ID}>{option.Name}</option>
          })}
        </select>
        <h3>

          {/* validation result after entering into input */}
          {typeof this.props.result !== 'number'
            || Number.isNaN(this.props.result)
            || this.props.getInput === '' ?            
            'введите число'
            :
            this.props.result.toFixed(2) + ' ' + this.props.secondSelect.CharCode}

        </h3>
      </div>
    )
  }
}

export default Converter