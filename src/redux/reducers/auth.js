import {
	LOGIN_LOADING,
	LOGIN_LOADED,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGIN_LOGOUT
} from '../actions/types'

const initialState = {
	loading: false,
	user: null,
	token: null,
	tokenExp: null,
	error: null
}

const auth = (state = initialState, action) => {
	switch(action.type){
		case LOGIN_LOADING:
			return {
				...state,
				loading: true
			}
		case LOGIN_LOADED:
			return {
				...state,
				loading: false
			}
		case LOGIN_SUCCESS:
			return {
				...state,
				loading: false,
				user: {
					id: action.payload.id,
					username: action.payload.username
				},
				token: action.payload.token,
				tokenExp: action.payload.exp,
				error: null
			}
		case LOGIN_FAIL:
			return {
				...state,
				loading: false,
				user: null,
				token: null,
				tokenExp: null,
				error: action.payload.error
			}
		case LOGIN_LOGOUT:
			return {
				...state,
				loading: false,
				user: null,
				token: null,
				tokenExp: null,
				error: null
			}
		default:
			return state
	}
}

export default auth