import 'styles/NavList.scss'
import { Link } from 'react-router-dom'

export default function NavList () {
  return (
      <ul className='navlist'>
        <Link to='/register'><li>Get started</li></Link>
        <Link to='/login'><li>Log In</li></Link>
        <a href="#mission"><li>Why us?</li></a>
        <a href="#pricing"><li>Pricing and contact us</li></a>
      </ul>
  )
}