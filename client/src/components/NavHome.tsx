import React from 'react'
import 'components/styles/NavHome.scss'
import useLogout from '../pages/Home/hooks/useLogout'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

export default function NavHome () {
	const navigate = useNavigate()
	const logout = useLogout()

	const handleClick = () => {
		logout()
			.then(() => navigate('/login'))
	}

	return (
		<>
			<ul className="navhome">
				<li><NavLink className={({isActive})=> isActive ?  'active' : undefined } to='/home' end>Home</NavLink></li>
				<li><NavLink className={({isActive})=> isActive ?  'active' : undefined } to='archive'>Archive</NavLink></li>
				<NavLink to='/login' onClick={handleClick}>Log Out</NavLink>
			</ul>
			<NavLink className={({isActive})=> isActive ?  'btn active' : 'btn' } end to='/home'>Home</NavLink>
			<NavLink className={({isActive})=> isActive ?  'btn active' : 'btn' } to='archive' type='button'>Archive</NavLink> 
			<NavLink className='btn' onClick={handleClick} to='/login'>Log Out</NavLink>
		</>
	)
}