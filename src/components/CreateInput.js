import React from 'react'
import PropTypes from 'prop-types'

function CreateInput(props) {
    const changeInput = props.changeInput,
        value = props.defaultValue
    return (
        <div>
            {/* Почему через defaultValue мне кажется тут через value нужно */}
            <input defaultValue={value} type='text' onChange={changeInput}></input>
        </div>
    )
}

CreateInput.propTypes = {
    changeInput: PropTypes.func,
    value: PropTypes.string
}

export default CreateInput

