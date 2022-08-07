import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router'

import { fetchTypes, fetchCountries, fetchProducts } from '../api/shopAPI'

import Filter from '../components/Shop/Filter'
import ProductList from '../components/Shop/ProductList'
import Pagination from '../components/Shop/Pagination'

import { addProductToCart } from '../redux/actions/cart'
import { fetchCallback, makeFilterUrl }  from '../lib'

const Shop = () => {
	const [items, setItems] = useState([]) // products from DB
	const [types, setTypes] = useState([])
	const [countries, setCountries] = useState([])
	const [pageCount, setPageCount] = useState(0)

	const [searchParams] = useSearchParams()
	const type = searchParams.get('type')
	const country = searchParams.get('country')

	const limit = process.env.REACT_APP_SHOP_PAGE_LIMIT || 6
	const page = Math.abs(parseInt(searchParams.get('page')) || 1)

	const navigate = useNavigate()
	const location = useLocation()

	const createFilterUrl = makeFilterUrl.bind(null, location.pathname, searchParams)

	useEffect(() => {
		fetchTypes().then(fetchCallback(setTypes))
		fetchCountries().then(fetchCallback(setCountries))
		fetchProducts({type, country, page, limit}).then((data) => {
			if(fetchCallback()(data)){
				const page_count = Math.ceil(data.count / limit)
				if(page > 1 && (!data.count || page > page_count)){
					return navigate(createFilterUrl({page: ''}))
				}
				setItems(data.rows)
				setPageCount(page_count)
			}
		})
	}, [type, country, page])

	const dispatch = useDispatch()
	const addProduct = (obj) => dispatch(addProductToCart(obj))

	return (
		<div className="product-section mt-80 mb-150">
			<div className="container">

				<Filter
					type={type}
					types={types}
					country={country}
					countries={countries}
					createFilterUrl={createFilterUrl}
					nameExists={(name, arr) => {
						name = name.toLowerCase()
						return !!arr.filter(el => el.name.toLowerCase() === name).length
					}}
				/>

				<ProductList items={items} addProduct={addProduct} />
				{pageCount > 1 && <Pagination
					pageCount={pageCount}
					page={page}
					createFilterUrl={createFilterUrl}
				/>}

			</div>
		</div>
	)
}

export default Shop
