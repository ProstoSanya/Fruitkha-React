import { useState } from 'react'
import HeaderContent from './HeaderContent'
import Sticky from 'react-stickynode'

const Header = ({links,totalPrice, totalCount, cartIconClick}) => {
	const [isFixed, setIsFixed] = useState(false)
	const handleStateChange = (status) => {
		setIsFixed(status.status === Sticky.STATUS_FIXED)
	}

	return (
		<div id="sticker-sticky-wrapper" className={'sticky-wrapper ' + (isFixed ? 'is-sticky' : '' )}>
			<Sticky enabled={true} onStateChange={handleStateChange}>
				<HeaderContent links={links} totalPrice={totalPrice} totalCount={totalCount} cartIconClick={cartIconClick} />
			</Sticky>
		</div>
	)
}

export default Header
