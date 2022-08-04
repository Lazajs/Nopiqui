import React from 'react'
import Header from 'components/Header'
import 'styles/Form.scss'

export default function Register () {
  return (
    <>
      <Header />
      <form className='login'>
        <input placeholder='Your username' type='text' />
        <input placeholder='New password' type='password' />
        <input placeholder='Confirm password' type='password' />
        <button type='submit'>Register</button>
        <p>Or <b>Log In</b></p>
      </form>
    </>
  )
}
