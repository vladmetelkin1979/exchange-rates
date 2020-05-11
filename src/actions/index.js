export const GET_VALUE_API = 'GET_VALUE_API'
export const ERROR_GET_API = 'ERROR_GET_API'
export const SET_INPUT = 'SET_INPUT'
export const FIRST_SELECT = 'FIRST_SELECT'
export const SECOND_SELECT = 'SECOND_SELECT'
export const RESULT = 'RESULT'

// get API

// Все функции в этом файле обычно бы написали стрелочными
export function beforeRequestApi(load) {
  return {
    type: GET_VALUE_API,
    load
  }
}

export function errorRequestApi(load) {
  return {
    type: ERROR_GET_API,
    load
  }
}

export default function getRequestApi() {
  return function (dispatch) {
    return fetch('https://www.cbr-xml-daily.ru/daily_json.js')
      .then(function (response) {
        // Тут вроде можно использовать свойство response.ok
        if (response.status >= 200 && response.status < 300) {
          return response
        } else {
          let error = new Error(response.statusText)
          error.response = response
          throw error
        }
      })
      .then(function (response) {
        if (typeof response !== 'object') {
          let error = new Error('Получен недопустимый формат данных')
          error.response = response
          throw error
        }
        return response;
      })
      .then(function (response) {
        const API = response.json()        
        return API
      })
      .then(function (API) {
        dispatch(beforeRequestApi(API))
      })
      .catch(function (text) {
        // По идее не надло в сторе хранить ошибку в таком красивом виде чтобы выводить
        // Надо просто сохранить ошибку в стор а о том как ее вывести должны компоненты заботится
        return dispatch(errorRequestApi('Ошибка в получении данных: ' + text.message))
      })
  }
}

// custumer functions

export function setInput(input) {
  return {
    type: SET_INPUT,
    input
  }
}

export function firstSelect(firstSelect) {
  return {
    type: FIRST_SELECT,
    firstSelect
  }
}

export function secondSelect(secondSelect) {
  return {
    type: SECOND_SELECT,
    secondSelect
  }
}

export function result(result) {
  return {
    type: RESULT,
    result
  }
}

//count 

// Обычно так не пишут. Пишут const на каждой строчке 
const SUM_OF_BASIC = 1000, // sum of basic valute
  MULTIPLICITY = 100

// результат getState() можно сохранить в константу
// Очень сложная функция и непонятно что делает надо упростить чтобы человеку сразу было понятно что тут к чему
export function count() {
  return (dispatch, getState) => {
    if (getState().convertation.firstSelect.Name === 'Российских рублей') {
      dispatch(result((SUM_OF_BASIC / getState().convertation.secondSelect.Value * MULTIPLICITY / SUM_OF_BASIC) * parseFloat(getState().convertation.input) / 100 * getState().convertation.secondSelect.Nominal))
    } else if (getState().convertation.secondSelect.Name === 'Российских рублей') {
      dispatch(result(parseFloat(getState().convertation.input) * getState().convertation.firstSelect.Value / getState().convertation.firstSelect.Nominal))
    }    
    else {
      dispatch(result(parseFloat(getState().convertation.input) * MULTIPLICITY * (SUM_OF_BASIC / getState().convertation.secondSelect.Value * MULTIPLICITY / SUM_OF_BASIC) * getState().convertation.secondSelect.Nominal / (MULTIPLICITY * (SUM_OF_BASIC / getState().convertation.firstSelect.Value * MULTIPLICITY / SUM_OF_BASIC) * getState().convertation.firstSelect.Nominal)))
    }
  }
}
