import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export const fetchTypes = async (involved = true) => {
	let url = API_URL + 'type'
	if(involved){
		url += '?involved=1'
	}
	const {data} = await axios.get(url)
	return data
}

export const fetchCountries = async (involved = true) => {
	let url = API_URL + 'country'
	if(involved){
		url += '?involved=1'
	}
	const {data} = await axios.get(url)
	return data
}

export const fetchProducts = async (params = {}) => {
	let url = API_URL + 'shop'
	let paramsArray = []
	for(let key in params){
		if(params[key]){
			if(Array.isArray(params[key])){
				for(let i=0;i<params[key].length;i++){
					if(params[key][i]){
						paramsArray.push(key + '[]=' + params[key][i])
					}
				}
			}
			else{
				paramsArray.push(key + '=' + params[key])
			}
		}
	}
	if(paramsArray.length){
		url += '?' + paramsArray.join('&')
	}
	const {data} = await axios.get(url)
	return data
}

export const fetchOneProduct = async (id) => {
	const url = API_URL + 'shop/' + id
	const {data} = await axios.get(url)
	return data
}

export const addProduct = async (params = {}, headers = {}) => {
	const url = API_URL + 'shop'
	const {data} = await axios.post(url, params, {headers})
	return data
}

export const putProduct = async (params = {}, headers = {}) => {
	const url = API_URL + 'shop'
	const {data} = await axios.put(url, params, {headers})
	return data
}

export const deleteProduct = async (id, headers = {}) => {
	const url = API_URL + 'shop'
	const {data} = await axios.delete(url, {data: {id}, headers})
	return data
}