import React from 'react'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/rootReducer'
import Root from './components/Root'
import persistState from 'redux-localstorage'

const loggerMiddleware = createLogger()

let store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  ),
)

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
)
