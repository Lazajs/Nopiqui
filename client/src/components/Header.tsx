import React from 'react'
import 'styles/Header.scss'

type Props = {
  children?: JSX.Element
}

export default function Header ({children}: Props) {
  return (
  <>

    {children !== undefined ? children : ''}

    <header className='header'>
      <h1>Nopiqui</h1>
      <small>your notes, in a minimalist way .</small>
    </header>
  </>
  )
}
