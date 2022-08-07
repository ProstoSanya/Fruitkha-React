import { Link } from 'react-router-dom'

const ProductInfo = ({id, img, name, price, description, type, country, count, handleCountChange, addProduct}) => {
	return (
		<div className="single-product mt-150 mb-150">
			<div className="container">
				<div className="row">
					<div className="col-md-5">
						<div className="single-product-img">
							<img src={img} alt={name} />
						</div>
					</div>
					<div className="col-md-7">
						<div className="single-product-content">
							<h3>{name}</h3>
							<p className="single-product-pricing"><span>Per Kg</span> ${price}</p>
							<p>{description}</p>
							<div className="single-product-form">
								<form>
									<input type="number" value={count} onChange={handleCountChange} />
								</form>
								<a className="cart-btn" onClick={() => addProduct({id, name, price, img}, count)}>
									<i className="fas fa-shopping-cart"></i> Add to Cart
								</a>
								<p><strong>
									<span>Categories: </span>
									{type && <Link to={`/shop?type=${type}`} target="_blank">{type}</Link>}
									{type && country && <>, </>}
									{country && <Link to={`/shop?country=${country}`} target="_blank">{country}</Link>}
								</strong></p>
								
							</div>
							<h4>Share:</h4>
							<ul className="product-share">
								<li><a><i className="fab fa-facebook-f"></i></a></li>
								<li><a><i className="fab fa-twitter"></i></a></li>
								<li><a><i className="fab fa-google-plus-g"></i></a></li>
								<li><a><i className="fab fa-linkedin"></i></a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default ProductInfo