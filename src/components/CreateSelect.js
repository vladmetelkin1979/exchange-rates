import React from 'react'
import searchValute from './../containers/SearchValute'
import PropTypes from 'prop-types'

function CreateOption(props) {
    return (
        <option>{props.Name}</option>
    )
}

function CreateSelect(props) {
    const list = props.list,         
    changeFirstOption = props.changeFirstOption,    
    changeSecondOption = props.changeSecondOption        
    return (<div>
        <h6>Из</h6>
        <select style={{display: 'block'}} defaultValue = {searchValute('Доллар США', list).Name} onChange = {changeFirstOption}> 
             {list.map((option) => {                 
                    return <CreateOption key={option.ID} value={option.Name} CharCode={option.CharCode} Name={option.Name} />
                })}                 
        </select>
        <h6>перевести в</h6>
        <select style={{display: 'block'}} defaultValue = {searchValute('Российских рублей', list).Name} onChange={changeSecondOption}>
            {list.map((option) => {
                    return <CreateOption key={option.ID} value={option.Name} CharCode={option.CharCode} Name={option.Name} />
                })}
        </select>
    </div>
    )
}

CreateSelect.propTypes = {
    list: PropTypes.array,
    changeFirstOption: PropTypes.func,
    changeSecondOption: PropTypes.func
}

export default CreateSelect

