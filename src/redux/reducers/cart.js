import {
	ADD_PRODUCT_CART,
	REMOVE_CART_ITEM,
	PLUS_CART_ITEM,
	MINUS_CART_ITEM,
	CLEAR_CART
} from '../actions/types'

const initialState = {
	items: [],
	totalPrice: 0,
	totalCount: 0
}

const getTotalCount = (arr) => arr.reduce((total, item) => total + item.count, 0)
const getTotalPrice = (arr) => arr.reduce((total, item) => total + item.count * item.price, 0)

const getItemIndexById = (arr, id) => {
	for(let i=0;i<arr.length;i++){
		if(arr[i].id === id){
			return i
		}
	}
	return null
}

const cart = (state = initialState, action) => {
	switch(action.type){
		case ADD_PRODUCT_CART: {
			const productCount = Number(action.payload.count) || 1
			const productPrice = Number(action.payload.price) || 0
			
			let newItems = [...state.items]
			const itemIndex = getItemIndexById(newItems, action.payload.id)
			if(itemIndex !== null){
				newItems[itemIndex].count += productCount
			}
			else{
				newItems.push({...action.payload, count: productCount, price: productPrice})
			}
			return {
				...state,
				items: newItems,
				totalCount: getTotalCount(newItems),
				totalPrice: getTotalPrice(newItems)
			}
		}

		case REMOVE_CART_ITEM: {
			let newItems = [...state.items]
			const itemIndex = getItemIndexById(newItems, action.payload)
			if(itemIndex === null){
				break
			}
			const itemTotalPrice = newItems[itemIndex].count * newItems[itemIndex].price
			const itemCount = newItems[itemIndex].count
			newItems.splice(itemIndex, 1)
			return {
				...state,
				items: newItems,
				totalPrice: state.totalPrice - itemTotalPrice,
				totalCount: state.totalCount - itemCount
			}
		}

		case PLUS_CART_ITEM: {
			let newItems = [...state.items]
			const itemIndex = getItemIndexById(newItems, action.payload)
			if(itemIndex === null){
				break
			}
			newItems[itemIndex].count++
			return {
				...state,
				items: newItems,
				totalPrice: state.totalPrice + newItems[itemIndex].price,
				totalCount: state.totalCount + 1
			}
		}

		case MINUS_CART_ITEM: {
			let newItems = [...state.items]
			const itemIndex = getItemIndexById(newItems, action.payload)
			if(itemIndex === null){
				break
			}
			newItems[itemIndex].count--
			if(!newItems[itemIndex].count){
				newItems.splice(itemIndex, 1)
			}
			return {
				...state,
				items: newItems,
				totalCount: getTotalCount(newItems),
				totalPrice: getTotalPrice(newItems)
			}
		}

		case CLEAR_CART:
			return { ...initialState }

		default:
			return state
	}
}

export default cart