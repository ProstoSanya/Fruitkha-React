import React, { useEffect, useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/actions/auth'

import Loading from '../components/Admin/Loading'
import LoadingAnim from '../components/Admin/LoadingAnim'

import '../assets/css/admin.css'

import { fetchOrders, updateOrder } from '../api/orderAPI'

const statusData = {
	'NEW': 'Новый',
	'IN_PROCESS': 'Выполняется',
	'EXECUTED': 'Выполнен',
	'REJECTED': 'Отклонен'
}

const AdminOrders = () => {
	const dispatch = useDispatch()

	const {loading, error, user, token, tokenExp} = useSelector(state => state.auth)
	const headers = {Authorization: 'Bearer ' + token}

	const [pageLoading, setPageLoading] = useState(true)
	const [orderLoading, setOrderLoading] = useState([]) // массив заказов
	const [orders, setOrders] = useState([])

	useEffect(() => {
		if(!loading && error){
			alert(error)
			return dispatch(logout())
		}
	}, [loading, error])

	const fetchAllOrders = async () => {
		try{
			const data = await fetchOrders(headers)
			const items = data.rows || []
			setOrders(items)
		}
		catch(err){
			const message = err?.response?.data?.message || err.message || err.toString()
			setOrders([])
			alert(message)
		}
	}

	useEffect(() => {
		setPageLoading(true)
		fetchAllOrders().then(() => setPageLoading(false))
	}, [])

	const handleStatusChange = async (newStatus, order) => {
		try{
			if(newStatus === order.status){
				return
			}
			setOrderLoading([
				...orderLoading,
				order.id
			])
			const res = await updateOrder({id: order.id, status: newStatus}, headers)
			if(!res || !res.id){
				const resText = (typeof res === 'object') ? JSON.stringify(res) : res
				throw new Error(`Возникла ошибка при запросе. Ответ: ${resText}`)
			}
			const newOrders = orders.map((o) => o.id == order.id ? {...order, ...res} : o)
			setOrders(newOrders)
		}
		catch(err){
			const message = err?.response?.data?.message || err.message || err.toString()
			alert(message)
		}
		finally{
			setOrderLoading(orderLoading.filter((id) => order.id !== id))
		}
	}

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
			<header className="header">
				<div className="header__container">
					<Link to="/admin/products" className="header__move">&lArr; Управление в товарами (продуктами)</Link>
					<a className="header__exit exit-button" href="#" onClick={() => dispatch(logout())}>Выйти</a>
				</div>
			</header>
			<main className="page">
				<div className="order">
					<div className="order__container">
						<div className="order__wrapper">
							<div className="order__amount">
								Всего заказов: {pageLoading ? ' ...' : <>{orders ? orders.length : 0}</>}
							</div>
							{pageLoading ? (
								<LoadingAnim />
							) : (
								<div className="order__body">
									{orders && orders.map((order) =>
										<div key={order.id} className="order__item item-order">
											<div className="item-order__title">Заказ №{order.id}</div>
											<div className="item-order__wrapper">
												<div className="item-order__column">
													<div className="item-order__label">Поступил: <span>{order.createdAt}</span></div>
													<div className="item-order__text">Список товаров:</div>
													<div className="item-order__body">
														{order.products.map((p) =>
															<div key={p.name} className="item-order__item">
																{p.name} {p.price}грн x {p.order_product.count || 1}шт = {p.price * (p.order_product.count || 1)}грн
															</div>
														)}
													</div>
												</div>
												<div className="item-order__column">
													<div className="item-order__label">Статус изменен: <span>{order.editedAt}</span></div>
													<div className="item-order__text">Контакты:</div>
													<div className="item-order__body">
														<div className="item-order__item">Name: {order.name}</div>
														<div className="item-order__item">Email: {order.email}</div>
														<div className="item-order__item">Phone: {order.phone}</div>
														<div className="item-order__item">Address: {order.address}</div>
														<div className="item-order__item">Comment: {order.comment}</div>
													</div>
												</div>
											</div>
											<div className="item-order__bottom">
												<div className="item-order__detail">Всего товаров: <span>{order.products.reduce((prev, curr) => (curr.order_product.count || 1) + prev, 0)}</span></div>
												<div className="item-order__detail">Итоговая стоимось: <span>{order.totalPrice}</span></div>
												<div className="item-order__detail">
													Статус:
													{orderLoading.includes(order.id) ?
														<span className="order_loading">
															<LoadingAnim />
														</span>
													:
														<select
															className="item-order__select"
															value={order.status}
															onChange={(e) => handleStatusChange(e.target.value, order)}
															disabled={pageLoading ? 'disabled' : false}
														>
															{Object.keys(statusData).map((s) =>
																<option key={s} value={s}>{statusData[s]}</option>
															)}
														</select>
													}
												</div>
											</div>
										</div>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}

export default AdminOrders
