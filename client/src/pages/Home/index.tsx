import './styles/index.scss'
import Nav from 'components/Nav'
import NavHome from 'components/NavHome'
import NotesSection from './NotesSection'
import { Outlet } from 'react-router-dom'
import Helmet from 'react-helmet'

export default function Home () {
	return (
		<div className='home'>
			<Helmet>
				<title>Nopiqui | Home</title>
				<meta name="description" content="Homepage, check your dashboard." />
			</Helmet>
			<Nav>
				<NavHome />
			</Nav>
			<NotesSection />
			<Outlet />
		</div>
	)
}