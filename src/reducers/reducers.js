import { combineReducers } from 'redux'
import {
  GET_VALUE_API, ERROR_GET_API,
  SET_INPUT, FIRST_SELECT, SECOND_SELECT, RESULT
} from './../actions'

function requestApi(state = {}, action) {
  switch (action.type) {
    case GET_VALUE_API:
      return { ...state, getload: action.load }
    case ERROR_GET_API:
      return action.load
    default:
      return state
  }
}

function convertation(state = {  
  input: 1,
  firstSelect: {},
  secondSelect: {},
  result: 0  
}, action) { 
  switch (action.type) {
    case SET_INPUT:     
      return {...state, input: action.input}
    case FIRST_SELECT:  
      return {...state, firstSelect: action.firstSelect}
    case SECOND_SELECT:
      return {...state, secondSelect: action.secondSelect}    
    case RESULT: 
      return {...state, result: action.result}
    default:       
      return state
  }
}

const rootReducer = combineReducers({ requestApi, convertation })

export default rootReducer