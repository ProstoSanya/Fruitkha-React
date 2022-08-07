import axios from 'axios'

import {
	LOGIN_LOADING,
	LOGIN_LOADED,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGIN_LOGOUT
} from './types'

export const login = (username, password) => (dispatch) => {
	dispatch(loginLoading())
	axios
		.post(process.env.REACT_APP_API_URL + 'user/signin', { username, password })
		.then((res) => {
			console.log('login res =', res.data)
			if(res.data && res.data.token){
				//setTimeout(() => {
					dispatch(loginSuccess(res.data))
				//}, 2000)
			}
			else{
				dispatch(loginFail(`Ошибка. Не удалось получить токен.`))
				//return Promise.reject()
			}
			dispatch(loaded())
			//return Promise.resolve()
		},
		(err) => {
			const message = err?.response?.data?.message || err.message || err.toString()
			dispatch(loginFail(message))
			//return Promise.reject()
		})
}

export const logout = () => (dispatch) => {
	//localStorage.removeItem('user')
	dispatch(loginLogout())
}

export const chechAuth = (token) => (dispatch) => {
	dispatch(loginLoading())
	axios
		.post(process.env.REACT_APP_API_URL + 'user/checkauth', { token })
		.then((res) => {
			console.log('chechAuth res =', res.data)
			if(!res?.data?.token){
				dispatch(loginFail(`Ошибка. Не удалось получить токен.`))
			}
			dispatch(loaded())
		},
		(err) => {
			const message = err?.response?.data?.message || err.message || err.toString()
			dispatch(loginFail(message))
		})
}

const loginLoading = () => ({
	type: LOGIN_LOADING
})

export const loaded = () => ({
	type: LOGIN_LOADED
})

const loginSuccess = (data) => ({
	type: LOGIN_SUCCESS,
	payload: data
})

const loginFail = (message) => ({
	type: LOGIN_FAIL,
	payload: {error: message}
})

const loginLogout = () => ({
	type: LOGIN_LOGOUT
})