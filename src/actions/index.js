export const GET_VALUE_API = 'GET_VALUE_API'
export const ERROR_GET_API = 'ERROR_GET_API'
export const SET_INPUT = 'SET_INPUT'
export const FIRST_SELECT = 'FIRST_SELECT'
export const SECOND_SELECT = 'SECOND_SELECT'
export const RESULT = 'RESULT'

/////////////
// GET API //
/////////////

export const initStateForSelects = {}

// Get API, then setting states for Table and Converter
export const readyApi = (load) => {
  const arrayList = [],
    lengthList = Object.keys(load.Valute).length
  for (const key in load.Valute) {
    arrayList.push(load.Valute[key])
    if (arrayList.length === lengthList) {
      arrayList.push({
        ID: 'R0000',
        NumCode: '000',
        CharCode: 'RUB',
        Nominal: 1,
        Name: 'Российских рублей',
        Value: 1,
        Previous: 1
      })
    }
  }

  // set first state for Converter
  const stateFirstSelect = arrayList.find((valute) => {
    return valute.Name === 'Доллар США'
  })
  const stateSecondSelect = arrayList.find((valute) => {
    return valute.Name === 'Российских рублей'
  })
  initStateForSelects.input = 1
  initStateForSelects.firstSelect = stateFirstSelect
  initStateForSelects.secondSelect = stateSecondSelect
  initStateForSelects.result = parseFloat(initStateForSelects.input) * stateFirstSelect.Value / stateFirstSelect.Nominal

  // state for Table 
  return {
    type: GET_VALUE_API,
    date: new Date(Date.parse(load.Date)).toLocaleString(),
    previousDate: new Date(Date.parse(load.PreviousDate)).toLocaleString(),
    timestamp: new Date(Date.parse(load.Timestamp)).toLocaleString(),
    valutes: arrayList
  }
}

// request for API
export default function getRequestApi() {
  return function (dispatch) {
    return fetch('https://www.cbr-xml-daily.ru/daily_json.js')
    // Тут обычно бы использоыали стрелочную функцию  
    .then(function (response) {
        if (response.ok === true) {
          return response
        } else {
          let error = new Error(response.statusText)
          error.response = response
          throw error
        }
      })
      // Тут обычно бы использоыали стрелочную функцию
      .then(function (response) {
        if (typeof response !== 'object') {
          let error = new Error('Получен недопустимый формат данных')
          throw error
        }
        return response;
      })
      .then(function (response) {
        // Можно просто return response.json()
        // или всю функию стрелочной сделать: response => response.json()
        const API = response.json()
        return API
      })
      // Тут обычно бы использоыали стрелочную функцию
      .then(function (API) {
        dispatch(readyApi(API))
      })
  }
}

////////////////////////
// CUSTOMER FUNCTIONS //
////////////////////////

export const setInput = (input) => ({
  type: SET_INPUT,
  input
})

export const firstSelect = (firstSelect) => ({
  type: FIRST_SELECT,
  firstSelect
})

export const secondSelect = (secondSelect) => ({
  type: SECOND_SELECT,
  secondSelect
})

export const result = (result) => ({
  type: RESULT,
  result
})

////////////////////////////////////
// FUNCTION FOR COUNTING OF A RATES //
////////////////////////////////////

// BASE_CURRENCY:  called currency against which setting all currencies from list. It's russian rouble.
// CURRENCY_OF_THE_CONVERTATION: any valute which to count relatively the BASE_CURRENCY
// EXCHANGE_RATE: it's indicates on the cost of the CURRENCY_OF_THE_CONVERTATION relatively the BASE_CURRENCY.
// MULTIPLICITY: how much money of BASE_CURRENCY relatively the EXCHANGE_RATE.

// for counting EXCHANGE_RATE is the formula:
// EXCHANGE_RATE = sum of CURRENCY_OF_THE_CONVERTATION * MULTIPLICITY / sum of BASE_CURRENCY
// for example 1000 russan roubles correspondes to 19.4 dollars of USA
// MULTIPLICITY = 1000
// you getting EXCHANGE_RATE = 19.40 * 100 / 1000 = 1.94

// so having value of the MULTIPLICITY = 100 you will get 
// EXCHANGE_RATE = 1.94

// live example №1: you want to count how many dollars will be cost 2000 roubles:
// 1.94 * 2000 / 100 = 38.8 $

// live example №2: if you want to converted all rest currencies exept BASE_CURRENCY is look formula below:
// [CURRENCY_OF_THE_CONVERTATION(2)]=[CURRENCY_OF_THE_CONVERTATION(1)]*[MULTIPLICITY(1)]*[EXCHANGE_RATE(2)]/[MULTIPLICITY(2)]*[EXCHANGE_RATE(1)]

// example object from API comming though event input or select
// {
//   "ID": "R01010",
//   "NumCode": "036",
//   "CharCode": "AUD",
//   "Nominal": 1,                              
//   "Name": "Австралийский доллар",
//   "Value": 47.2908,
//   "Previous": 47.6182
// }

// for the current counting of the data
const SUM_OF_BASIC = 1000
const MULTIPLICITY = 100

// Описание функции больше чем сама функция. Думаю можно еще переписать чтобы без описания все было понятно.
export function count() {
  return (dispatch, getState) => {
    // get states for counting   
    // Можно один раз получить стейт и его использовать дальше.
    const { Name: firstSelectName, Value: firstValue, Nominal: firstNominal } = getState().convertation.firstSelect
    const { Name: secondSelectName, Value: secondValue, Nominal: secondNominal } = getState().convertation.secondSelect
    const input = parseFloat(getState().convertation.input)

    // 'Российских рублей' лучше вынести в константу. Встречается 4 раза в этом файле
    if (firstSelectName === 'Российских рублей') {
      // live example №1: 
      // Почему когда переводим из рублей нам нужны SUM_OF_BASIC и MULTIPLICITY а когда в рубли не нужны?
      dispatch(result((SUM_OF_BASIC / secondValue * MULTIPLICITY / SUM_OF_BASIC) * input / MULTIPLICITY * secondNominal))
    } else if (secondSelectName === 'Российских рублей') {
      // convertation directly
      dispatch(result(input * firstValue / firstNominal))
    }
    // live example №2:
    else {
      // очень непонятная формула. Понятно что тут перевод из 1 валюты в другую через курс рубля.
      // Но как это отлаживать непонятно.
      // Может что-то типа:
      // currency1Rate = ...
      // currancy2Rate = ...
      // result = (value * currency1Rate) / currancy2Rate
      dispatch(result(input * MULTIPLICITY * (SUM_OF_BASIC / secondValue * MULTIPLICITY / SUM_OF_BASIC) * secondNominal / (MULTIPLICITY * (SUM_OF_BASIC / firstValue * MULTIPLICITY / SUM_OF_BASIC) * firstNominal)))
    }
  }
}



