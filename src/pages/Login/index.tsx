import React from 'react'
import Header from 'components/Header'
import 'styles/Form.scss'

export default function Login() {

  return (
    <>
      <Header />
      <form className='login'>
        <input placeholder='Username' type='text' />
        <input placeholder='Password' type='password' />
        <button type='submit'>Log In</button>
        <p>Or <b>create account</b></p>
      </form>
    </>)
}
