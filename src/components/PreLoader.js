import { useState, useEffect } from 'react'

const PreLoader = () => {
	let [className, setClassName] = useState('loader')
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		setIsLoaded(true)
	}, [])
	useEffect(() => {
		if(isLoaded){
			setClassName(className + ' fadeout')
		}
	}, [isLoaded])
	
	return <div className={className}>
		<div className="loader-inner">
			<div className="circle"></div>
		</div>
	</div>
}

export default PreLoader