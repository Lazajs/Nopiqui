import React, { useEffect, useReducer, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from 'components/Header'
import 'styles/Form.scss'
import { RegisterDT, RegisterDTFormData } from 'types'
import useRegisterUser from 'hooks/useRegisterUser'
import {useNavigate} from 'react-router-dom'


type ActionType = {type: 'username' | 'password' | 'confirmed', payload: string}
type InvalidateType = {is: boolean | string, comment: string}

function reducer (state: RegisterDT, action: ActionType) {
  switch (action.type) {
    case 'username':
      return {...state, username: action.payload}
    case 'password':
      return {...state, password: action.payload}
    case 'confirmed': 
      return {...state, confirmed: action.payload}
    default:
      return state
  }
}

export default function Register () {
  const [registerInfo, dispatch] = useReducer(reducer, {username: '', password: '', confirmed: ''})
  const [allFormData, setFormData] = useState<RegisterDTFormData>()
  const {username, password, confirmed} = registerInfo
  const [isInvalid, setInvalid] = useState<InvalidateType>({is: false, comment: ''})
  const register = useRegisterUser()
  const navigate = useNavigate()

  useEffect(()=>{
    if (allFormData !== undefined && Boolean(username) === true && Boolean(password) === true && Boolean(confirmed) === true) {
      register(allFormData)
        .then(res => res.ok ? navigate('/login') : res.json())
        .then(res => res?.message !== undefined ? setInvalid({is:true, comment: res.message}) : '')
        .catch(console.log)
    }
  },[allFormData])

  useEffect(()=>{
    if (password !== confirmed) setInvalid({comment: "Passwords doesn't match.", is: true})
    else setInvalid({is: false, comment: ''})

  },[password, confirmed])


  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    const {target} = e
    const form = target as HTMLFormElement
    const dataFromForm = new FormData(form)
    const obj = {username: dataFromForm.get('username'), password: dataFromForm.get('password')} 
    if (username.length < 5) setInvalid({is:'username', comment: 'Username too short'})
    else if (!password.match(new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"))) setInvalid({is: 'password', comment:'Password is not secure enough'})
    else setFormData(obj)

  }

  return (
    <> 
      <Header />
      <form onSubmit={handleSubmit} className='login'>
        <input name='username' onChange={({target})=> dispatch({payload: target.value, type: 'username'})} value={username} placeholder='Your username' type='text' />
        {isInvalid.is === 'username' ? <p className='invalid'>{isInvalid.comment}</p> : '' }
        <input name='password' onChange={({target})=> dispatch({payload: target.value, type:'password'})} value={password} placeholder='New password' type='password' />
        {isInvalid.is === 'password' ? <p className='invalid'>{isInvalid.comment}</p> : ''}
        <p className='requirements'>The password must contain six characters or more and has at least one lowercase and one uppercase alphabetical character or has at least one lowercase and one numeric character or has at least one uppercase and one numeric character.</p>
        <input name='confirmed' onChange={({target})=> dispatch({payload: target.value, type: 'confirmed'})} value={confirmed} placeholder='Confirm password' type='password' />
        {isInvalid.is === true ? <p className='invalid'>{isInvalid.comment}</p> : '' }
        <button type='submit'>Register</button>
        <p>Or <b><Link to='/login'>Log In</Link></b></p>
      </form>
    </>
  )
}
