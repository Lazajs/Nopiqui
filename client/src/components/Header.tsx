import React from 'react'
import 'components/styles/Header.scss'
import { useNavigate } from 'react-router-dom'
type Props = {
  children?: JSX.Element
}

export default function Header ({ children }: Props) {
  const navigate = useNavigate()

  return (
		<>

			{children !== undefined ? children : ''}

			<header className='header'>
				<h1 onClick={() => navigate('/')}>Nopiqui</h1>
				<small>your notes, in a minimalist way .</small>
			</header>
		</>
  )
}
