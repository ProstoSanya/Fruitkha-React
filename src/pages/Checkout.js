import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { showCart } from '../redux/actions/cartModal'
import { clearCart } from '../redux/actions/cart'

import { createOrder } from '../api/orderAPI'
import { checkField }  from '../lib'

const Checkout = () => {
	const { token } = useSelector(state => state.auth)
	const headers = {Authorization: 'Bearer ' + token}

	const { items, totalPrice, totalCount } = useSelector(state => state.cart)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => { // check order
		if(!items.length){
			return navigate('/shop')
		}
	}, [])

	const showModalCart = () => dispatch(showCart())

	const initialFormValue = {
		name: {value: '', error: false},
		email: {value: '', error: false},
		address: {value: '', error: false},
		phone: {value: '', error: false},
		comment: {value: '', error: false}
	}
	const [formValue, setFormValue] = useState(initialFormValue)

	const handleChange = (e) => {
		const {name, value} = e.target
		const error = !checkField(name, value)
		setFormValue({
			...formValue,
			[name]: {...formValue[name], value, error}
		})
	}

	const [pageLoading, setPageLoading] = useState(false)
	const handleSubmit = async (e) => {
		e.preventDefault()
		if(pageLoading){
			return
		}
		setPageLoading(true)
		try{
			let data = {...formValue}
			// validation
			let errorExists = false
			for(let name in data){
				if(data[name].error){
					errorExists = true
					continue
				}
				if(!checkField(name, data[name].value)){
					errorExists = true
					data[name].error = true
				}
			}
			if(errorExists){
				setFormValue({
					...formValue,
					...data
				})
				return
			}
			// validation end
			const values = {}
			for(let key in data){
				values[key] = data[key].value
			}
			const res = await createOrder(
				{
					...values,
					products: items,
					totalPrice
				},
				headers
			)
			if(!res || !res.id){
				const resText = (typeof res === 'object') ? JSON.stringify(res) : res
				throw new Error(`Возникла ошибка при запросе. Ответ: ${resText}`)
			}
			dispatch(clearCart())
			alert('Success. Your order is being processed.')
			return navigate('/shop')
		}
		catch(err){
			console.log(err)
			const msg = err?.response?.data?.message || err.message || err.toString()
			alert(msg)
		}
		finally{
			setPageLoading(false)
		}
	}

	return (
		<div className="checkout-section mt-150 mb-150">
			<div className="container">
				<div className="row">
					<div className="col-lg-8">
						<div className="checkout-accordion-wrap">
							<div className="accordion" id="accordionExample">
							  <div className="card single-accordion">
								<div className="card-header" id="headingOne">
								  <h5 className="mb-0">
									<button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
									  Your personal data
									</button>
								  </h5>
								</div>

								<div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
								  <div className="card-body">
									<div className="billing-address-form">
										<form action="#" method="POST" onSubmit={handleSubmit}>
											<p>
												<input
													type="text"
													placeholder="Name"
													name="name"
													className={formValue.name.error ? "error" : ""}
													value={formValue.name.value}
													onChange={handleChange}
												/>
											</p>
											<p>
												<input
													type="email"
													placeholder="Email"
													name="email"
													className={formValue.email.error ? "error" : ""}
													value={formValue.email.value}
													onChange={handleChange}
												/>
											</p>
											<p>
												<input
													type="text"
													placeholder="Address"
													name="address"
													className={formValue.address.error ? "error" : ""}
													value={formValue.address.value}
													onChange={handleChange}
												/>
											</p>
											<p>
												<input
													type="tel"
													placeholder="Phone"
													name="phone"
													className={formValue.phone.error ? "error" : ""}
													value={formValue.phone.value}
													onChange={handleChange}
												/>
											</p>
											<p>
												<textarea
													cols="30"
													rows="10"
													placeholder="Say Something"
													name="comment"
													className={formValue.comment.error ? "error" : ""}
													value={formValue.comment.value}
													onChange={handleChange}
												></textarea>
											</p>
											<p style={{textAlign: 'center', fontWeight: '500'}}>
												<a
													href="#"
													className={`boxed-btn ${pageLoading ? `disabled` : ``}`}
													style={{paddingLeft: '40px', paddingRight: '40px', fontSize: '16px'}}
													onClick={handleSubmit}
												>
													Send
												</a>
											</p>
										</form>
									</div>
								  </div>
								</div>
							  </div>
							</div>

						</div>
					</div>

					<div className="col-lg-4">
						<div className="order-details-wrap">
							<table className="order-details">
								<thead>
									<tr>
										<th colSpan="3">Order Details</th>
									</tr>
								</thead>
								<tbody className="order-details-body">
									<tr>
										<td>Product</td>
										<td>Count</td>
										<td>Total</td>
									</tr>
									{items && !!items.length && items.map(item => <tr key={item.id}>
										<td>{item.name}</td>
										<td>{item.count}</td>
										<td>${item.count * item.price}</td>
									</tr>)}
								</tbody>
								<tbody className="checkout-details">
									<tr>
										<td><b>Total</b></td>
										<td><b>{totalCount}</b></td>
										<td><b>${totalPrice}</b></td>
									</tr>
								</tbody>
							</table>
							<a href="#" className="boxed-btn" onClick={showModalCart}>Change</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Checkout
