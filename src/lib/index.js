export const checkField = (name, value) => {
  value = value ? value.toString().trim() : ''
	if(name !== 'comment'){
    if(value.length < 3 || value.length > 12){
      return false
    }
	}
  else if(value.length > 40){
    return false
  }
	let result
	switch(name){
		case "email":
			result = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
      break
		case "phone":
			result = value.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
      break
    default:
      result = true
	}
	return result
}

export const fetchCallback = (setter) => (data) => {
	if(data.message){
		alert(data.message)
		return false
	}
	if(setter){
		setter(data)
	}
	return true
}

export const makeFilterUrl = (pathname = '/', searchParams = new URLSearchParams(), params = {}) => {
	let obj = {}
	for(let [key, value] of searchParams.entries()){
		if(key in params && !params[key]){
			delete params[key]
		}
		else{
			obj[key] = value
		}
	}
	for(let key in params){
		if(!params[key]){
			delete params[key]
		}
	}
	Object.assign(obj, params)
	if('page' in obj && (obj['page'] == 1 || !params['page'])){
		delete obj['page']
	}
	return Object.keys(obj).length ? pathname + '?' + (new URLSearchParams(obj).toString()) : pathname
}

export const getNameById = (id, arr = []) => {
	const newArr = arr.filter((el) => el.id == id)
	return newArr.length ? newArr[0].name : ''
}
