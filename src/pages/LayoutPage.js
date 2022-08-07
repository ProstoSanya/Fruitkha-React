import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import PreLoader from '../components/PreLoader'
import ModalCart from '../components/ModalCart'
import Header from '../components/Header'
import BreadcrumbSection from '../components/BreadcrumbSection'
import LogoCarousel from '../components/LogoCarousel'
import Footer from '../components/Footer'
import Copyright from '../components/Copyright'

import { removeCartItem, plusCartItem, minusCartItem, clearCart } from '../redux/actions/cart'
import { showCart, hideCart } from '../redux/actions/cartModal'

import '../assets/css/all.min.css'
import '../assets/bootstrap/css/bootstrap.min.css'
import '../assets/css/owl.carousel.css'
import '../assets/css/magnific-popup.css'
import '../assets/css/animate.css'
import '../assets/css/meanmenu.min.css'
import '../assets/css/main.css'
import '../assets/css/responsive.css'
import '../assets/css/custom.css'

// LogoCarousel options
const options = {
	loop: true,
	margin: 10,
	items: 4,
	nav: false,
	dots: false,
	autoplay: true,
	/*center: false,
	startPosition: 3,
	rewind: false*/
}

const LayoutPage = ({ children, title, breadcrumbText }) => {
	//set page title
	useEffect(() => {
		document.title = title
	}, [title])

	const { items, totalPrice, totalCount } = useSelector(state => state.cart)
	const show = useSelector(state => state.cartModal.show)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	// modal cart bottom buttons
	let navigateButton = null
	const itemCount = items && 'length' in items ? items.length : 0 // unique items count
	if(!itemCount){
		if(title !== "Shop"){
			navigateButton = {caption: 'Start shopping', navigate: () => navigate('/shop')}
		}
	}
	else if(title === "Checkout"){
		navigateButton = {caption: 'Continue shopping', navigate: () => navigate('/shop')}
	}
	else{
		navigateButton = {caption: 'Checkout', navigate: () => navigate('/checkout')}
	}

	// top menu links
	let links = [
		{title: "Home", to: "/"},
		{title: "Shop", to: "/shop"},
		{title: "About", to: "/about"}
	]
	.map((l) => {
		if(l.title === title){
			l.class = "current-list-item"
		}
		return l
	})

	return (
		<>
			<PreLoader />
			<ModalCart
				items={items}
				show={show}

				plusItem={(id) => dispatch(plusCartItem(id))}
				minusItem={(id) => dispatch(minusCartItem(id))}
				removeItem={(id) => dispatch(removeCartItem(id))}

				navigateButton={navigateButton}
				clearCart={(id) => dispatch(clearCart(id))}
				closeCart={() => dispatch(hideCart())}
			/>
			<Header
				links={links}
				totalPrice={totalPrice}
				totalCount={totalCount}
				cartIconClick={() => dispatch(showCart())}
			/>
			{title !== "Home" && <BreadcrumbSection text={breadcrumbText} />}

			{children}

			<LogoCarousel options={options} />
			<Footer links={links} />
			<Copyright />
		</>
	)
}

export default LayoutPage
