import axios from 'axios'

import {
	PRODUCTS_LOADING,
	PRODUCTS_LOADED,
	PRODUCTS_SUCCESS,
	PRODUCTS_FAIL
} from './types'

import ShopAPI from '../../api/ShopAPI'

export const fetchProducts = (params = {}) => (dispatch) => {
	dispatch(productsLoading())
	
	ShopAPI.fetchProducts().
		.then((res) => {
			console.log('products res =', res.data)
			if(res.data){
				//setTimeout(() => {
					dispatch(productsSuccess(res.data))
				//}, 2000)
			}
			else{
				dispatch(productsFail(`Не удалось получить данные.`))
				//return Promise.reject()
			}
			//return Promise.resolve()
		},
		(err) => {
			const message = err?.response?.data?.message || err.message || err.toString()
			dispatch(productsFail(message))
			//return Promise.reject()
		})
}

const productsLoading = () => ({
	type: PRODUCTS_LOADING
})

export const productsLoaded = () => ({
	type: PRODUCTS_LOADED
})

const productsSuccess = (items) => ({
	type: PRODUCTS_SUCCESS,
	payload: {items}
})

const productsFail = (message) => ({
	type: PRODUCTS_FAIL,
	payload: message
})

/*const productsClear = () => ({
	type: PRODUCTS_LOGOUT
})*/