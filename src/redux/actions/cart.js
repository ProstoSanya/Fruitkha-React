import {
	ADD_PRODUCT_CART,
	REMOVE_CART_ITEM,
	PLUS_CART_ITEM,
	MINUS_CART_ITEM,
	CLEAR_CART
} from './types'

export const addProductToCart = (obj, count = 1) => ({
	type: ADD_PRODUCT_CART,
	payload: {...obj, count}
})

export const removeCartItem = (id) => ({
	type: REMOVE_CART_ITEM,
	payload: id
})

export const clearCart = () => ({
	type: CLEAR_CART
})

export const plusCartItem = (id) => ({
	type: PLUS_CART_ITEM,
	payload: id
})

export const minusCartItem = (id) => ({
	type: MINUS_CART_ITEM,
	payload: id
})