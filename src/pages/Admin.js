import React, { useEffect } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/actions/auth'

import Loading from '../components/Admin/Loading'

import '../assets/css/admin.css'


const Admin = () => {
	const dispatch = useDispatch()

	const {loading, error, user, tokenExp} = useSelector(state => state.auth)

	useEffect(() => {
		if(!loading && error){
			alert(error)
			return dispatch(logout())
		}
	}, [loading, error])

	if(loading){
		return (
			<Loading />
		)
	}

	if(!user || !tokenExp || Date.now() > tokenExp * 1000){
		return (
			<Navigate to="/admin" replace={true} />
		)
	}

	return (
		<div className="wrapper admin-wrapper">
			<main className="page">
				<div className="main-block">
					<div className="main-block__container">
						<div className="main-block__top">
							<div className="main-block__title">Приветствуем, {user.username}!</div>
							<a className="header__exit exit-button" href="#" onClick={() => dispatch(logout())}>Выйти</a>
						</div>
						<div className="main-block__body">
							<Link to="/admin/products" className="main-block__button">Управление товарами (продуктами)</Link>
							<Link to="/admin/orders" className="main-block__button">Управление заказами</Link>
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}

export default Admin
