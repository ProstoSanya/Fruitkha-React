const Product = ({id, name, price, img, addProduct, linkComponent: Link}) => {
	img = img ? process.env.REACT_APP_IMAGES_FOLDER + img : 'images/products/_default.png'
	return (
		<div className="col-lg-4 col-md-6 text-center">
			<div className="single-product-item">
				<div className="product-image">
					<Link to={`/shop/${id}`}><img src={img} alt={name} /></Link>
				</div>
				<h3>{name}</h3>
				<p className="product-price"><span>Per Kg</span> ${price} </p>
				<span className="cart-btn" onClick={() => addProduct({id, name, price, img})}><i className="fas fa-shopping-cart"></i> Add to Cart</span>
			</div>
		</div>
	)
}

export default Product