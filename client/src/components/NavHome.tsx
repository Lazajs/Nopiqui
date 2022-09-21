import React from 'react'
import 'styles/NavHome.scss'
import useLogout from '../pages/Home/hooks/useLogout'
import { useNavigate } from 'react-router-dom'

export default function NavHome () {
  const navigate = useNavigate()
  const logout = useLogout()

  const handleClick = () => {
    logout()
      .then(() => navigate('/'))
  }

  return (
  <>
     <ul className="navhome">
      <li>Archive</li>
      <li onClick={handleClick}>Log Out</li>
    </ul>
    <button className='logout-btn archive' type='button'>Archive</button>
    <button className='logout-btn' onClick={handleClick} type='button'>Log Out</button>
  </>
  )
}