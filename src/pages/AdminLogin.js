import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { login } from '../redux/actions/auth'

const AdminLogin = () => {
	const dispatch = useDispatch()
	const {loading, error, user, tokenExp} = useSelector(state => state.auth)
	const [formValue, setFormValue] = useState({
		login: '',
		password: ''
	})

	const handleChange = (e) => {
		setFormValue({
			...formValue,
			[e.target.name]: e.target.value
		})
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		if(formValue.login && formValue.password){
			dispatch(login(formValue.login, formValue.password))
		}
	}

	return (
		<div className="form">
			{user && tokenExp * 1000 > Date.now() ? (
				<Navigate to="/admin/panel" replace={true} />
			) : (
				<form className="form-horizontal" method="POST" onSubmit={handleSubmit} style={{width: '300px', margin: '0 auto', paddingTop: '40px'}}>
					<div className="form-group">
						<div className="col-sm-10">
							<input
								type="text"
								className="form-control"
								placeholder="Login"
								name="login"
								onChange={handleChange}
								value={formValue.login}
								disabled={loading ? 'disabled' : false}
							/>
						</div>
					</div>
					<div className="form-group">
						<div className="col-sm-10">
							<input
								type="password"
								className="form-control"
								placeholder="Password"
								name="password"
								onChange={handleChange}
								value={formValue.password}
								disabled={loading ? 'disabled' : false}
							/>
						</div>
					</div>
					<div className="form-group">
						<div className="col-sm-offset-2 col-sm-10">
							<button type="submit" className="btn btn-primary" disabled={loading ? 'disabled' : false}>Sign In</button>
						</div>
					</div>
					{!!error && <div className="form-group">
						<span style={{color: 'red'}}>{error}</span>
					</div>}
				</form>
			)}
		</div>
	)
}

export default AdminLogin
