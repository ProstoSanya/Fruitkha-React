import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, Navigate } from 'react-router-dom'

import { fetchOneProduct, fetchProducts } from '../api/shopAPI'

import ProductInfo from '../components/Product/ProductInfo'
import SimilarProducts from '../components/Product/SimilarProducts'

import { addProductToCart } from '../redux/actions/cart'

const Product = () => {
	const IMAGES_FOLDER = process.env.REACT_APP_IMAGES_FOLDER
  const {id} = useParams()

	const [count, setCount] = useState(1)
  const [productInfo, setProductInfo] = useState({})
	const [similarProducts, setSimilarProducts] = useState([])
	const [navigateTo, setNavigateTo] = useState('')

  useEffect(() => {
		fetchOneProduct(id)
			.then((data) => {
				if(data.message){
					alert(data.message)
				}
				else{
					document.title = data.name
					setProductInfo(data)
				}
			})
			.catch((err) => {
				console.log('fetchOneProduct error', err)
				const obj = err.toJSON()
				const status = obj.status || obj.code
				if(status === 404){
					setNavigateTo('/404')
				}
			})
		// similar products
		fetchProducts({skip: [id], limit: 3, random: 1})
			.then((data) => {
				if(data.message){
					console.log(data.message)
				}
				else{
					setSimilarProducts(data.rows)
				}
			})
			.catch((err) => {
				console.log('fetchProducts error', err)
			})
	}, [id])

	const handleCountChange = (e) => {
		const value = e?.target?.value || 0
		if(value > 0){
			setCount(value)
		}
	}

	const dispatch = useDispatch()
	const addProduct = (obj, count) => dispatch(addProductToCart(obj, count))

	return (
		<>
			{navigateTo ?
				<Navigate to={navigateTo} replace={true} />
			:
				<>
					<ProductInfo
						{...productInfo}
						type={productInfo.type && productInfo.type.name}
						country={productInfo.country && productInfo.country.name}
						img={productInfo.img ? IMAGES_FOLDER + productInfo.img : 'images/products/_default.png'}
						count={count}
						handleCountChange={handleCountChange}
						addProduct={addProduct}
					/>
					<SimilarProducts products={similarProducts} addProduct={addProduct} title="Related Products" />
				</>
			}
		</>
	)
}

export default Product
