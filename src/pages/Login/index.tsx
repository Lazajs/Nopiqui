import React,{useEffect, useReducer, useState} from 'react'
import Header from 'components/Header'
import 'styles/Form.scss'
import {RegisterDTFormData, RegisterDT} from 'types'
import {Link, useNavigate} from 'react-router-dom'
import useLoginUser from 'hooks/useLoginUser'

type ActionType = {type: 'username' | 'password', payload: string}
type InvalidateType = {is: boolean, comment: string}

function reducer (state: RegisterDT, action: ActionType) {
  const {type, payload} = action

  switch (type) {
    case 'username':
      return {...state, username: payload}
    case 'password':
      return {...state, password: payload}
    default:
      return state
  }
}

export default function Login () {
  const navigate = useNavigate()
  const [loginInfo, dispatch] = useReducer(reducer, {username: '', password: ''})
  const [allFormData, setAllFormData] = useState<RegisterDTFormData>()
  const login = useLoginUser()
  const { username, password } = loginInfo
  const [isInvalid, setInvalid] = useState<InvalidateType>({is: false, comment: ''})
  
  useEffect(()=>{
    if (allFormData !== undefined && Boolean(allFormData.password) === true && Boolean(allFormData.username) === true) {
      const getToken = async () =>{
        const response = await login(allFormData)
        const dataResponse = await response.json()
        if (response.ok) {
          navigate('/')
          // heres where user info..
        } else {
          setInvalid({is: true, comment: dataResponse.message})
        }
      }
      getToken()
        .catch(console.log)
    }
  },[allFormData])


  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    const {target} = e
    const form = target as HTMLFormElement
    const dataFromForm = new FormData(form)
    const obj = {username: dataFromForm.get('username'), password: dataFromForm.get('password')} 
    setAllFormData(obj)
  }

  return (
    <section className='wrapper'>
      <Header />
      <form onSubmit={handleSubmit} className='login'>
        <input onChange={({target})=> dispatch({type: 'username', payload: target.value})} value={username} name='username' placeholder='Username' type='text' />
        <input onChange={({target})=> dispatch({type: 'password', payload: target.value})} value={password} name='password' placeholder='Password' type='password' />
        {isInvalid.is ? <p className='invalid'>{isInvalid.comment}</p> : '' }
        <button type='submit'>Log In</button>
        <p>Or <b><Link to='/register'>Register</Link></b></p>
      </form>
    </section>
  )
}
