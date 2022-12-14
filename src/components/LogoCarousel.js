import NukaCarousel from 'nuka-carousel'

const LogoCarousel = ({options}) => {
	return (
		<div className="logo-carousel-section">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="">

						<NukaCarousel
							autoplay={true}
							autoplayInterval={4500}
							speed={450}
							slidesToShow={4}
							wrapAround={true}
							cellAlign={'left'}
							adaptiveHeight={true}
							withoutControls={true}
						>

							<div className="single-logo-item">
								<img src="images/company-logos/1.png" alt="" style={{display: "block", margin:"0 auto"}} />
							</div>
							<div className="single-logo-item">
								<img src="images/company-logos/2.png" alt="" style={{display: "block", margin:"0 auto"}} />
							</div>
							<div className="single-logo-item">
								<img src="images/company-logos/3.png" alt="" style={{display: "block", margin:"0 auto"}} />
							</div>
							<div className="single-logo-item">
								<img src="images/company-logos/4.png" alt="" style={{display: "block", margin:"0 auto"}} />
							</div>
							<div className="single-logo-item">
								<img src="images/company-logos/5.png" alt="" style={{display: "block", margin:"0 auto"}} />
							</div>

						</NukaCarousel>

						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LogoCarousel
