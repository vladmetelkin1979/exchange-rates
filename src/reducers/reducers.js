import { combineReducers } from 'redux'
import {
  INIT_STATE_FOR_SELECTS,
  GET_VALUE_API,
  SET_INPUT, FIRST_SELECT, SECOND_SELECT, RESULT
} from './../actions'

const readyApi = (state = {}, action) => {
  switch (action.type) {
    case GET_VALUE_API:
      return {
        ...state,
        date: action.date,
        previousDate: action.previousDate,
        timestamp: action.timestamp,
        valutes: action.valutes
      }
    default:
      return state
  }
}

const convertation = (state = INIT_STATE_FOR_SELECTS, action) => {
  switch (action.type) {
    case SET_INPUT:
      return { ...state, input: action.input }
    case FIRST_SELECT:
      return { ...state, firstSelect: action.firstSelect }
    case SECOND_SELECT:
      return { ...state, secondSelect: action.secondSelect }
    case RESULT:
      return { ...state, result: action.result }
    default:
      return state
  }
}

const rootReducer = combineReducers({ readyApi, convertation })

export default rootReducer