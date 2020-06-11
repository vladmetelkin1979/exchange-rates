import React from 'react'
import { setInput, firstSelect, secondSelect, result, count } from '../actions'

// Тут можно использовать функциональный компонент. Нет стейта и нет методов жизненного цикла
class Converter extends React.Component {
  constructor(props) {
    super(props)
    // Можно использовать стрелочные функции и не нужно будет делать bind
    this.changeInput = this.changeInput.bind(this)
    this.changeFirstOption = this.changeFirstOption.bind(this)
    this.changeSecondOption = this.changeSecondOption.bind(this)
  }

  changeInput(e) {
    e.preventDefault()
    const { dispatch } = this.props
    // Если я очищаю поле то в стейте остается старое значение и если я потом меняю валюту то получаю странный результат
    if (e.target.value === '') {
      dispatch(result(e.target.value))
    }
    // Если я выделяю все значение и меняю на пробел то ничего сбрасывается
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
          {/* Зачем так много условий? Наерняка там как-то проще можно сделать */}
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