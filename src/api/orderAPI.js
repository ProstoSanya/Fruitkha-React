import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL
const ORDER_API_URL = API_URL + 'order'

export const fetchOrders = async (headers = {}) => {
	const {data} = await axios.get(ORDER_API_URL, {headers})
	return data
}

export const createOrder = async (params = {}) => {
	const {data} = await axios.post(ORDER_API_URL, params)
	return data
}

export const updateOrder = async (params = {}, headers = {}) => {
	const {data} = await axios.put(ORDER_API_URL, params, {headers})
	return data
}
