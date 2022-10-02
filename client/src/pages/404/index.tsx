import whiteboard from 'assets/images/whiteboard.svg'
import { Link } from 'react-router-dom'
import './styles/index.scss'
// import { Helmet } from 'react-helmet'
import Helmet from 'react-helmet'

export default function NotFound () {
	return (
		<section className='error'>
			<Helmet>
				<title>Nopiqui | Not found</title>
			</Helmet>
			<h2>404</h2>
			<p className='text'>just a whiteboard</p>
			<img src={whiteboard} alt="Empty sheet" />
			<p className='text'>There&apos;s nothing here :(</p>
			<Link to='/'><button className='return' >Go Back</button></Link>
		</section>
	)
}