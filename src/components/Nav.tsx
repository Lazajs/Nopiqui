import React, {useState} from "react"
import burger from 'assets/images/burger.svg'
import isotipo from 'assets/images/isotipo.svg'
import x from 'assets/images/x.svg'
import 'styles/Nav.scss'
import { Link } from "react-router-dom"

export default function Nav () {
  const [isActive, setIsActive] = useState<boolean>(false)
 

  const handleClick = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e .target as HTMLImageElement
    if (isActive) {
      setIsActive(false)
      target.classList.remove('active')
    }
    else if (!isActive) {
      setIsActive(true)
      target.classList.add('active')
    }}

  return (
    <nav className="navigation">
      <img alt="isotipo" className="isotipo" src={isotipo} />
      <img onClick={handleClick} className="burger" src={isActive ? x : burger} />
      <ul>
         <Link to='/register'><li>Get started</li></Link>
        <a href="#mission"><li>Why us?</li></a>
        <a href="#pricing"><li>Pricing and contact us</li></a>
      </ul>
    </nav>
  )
}