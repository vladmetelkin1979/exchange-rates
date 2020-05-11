import React from 'react'
import PropTypes from 'prop-types'

// Имя без Create
function CreateTable(props) {
    // Тут скорее бы деструкция использовалась
    const name = props.name,
        code = props.code,
        value = props.value,
        target = props.target
    return (<tr>
        <td>{code}</td><td>{target}</td><td>{name}</td><td>{value.toFixed(2)}</td>
    </tr>)
}

CreateTable.propTypes = {
    name: PropTypes.string,
    code: PropTypes.string,
    value: PropTypes.number,
    target: PropTypes.number
}

export default CreateTable


