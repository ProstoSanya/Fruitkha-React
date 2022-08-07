import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import LayoutPage from './pages/LayoutPage'
import Mainpage from './pages/Mainpage'
import About from './pages/About'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Checkout from './pages/Checkout'
import Admin from './pages/Admin'
import AdminLogin from './pages/AdminLogin'
import AdminProducts from './pages/AdminProducts'
import AdminOrders from './pages/AdminOrders'
import NotFoundPage from './pages/NotFoundPage'

const Layout = ({
	component: Component,
	title = '',
	breadcrumbText = [],
	...rest
}) => {
	return (
		<LayoutPage title={title} breadcrumbText={breadcrumbText}>
			<Component {...rest} />
		</LayoutPage>
	)
}

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Layout component={Mainpage} title="Home" />} />
				<Route path="/about" element={<Layout component={About} title="About" breadcrumbText={['We sale fresh fruits', 'About Us']} />} />
				<Route path="/shop" element={<Layout component={Shop} title="Shop" breadcrumbText={['Fresh and Organic', 'Shop']} />} />
				<Route path="/shop/:id" element={<Layout component={Product} breadcrumbText={['See more details', 'Single Product']} />} />
				<Route path="/checkout" element={<Layout component={Checkout} title="Checkout" breadcrumbText={['Fresh and Organic', 'Check Out Product']} />} />
				<Route path="/admin" element={<AdminLogin />} />
				<Route path="/adminpanel" element={<Admin />} />
				<Route path="/adminproducts" element={<AdminProducts />} />
				<Route path="/adminorders" element={<AdminOrders />} />
				<Route path="/404" element={<Layout component={NotFoundPage} title="Page Not Found" breadcrumbText={['Fresh and Organic', '404 - Not Found']} />} />
				<Route path="*" element={<Navigate replace to="/404" />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
