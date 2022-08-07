import { Link } from 'react-router-dom'

const Pagination = ({pageCount, page, createFilterUrl}) => {
	return (
		<div className="row">
			<div className="col-lg-12 text-center">
				<div className="pagination-wrap">
					<ul>
						{/* Prev link */}
						{page < 2 ?
							<li key={`prev`}><a className="disabled">Prev</a></li>
						:
							<li key={`prev`}><Link to={createFilterUrl({page: page - 1})}>Prev</Link></li>
						}
						{/* Links */}
						{Array(pageCount).fill(0).map((_, num) => {
							num++
							return (num == page) ?
								<li key={num}><a className="active">{num}</a></li>
							:
								<li key={num}><Link to={createFilterUrl({page: num})}>{num}</Link></li>
						})}
						{/* Next link */}
						{page >= pageCount ?
							<li key={`next`}><a className="disabled">Next</a></li>
						:
							<li key={`next`}><Link to={createFilterUrl({page: page + 1})}>Next</Link></li>
						}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Pagination