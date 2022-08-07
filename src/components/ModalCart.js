//import { Link } from 'react-router-dom'//<Link to={`/cart`}>Checkout</Link> navigateToCheckout, 

const ModalCart = ({items, show, removeItem, plusItem, minusItem, navigateButton, clearCart, closeCart}) => {
	return (
	<div className={show ? 'modal fade bd-example-modal-lg show' : 'modal fade bd-example-modal-lg'} id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div className="modal-dialog modal-lg" role="document">
			<div className="modal-content">
				<div className="modal-header text-center">
					<h5 className="modal-title d-block mt-0 mb-0 ml-auto" id="exampleModalLabel">Cart</h5>
					<button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeCart}>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div className="modal-body">
				
					<section className="h-100">
						<div className="container h-100 py-5">
							<div className="row d-flex justify-content-center align-items-center h-100">
								<div className="col-10">
						
								{!items || !items.length ?
									<div className="text-center"><b>Cart is empty</b></div>
								:
									<>
									{items.map(item => {
										return (
											<div key={item.id} className="card rounded-3 mb-4">
												<div className="card-body p-4">
													<div className="row d-flex justify-content-between align-items-center">
														<div className="col-md-12 col-lg-4 col-xl-4 img-container">
															<img
																src={item.img}
																className="img-fluid rounded-3" alt={item.name} />
														</div>
														<div className="col-md-12 col-lg-2 col-xl-2">
															<p className="lead fw-normal mb-2 text-center">{item.name}</p>
														</div>
														<div className="item-info-block col-4 col-md-4 col-lg-2 col-xl-2 d-flex">
															<span>
																<button className="btn btn-link px-2" onClick={() => minusItem(item.id)}>
																	<i className="fas fa-minus"></i>
																</button>
																<span className="quanity">{item.count}</span>
																<button className="btn btn-link px-2" onClick={() => plusItem(item.id)}>
																	<i className="fas fa-plus"></i>
																</button>
															</span>
														</div>
														<div className="item-info-block col-4 col-md-4 col-lg-2 col-xl-2">
															<span>
																<h5 className="mb-0">${item.price * item.count}</h5>
															</span>
														</div>
														<div className="item-info-block col-4 col-md-4 col-lg-1 col-xl-1 text-end">
															<span>
																<span onClick={() => removeItem(item.id)} className="del-item text-danger"><i className="fas fa-trash fa-lg"></i></span>
															</span>
														</div>
													</div>
												</div>
											</div>
										)}
									)}
									</>
								}

								</div>
							</div>
						</div>
					</section>
				

					
				
				</div>
				<div className="modal-footer text-center">
					{navigateButton && <button type="button" className="btn btn-primary" onClick={() => { closeCart(); navigateButton.navigate(); }}>{navigateButton.caption}</button>}
					{items && !!items.length && <>
						{/*<a href="/checkout">
						<button type="button" className="btn btn-primary" onClick={() => { closeCart(); navigateToCheckout(); }}>Checkout</button>
						</a>*/}
						<button type="button" className="btn btn-primary" onClick={clearCart}>Clear Cart</button>
					</>}
					<button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeCart}>Close</button>
					{/*<Link to="/shop" target="_blank" rel="noopener noreferrer">QWERTY</Link>*/}
				</div>
			</div>
		</div>
	</div>
	)
}

export default ModalCart