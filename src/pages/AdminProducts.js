import React, { useEffect, useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/actions/auth'

import Loading from '../components/Admin/Loading'
import LoadingAnim from '../components/Admin/LoadingAnim'

import '../assets/css/admin.css'

import { fetchTypes, fetchCountries, fetchProducts, putProduct, deleteProduct } from '../api/shopAPI'
import { fetchCallback, getNameById }  from '../lib'

const AdminProducts = () => {
	const dispatch = useDispatch()

	const {loading, error, user, token, tokenExp} = useSelector(state => state.auth)
	const headers = {Authorization: 'Bearer ' + token}
	//console.log('headers', headers)

	const [pageLoading, setPageLoading] = useState(true)

	const [products, setProducts] = useState([])
	const [types, setTypes] = useState([])
	const [countries, setCountries] = useState([])

	useEffect(() => {
		if(!loading && error){
			alert(error)
			return dispatch(logout())
		}
	}, [loading, error])

	const fetchAllProducts = async () => {
		try{
			const data = await fetchProducts()
			const items = data.rows || []
			setProducts(items)
		}
		catch(err){
			const message = err?.response?.data?.message || err.message || err.toString()
			setProducts([])
			alert(message)
		}
		setFormValue({
			...formValue,
			id: ''
		})
	}

	useEffect(() => {
		setPageLoading(true)
		//setTimeout(() => {
		fetchTypes(false).then(fetchCallback(setTypes))
		fetchCountries(false).then(fetchCallback(setCountries))
		fetchAllProducts().then(() => setPageLoading(false))
		//}, 3000)
	}, [])


	const [modalState, setModalState] = useState({editing: false, show: false})
	const hideModalWindow = () => setModalState({...modalState, show: false})

	const initialFormValue = {
		id: '',
		name: '',
		description: '',
		price: '',
		type: '',
		country: '',
		img: '',
		originImg: '',
		clearImg: ''
	}
	const [formValue, setFormValue] = useState(initialFormValue)

	const handleChange = (e) => {
		const name = e.target.name
		const value = (name === 'img') ? e.target.files[0] : e.target.value
		setFormValue({
			...formValue,
			[name]: value
		})
	}

	const addBtnHandler = () => {
		if(modalState.editing){
			setFormValue(initialFormValue)
		}
		setModalState({editing: false, show: true})
	}
	const editBtnHandler = (data) => {
		if(formValue.id != data['id']){
			setFormValue({
				...formValue,
				id: data['id'],
				name: data['name'],
				description: data['description'],
				price: data['price'],
				type: data['typeId'],
				country: data['countryId'],
				img: '',
				originImg: data['img'],
				clearImg: ''
			})
		}
		setModalState({editing: true, show: true})
	}
	const deleteBtnHandler = async (id) => {
		setPageLoading(true)
		await deleteProduct(id, headers)
		fetchAllProducts().then(() => setPageLoading(false))
	}

	const toggleClearImg = () => {
		setFormValue({
			...formValue,
			clearImg: !formValue.clearImg
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setPageLoading(true)
		try{
			let data = {...formValue}
			if(!data.type && types.length){
				data.type = types[0].id
			}
			if(!data.country && countries.length){
				data.country = countries[0].id
			}
			let res
			if(!data.img){
				res = await putProduct(data, headers)
			}
			else{
				const formData = new FormData()
				for(let key in data){
					formData.append(key, data[key])
				}
				res = await putProduct(formData, {...headers, 'Content-Type': 'multipart/form-data'})
			}
			if(!res || !res.id){
				const resText = (typeof res === 'object') ? JSON.stringify(res) : res
				throw new Error(`Возникла ошибка при запросе. Ответ: ${resText}`)
			}
			fetchAllProducts().then(() => setPageLoading(false))
			setModalState({editing: true, show: false})
		}
		catch(err){
			console.log(err)
			const msg = err?.response?.data?.message || err.message || err.toString()
			alert(msg)
			setPageLoading(false)
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
					<Link to="/adminorders" className="header__move">&lArr; Управление заказами</Link>
					<a className="header__exit exit-button" href="#" onClick={() => dispatch(logout())}>Выйти</a>
				</div>
			</header>
			<main className="page">
				<div className="cart">
					<div className="cart__container">
						<div className="cart__header">
							<div className="cart__amount">
								Всего товаров в базе: {pageLoading ? ' ...' : <>{products ? products.length : 0}</>}&nbsp;&nbsp;&nbsp;
								<button className="cart__add btn-green" onClick={addBtnHandler} disabled={pageLoading ? 'disabled' : false}>Добавить</button>
							</div>
						</div>
						{pageLoading ? (
							<LoadingAnim />
						) : (
							<div className="cart__body">
							{products && products.map((p) =>
								<div className="cart__item item-cart" key={p.id}>
									<div className="item-cart__wrapper">
										<div className="item-cart__image _ibg">
											<img src={p.img ? process.env.REACT_APP_IMAGES_FOLDER + p.img : 'images/products/_default.png'} alt={p.name} />
										</div>
										<div className="item-cart__body">
											<div className="item-cart__top">
												<div className="item-cart__title">{p.name}</div>
												<div className="item-cart__buttons">
													<button
														type="button"
														className="item-cart__edit item-cart__button"
														onClick={() => editBtnHandler(p)}
														disabled={pageLoading ? 'disabled' : false}
													>
														Редактировать
													</button>
													<button
														type="button"
														className="item-cart__remove item-cart__button btn-red"
														onClick={() => deleteBtnHandler(p.id)}
														disabled={pageLoading ? 'disabled' : false}
													>
														Удалить
													</button>
												</div>
											</div>
											<div className="item-cart__descr">
											{p.description}
											</div>
										</div>
									</div>
									<div className="item-cart__bottom">
										<div className="item-cart__category">Тип: <span>{getNameById(p.typeId, types)}</span></div>
										<div className="item-cart__category">Страна: <span>{getNameById(p.countryId, countries)}</span></div>
										<div className="item-cart__price">Цена: <span>${p.price}</span></div>
									</div>
								</div>
							)}
							</div>
						)}
					</div>
				</div>
			</main>
			<div className={modalState.show ? `modal-admin modal-open` : `modal-admin`}>
				<div className="modal">
					<div className="modal__wrapper">
						<div className="modal__content">
							<div className="modal__close" onClick={() => !pageLoading && hideModalWindow()}></div>
							<form action="#" name="#" className="modal__form" method="POST" onSubmit={handleSubmit}>
								<input
									type="hidden"
									name="id"
									defaultValue={formValue.id}
								/>
								<input
									type="text"
									className="modal__input"
									name="name"
									placeholder="Название"
									autoComplete="off"
									value={formValue.name}
									onChange={handleChange}
									disabled={pageLoading ? 'disabled' : false}
								/>
								<textarea
									type="text"
									className="modal__input modal__textarea"
									name="description"
									placeholder="Описание"
									autoComplete="off"
									value={formValue.description}
									onChange={handleChange}
									disabled={pageLoading ? 'disabled' : false}
								/>

								{/*<label>Изображение: </label>*/}
								<label className="modal__file-btn">
									<div className="modal__file-text">{formValue.img ? formValue.img.name : "Выберите фото"}</div>
									<input
										type="file"
										className="modal__file"
										name="img"
										onChange={handleChange}
										/*value={formValue.img}*/
										value=''
										disabled={pageLoading ? 'disabled' : false}
									/>
								</label>
								<input
									type="hidden"
									name="originImg"
									defaultValue={formValue.originImg}
								/>
								<input
									type="hidden"
									name="clearImg"
									defaultValue={formValue.clearImg ? '1' : ''}
								/>
								{formValue.originImg && <div className="modal__current-image">
									<div className={formValue.clearImg ? "clear-img" : ""} onClick={toggleClearImg}>
										<img src={process.env.REACT_APP_IMAGES_FOLDER + formValue.originImg} alt={formValue.name}/>
									</div>
								</div>}


								<label>Тип: </label>
								<select name="type" className="form-control" placeholder="Тип" value={formValue.type} onChange={handleChange} disabled={pageLoading ? 'disabled' : false}>
									{types && types.map((t) =>
										<option key={t.id} value={t.id}>{t.name}</option>
									)}
								</select>

								<label>Страна: </label>
								<select name="country" className="form-control" placeholder="Страна" value={formValue.country} onChange={handleChange} disabled={pageLoading ? 'disabled' : false}>
									{countries && countries.map((c) =>
										<option key={c.id} value={c.id}>{c.name}</option>
									)}
								</select>

								{/*<label>Цена: </label>*/}
								<input
									type="text"
									className="modal__input"
									name="price"
									placeholder="Цена"
									autoComplete="off"
									value={formValue.price}
									onChange={handleChange}
									disabled={pageLoading ? 'disabled' : false}
								/>

								<div className="modal__buttons">
									<button
										type="submit"
										className="modal__send btn-green"
										onClick={handleSubmit}
										disabled={pageLoading ? 'disabled' : false}
									>
										Сохранить
									</button>
									<button
										type="button"
										className="modal__cancel btn-red"
										onClick={hideModalWindow}
										disabled={pageLoading ? 'disabled' : false}
									>
										Отменить
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AdminProducts
