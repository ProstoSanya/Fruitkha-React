import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { loadState, saveState } from './localStorage.js'

const initialState = loadState()
const store = createStore(rootReducer, initialState, applyMiddleware(thunk))

store.subscribe(() => {
	saveState(store.getState())
})

export default store