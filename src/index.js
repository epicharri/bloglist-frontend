import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))


/*
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
//import store from '/store'
import { Provider } from 'react-redux'
import notificationReducer from './reducers/notificationReducer'
import { createStore } from 'redux'

const store = createStore(
  notificationReducer
)
const render = () => {
  ReactDOM.render(
    <Provider>
      <App store={store} />
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
*/