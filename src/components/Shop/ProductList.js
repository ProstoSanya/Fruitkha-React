import { Link } from 'react-router-dom'
import ProductBlock from './ProductBlock'

const ProductList = ({items, addProduct}) => {
	return (
		<div className="row product-lists">
			{items && items.map((item) => 
				<ProductBlock key={item.id} {...item} linkComponent={Link} addProduct={addProduct}/>
			)}
		</div>
	)
}

export default ProductList