import { SHOW, HIDE } from '../actions/types'

const initialState = {
	show: false
}

const cartModal = (state = initialState, action) => {
	switch(action.type){
		case SHOW: {
			return {
				...state,
				show: true
			}
		}
		case HIDE: {
			return {
				...state,
				show: false
			}
		}
		default:
			return state
	}
}

export default cartModal