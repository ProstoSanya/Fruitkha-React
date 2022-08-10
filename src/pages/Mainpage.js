import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { fetchOneProduct, fetchProducts } from '../api/shopAPI'

import SimilarProducts from '../components/Product/SimilarProducts'
import { addProductToCart } from '../redux/actions/cart'

const strawberryId = process.env.REACT_APP_STRAWBERRY_ID

const Mainpage = () => {
	const [strawberryData, setStrawberryData] = useState({})
	const [similarProducts, setSimilarProducts] = useState([])

	useEffect(() => {
		fetchOneProduct(strawberryId).then(data => {
			if(data.message){
				console.log(data.message)
			}
			else{
				setStrawberryData({
					...data,
					img: data.img ? process.env.REACT_APP_IMAGES_FOLDER + data.img : 'images/products/_default.png'
				})
			}
		})
		fetchProducts({skip: [strawberryId], limit: 3, random: 1}).then(data => {
			if(data.message){
				console.log(data.message)
			}
			else{
				setSimilarProducts(data.rows)
			}
		})
  }, [])

	const dispatch = useDispatch()
	const addProduct = (obj) => dispatch(addProductToCart(obj))

	return (
		<>
		<div className="hero-area hero-bg">
		<div className="site-logo mobile-site-logo">
			<Link to="/">
				<img src="/images/logo.png" alt="" />
			</Link>
		</div>
			<div className="container">
				<div className="row">
					<div className="col-lg-9 offset-lg-2 text-center">
						<div className="hero-text">
							<div className="hero-text-tablecell">
								<p className="subtitle">Fresh & Organic</p>
								<h1>Delicious Seasonal Fruits</h1>
								<div className="hero-btns">
									<Link to="/shop" className="boxed-btn">Fruit Collection</Link>
									<Link to="/about" className="bordered-btn">About Us</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div className="list-section pt-80 pb-80">
			<div className="container">

				<div className="row">
					<div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
						<div className="list-box d-flex align-items-center">
							<div className="list-icon">
								<i className="fas fa-shipping-fast"></i>
							</div>
							<div className="content">
								<h3>Free Shipping</h3>
								<p>Get your fruits ASAP</p>
							</div>
						</div>
					</div>
					<div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
						<div className="list-box d-flex align-items-center">
							<div className="list-icon">
								<i className="fas fa-phone-volume"></i>
							</div>
							<div className="content">
								<h3>24/7 Support</h3>
								<p>Get support all day</p>
							</div>
						</div>
					</div>
					<div className="col-lg-4 col-md-6">
						<div className="list-box d-flex justify-content-start align-items-center">
							<div className="list-icon">
								<i className="fas fa-sync"></i>
							</div>
							<div className="content">
								<h3>Refund</h3>
								<p>Get refund within 3 days!</p>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>

		<div className="product-section mt-150">
			<div className="container">
				<div className="row">
					<SimilarProducts products={similarProducts} addProduct={addProduct} title="Our Products" />
				</div>
			</div>
		</div>

		<section className="cart-banner pt-100 pb-100">
			<div className="container">
				{strawberryData && strawberryData.id &&
					<div className="row clearfix">
						<div className="image-column col-lg-6">
							<div className="image">
								<div className="price-box">
									<div className="inner-price">
										<span className="price">
											<strong>30%</strong> <br /> off per kg
										</span>
									</div>
								</div>
								<img src={strawberryData.img} alt={strawberryData.name} />
							</div>
						</div>
						<div className="content-column col-lg-6">
							<h3><span className="orange-text">Deal</span> of the month</h3>
							<h4>Hikan Strwaberry - <span className="orange-text" style={{fontWeight: 'bold'}}>${strawberryData.price}/kg</span></h4>
							<div className="text">Quisquam minus maiores repudiandae nobis, minima saepe id, fugit ullam similique! Beatae, minima quisquam molestias facere ea. Perspiciatis unde omnis iste natus error sit voluptatem accusant</div>
							<span className="cart-btn" onClick={() => addProduct(strawberryData)}><i className="fas fa-shopping-cart"></i> Add to Cart</span>
						</div>
					</div>
				}
			</div>
		</section>

		<div className="testimonail-section mt-150 mb-150">
			<div className="container">
			</div>
		</div>

		<div className="feature-bg">
			<div className="container">
				<div className="row">
					<div className="col-lg-7">
						<div className="featured-text">
							<h2 className="pb-3">Why <span className="orange-text">Fruitkha</span></h2>
							<div className="row">
								<div className="col-lg-6 col-md-6 mb-4 mb-md-5">
									<div className="list-box d-flex">
										<div className="list-icon">
											<i className="fas fa-shipping-fast"></i>
										</div>
										<div className="content">
											<h3>Home Delivery</h3>
											<p>sit voluptatem accusantium dolore mque laudantium, totam rem aperiam, eaque ipsa quae ab illo.</p>
										</div>
									</div>
								</div>
								<div className="col-lg-6 col-md-6 mb-5 mb-md-5">
									<div className="list-box d-flex">
										<div className="list-icon">
											<i className="fas fa-money-bill-alt"></i>
										</div>
										<div className="content">
											<h3>Best Price</h3>
											<p>sit voluptatem accusantium dolore mque laudantium, totam rem aperiam, eaque ipsa quae ab illo.</p>
										</div>
									</div>
								</div>
								<div className="col-lg-6 col-md-6 mb-5 mb-md-5">
									<div className="list-box d-flex">
										<div className="list-icon">
											<i className="fas fa-briefcase"></i>
										</div>
										<div className="content">
											<h3>Custom Box</h3>
											<p>sit voluptatem accusantium dolore mque laudantium, totam rem aperiam, eaque ipsa quae ab illo.</p>
										</div>
									</div>
								</div>
								<div className="col-lg-6 col-md-6">
									<div className="list-box d-flex">
										<div className="list-icon">
											<i className="fas fa-sync-alt"></i>
										</div>
										<div className="content">
											<h3>Quick Refund</h3>
											<p>sit voluptatem accusantium dolore mque laudantium, totam rem aperiam, eaque ipsa quae ab illo.</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		</>
	)
}

export default Mainpage
