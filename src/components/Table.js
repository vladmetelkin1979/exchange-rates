import React from 'react'

function Table(props) {
    return (
        <div>
            <h5 style={{ marginTop: '2em' }}>Курс на: {props.date}</h5>
            <h5>Предыдущий срез на: {props.previousDate}</h5>
            <h5>Отметка времени: {props.timestamp}</h5>
            <table>
                <thead>
                    <tr>
                        <th>Код</th><th>Номинал</th><th>Валюта</th><th>Курс к рублю</th>
                    </tr>
                </thead>
                <tbody>
                    {props.valutes.map((prop) => {
                        return <tr key={prop.ID}>
                            <td>{prop.CharCode}</td><td>{prop.Nominal}</td><td>{prop.Name}</td><td>{prop.Value.toFixed(2)}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Table