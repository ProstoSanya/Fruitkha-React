import { combineReducers } from 'redux'
import cart from './cart'
import cartModal from './cartModal'
import auth from './auth'

const rootReducer = combineReducers({
	cart,
	cartModal,
	auth
})

export default rootReducer