export const GET_VALUE_API = 'GET_VALUE_API'
export const SET_INPUT = 'SET_INPUT'
export const FIRST_SELECT = 'FIRST_SELECT'
export const SECOND_SELECT = 'SECOND_SELECT'
export const RESULT = 'RESULT'
export const INIT_STATE_FOR_SELECTS = {}

const BASE_CURRENCY = 'Российских рублей'
const API = []

// finding of valute
const findSelect = (name) => {
  const select = API.find((valute) => {
    return valute.Name === name
  })
  return select
}
// function for first state of converter
const firstStateConverter = (first, second) => {
  const stateFirstSelect = findSelect(first)
  const stateSecondSelect = findSelect(second)

  INIT_STATE_FOR_SELECTS.input = 1
  INIT_STATE_FOR_SELECTS.firstSelect = stateFirstSelect
  INIT_STATE_FOR_SELECTS.secondSelect = stateSecondSelect

  const stateResult = INIT_STATE_FOR_SELECTS.input * stateFirstSelect.Value / stateFirstSelect.Nominal

  INIT_STATE_FOR_SELECTS.result = `${stateResult.toFixed(2)} ${stateSecondSelect.CharCode}`
}

/////////////
// GET API //
/////////////

// Get API, then setting states for the Table and the Converter
export const readyApi = (load) => {
  const lengthList = Object.keys(load.Valute).length
  for (const key in load.Valute) {
    API.push(load.Valute[key])
    if (API.length === lengthList) {
      API.push({
        ID: 'R0000',
        NumCode: '000',
        CharCode: 'RUB',
        Nominal: 1,
        Name: BASE_CURRENCY,
        Value: 1,
        Previous: 1
      })
    }
  }
  // set first state for Converter 
  firstStateConverter('Доллар США', BASE_CURRENCY)
  // set state for Table 
  return {
    type: GET_VALUE_API,
    date: new Date(Date.parse(load.Date)).toLocaleString(),
    previousDate: new Date(Date.parse(load.PreviousDate)).toLocaleString(),
    timestamp: new Date(Date.parse(load.Timestamp)).toLocaleString(),
    valutes: API
  }
}

////////////////////////
// CUSTOMER FUNCTIONS //
////////////////////////

export const setInput = (input) => ({
  type: SET_INPUT,
  input
})

export const firstSelect = (firstSelect) => {
  const select = findSelect(firstSelect)
  firstSelect = select
  return {
    type: FIRST_SELECT,
    firstSelect
  }
}

export const secondSelect = (secondSelect) => {
  const select = findSelect(secondSelect)
  secondSelect = select
  return {
    type: SECOND_SELECT,
    secondSelect
  }
}

export const result = (result) => ({
  type: RESULT,
  result
})

//////////////////////////////////////
// FUNCTION FOR COUNTING OF A RATES //
//////////////////////////////////////

// For example, We need to count a RATE for USD/RUR: 
// 1000 russan roubles (SUM_OF_BASIC = 1000) correspondes to 14.47 dollars of USA (you can get it from API: 
// (SUM_OF_BASIC: 1000) / (USD: "Value": 69.1219) * ("Nominal": 1)  = 14.47)

// Also to set  MULTIPLICITY, it's the constant for all currencies = 100.

const SUM_OF_BASIC = 1000
const MULTIPLICITY = 100

//////////////   RATE = 14.47$ * MULTIPLICITY / SUM_OF_BASIC  

// So RATE for this MULTIPLICITY and relation for USD/RUR = 1.45 

export const count = () => {
  return (dispatch, getState) => {
    // get states for counting       
    const { firstSelect: { Name: firstSelectName },
      firstSelect: { Value: firstValue },
      firstSelect: { Nominal: firstNominal },
      secondSelect: { Name: secondSelectName },
      secondSelect: { Value: secondValue },
      secondSelect: { Nominal: secondNominal },
      secondSelect: { CharCode: charCode },
      input
    } = getState().convertation

    if (secondSelectName === BASE_CURRENCY) {
      // it's easy because all data relate with BASE_CURRENCY 
      const TARGET = parseFloat(input) * firstValue / firstNominal
      dispatch(result(`${TARGET.toFixed(2)} ${charCode}`))

    } else if (firstSelectName === BASE_CURRENCY) {
      // We use for counting the formula is below:   
      // TARGET[secondSelect] = RATE * summ of convertation currency / MULTIPLICITY
      // the first that we need:
      // how many currency for 1000 BASE_CURRENCY:
      const VALUE_FOR_1000_BASE_CURRENCY = SUM_OF_BASIC / secondValue * secondNominal
      // after this we need to count the RATE
      const RATE = VALUE_FOR_1000_BASE_CURRENCY * MULTIPLICITY / SUM_OF_BASIC
      // let's insert the formila
      const TARGET = RATE * parseFloat(input) / MULTIPLICITY
      dispatch(result(`${TARGET.toFixed(2)} ${charCode}`))

    } else {
      // we use for counting the formula is below: 
      // TARGET[secondSelect] = input * MULTIPLICITY * RATE[secondSelect] / MULTIPLICITY * RATE[firstSelect]

      // counting RATE for both Selects
      const RATE_FIRST_SELECT = (SUM_OF_BASIC / firstValue * firstNominal * MULTIPLICITY) / SUM_OF_BASIC
      const RATE_SECOND_SELECT = (SUM_OF_BASIC / secondValue * secondNominal * MULTIPLICITY) / SUM_OF_BASIC

      // use formula
      const TARGET = (parseFloat(input) * MULTIPLICITY * RATE_SECOND_SELECT) / (MULTIPLICITY * RATE_FIRST_SELECT)
      dispatch(result(`${TARGET.toFixed(2)} ${charCode}`))
    }
  }
}



