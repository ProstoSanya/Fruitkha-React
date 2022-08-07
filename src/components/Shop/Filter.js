import { Link } from 'react-router-dom'

const Filter = ({type, types, country, countries, createFilterUrl, nameExists}) => {
	return (
		<div className="row">
			<div className="col-md-12">
				<div className="product-filters">
					<ul>
						{types && !!types.length && <li className={`${!type || !nameExists(type, types) ? 'active' : ''}`} key={0}>
							<Link to={`${createFilterUrl({type: ''})}`}>All</Link>
						</li>}
						{types && types.map((t) =>
							<li className={`${type && type.toLowerCase() === t.name.toLowerCase() ? 'active' : ''}`} key={t.id}>
								<Link to={`${createFilterUrl({type: t.name})}`}>{t.name}</Link>
							</li>
						)}
					</ul>
					<ul>
						{countries && !!countries.length && <li className={`${!country || !nameExists(country, countries) ? 'active' : ''}`} key={0}>
							<Link to={`${createFilterUrl({country: ''})}`}>All</Link>
						</li>}
						{countries && countries.map((c) =>
							<li className={`${country && country.toLowerCase() === c.name.toLowerCase() ? 'active' : ''}`} key={c.id}>
								<Link to={`${createFilterUrl({country: c.name})}`}>{c.name}</Link>
							</li>
						)}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Filter