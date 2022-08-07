import { Link } from 'react-router-dom'

const BreadcrumbSection = ({text}) => {
	return (
		<div className="breadcrumb-section breadcrumb-bg">
		<div className="site-logo mobile-site-logo">
			<Link to="/">
				<img src="/images/logo.png" alt="" />
			</Link>
		</div>
			<div className="container">
				<div className="row">
					<div className="col-lg-8 offset-lg-2 text-center">
						{text && !!text.length &&
							<div className="breadcrumb-text">
								<p>{text.length > 0 && text[0]}</p>
								<h1>{text.length > 1 && text[1]}</h1>
							</div>
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default BreadcrumbSection
