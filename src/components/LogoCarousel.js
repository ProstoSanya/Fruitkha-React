import OwlCarousel from 'react-owl-carousel'

const LogoCarousel = ({options}) => {
	return (
		<div className="logo-carousel-section">

			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="logo-carousel-inner">

						<OwlCarousel className="owl-theme" {...options}>

							<div className="single-logo-item">
								<img src="images/company-logos/1.png" alt="" />
							</div>
							<div className="single-logo-item">
								<img src="images/company-logos/2.png" alt="" />
							</div>
							<div className="single-logo-item">
								<img src="images/company-logos/3.png" alt="" />
							</div>
							<div className="single-logo-item">
								<img src="images/company-logos/4.png" alt="" />
							</div>
							<div className="single-logo-item">
								<img src="images/company-logos/5.png" alt="" />
							</div>

						</OwlCarousel>

						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LogoCarousel
