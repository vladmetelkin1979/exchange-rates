import React from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import Api from './Api'

const store = configureStore()

// Тут можно функциональный компонент использовать
export default class Root extends React.Component {
  render() {          
    return (
      <Provider store={store}>                 
        <Api />                  
      </Provider>
    )
  }
}