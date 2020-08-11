import React, { useEffect } from 'react'
import Converter from '../containers/Converter'
import Table from './Table'
import PropTypes from 'prop-types'

const Wrapper = ({ getApi, date, previousDate, timestamp, valutes }) => {
  useEffect(() => {
    getApi()
  }, [getApi])
  // Можно просто (valutes === undefined) или (!valutes)
  if (typeof valutes === 'undefined') {
    return (
      <div>
        <h3 className="container center-align">Загрузка данных...</h3>
      </div>
    )
  } else {
    return (
      <div className="container center-align">
        <Converter />
        <Table
          date={date}
          previousDate={previousDate}
          timestamp={timestamp}
          valutes={valutes}
        />
      </div>
    )
  }
}

Wrapper.propTypes = {
  getApi: PropTypes.func,
  date: PropTypes.string,
  previousDate: PropTypes.string,
  timestamp: PropTypes.string,
  valutes: PropTypes.array
}

export default Wrapper