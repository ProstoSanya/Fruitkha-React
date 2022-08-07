import { Link } from 'react-router-dom'
import ProductBlock from '../Shop/ProductBlock'

const SimilarProducts = ({products, addProduct, title}) => {
	return (
		<div className="more-products mb-150">
			<div className="container">
				<div className="row">
					<div className="col-lg-8 offset-lg-2 text-center">
						<div className="section-title">
							{title &&
								<h3>
									<span className="orange-text">{title.split(' ')[0]}</span>
									{title.split(' ').length > 1 && (' ' + title.split(' ').slice(1).join(' '))}
								</h3>
							}
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, fuga quas itaque eveniet beatae optio.</p>
						</div>
					</div>
				</div>
				<div className="row">
					{products.map(p =>
						<ProductBlock {...p} linkComponent={Link} key={p.id} addProduct={addProduct}/>
					)}
				</div>
			</div>
		</div>
	)
}
export default SimilarProducts
