import React from 'react'
import PropTypes from 'prop-types'

const Converter = (props) => {
  // Сожно сделать деструкцию props прямо в обьявлении функции
  const { getInput, // getInput - не очевидное название
    changeInput,
    changeFirstOption,
    valutes,
    changeSecondOption,
    result
  } = props
  const { firstSelect: { Name: firstName }, secondSelect: { Name: secondName } } = props
  return (
    <div className="container center-align">
      {/* Можно сделать этот input числовым чтобы юзер не мог тут текст ввести */}
      <input defaultValue={getInput} onChange={changeInput} />
      <h6>Из</h6>
      <select style={{ display: 'block' }}
        value={firstName}
        onChange={changeFirstOption} // обычно название onChangeFirstOption
      >
        {valutes.map((option) => {
          return <option key={option.ID}>{option.Name}</option>
        })}
      </select>
      <h6>перевести в</h6>
      <select style={{ display: 'block' }}
        value={secondName}
        onChange={changeSecondOption}
      >
        {valutes.map((option) => {
          return <option key={option.ID}>{option.Name}</option>
        })}
      </select>
      <h3>
        {result}
      </h3>
    </div>
  )
}

Converter.propTypes = {
  getInput: PropTypes.number,
  changeInput: PropTypes.func,
  changeFirstOption: PropTypes.func,
  changeSecondOption: PropTypes.func,
  valutes: PropTypes.array,
  result: PropTypes.string,
  firstName: PropTypes.string,
  secondName: PropTypes.string
}

export default Converter