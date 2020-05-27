import React from 'react'

const Table = ({ date, previousDate, timestamp, valutes }) => {
    return (
        <div>
            <h5 style={{ marginTop: '2em' }}>Курс на: {date}</h5>
            <h5>Предыдущий срез на: {previousDate}</h5>
            <h5>Отметка времени: {timestamp}</h5>
            <table>
                <thead>
                    <tr>
                        <th>Код</th><th>Номинал</th><th>Валюта</th><th>Курс к рублю</th>
                    </tr>
                </thead>
                <tbody>
                    {valutes.map((prop) => {
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