import React, {useState, useRef} from 'react'
import burger from 'assets/images/burger.svg'
import isotipo from 'assets/images/isotipo.svg'
import x from 'assets/images/x.svg'
import 'components/styles/Nav.scss'

type Props = {
  children: JSX.Element
}
export default function Nav ({children} : Props) {
	const [isActive, setIsActive] = useState<boolean>(false)
	const menu = useRef<any>()

	const handleClick = (e: React.SyntheticEvent<HTMLImageElement | HTMLElement>) => {
		const target = e.target as HTMLImageElement | HTMLElement
    
		if (target === menu.current) {
			menu.current.classList.toggle('active')
			setIsActive(prev => !prev)
		} 
	}

	return (
		<nav className="navigation" onClick={handleClick}>
			<img alt="isotipo" className="isotipo" src={isotipo} />
			<img alt='toggle' ref={menu} className="burger" src={isActive ? x : burger} />
			{
				children
			}
		</nav>
	)
}