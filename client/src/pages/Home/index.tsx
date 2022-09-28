import './styles/index.scss'
import Nav from 'components/Nav'
import NavHome from 'components/NavHome'
import NotesSection from './NotesSection'
import { Outlet } from 'react-router-dom'

export default function Home () {
	return (
		<div className='home'>
			<Nav>
				<NavHome />
			</Nav>
			<NotesSection />
			<Outlet />
		</div>
	)
}