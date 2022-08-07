import { Link } from 'react-router-dom'

const HeaderContent = ({style, links, totalPrice, totalCount, cartIconClick}) => {
	return (
		<div className="top-header-area" id="sticker" style={style}>
			<div className="container">
				<div className="row">
					<div className="col-lg-12 col-sm-12 text-center">
						<div className="main-menu-wrap">
							<div className="site-logo">
								<Link to="/">
									<img src="/images/logo.png" alt="" />
								</Link>
							</div>

							<nav className="main-menu">
								<ul>
									{links && links.map((l) =>
										<li key={l.title} className={l.class ? l.class : ""}>
											<Link to={l.to}>{l.title}</Link>
										</li>
									)}
									<li>
										<div className="header-icons">
											{!!totalPrice && !!totalCount ?
												<span className="shopping-cart" onClick={cartIconClick}>
													<i className="fas fa-shopping-cart"></i>&nbsp;&nbsp;{`${'$' + totalPrice} / ${totalCount}`}
												</span>
												:
												<>&nbsp;</>
											}
										</div>
									</li>
								</ul>
							</nav>
							<div className="mobile-menu"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HeaderContent
