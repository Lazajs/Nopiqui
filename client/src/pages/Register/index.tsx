import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from 'components/Header'
import 'components/styles/Form.scss'
import { UserLogInData } from 'types'
import useRegisterUser from 'pages/Register/hooks/useRegisterUser'
import {useNavigate} from 'react-router-dom'
import useForm from './hooks/useForm'
import Spinner from 'components/Spinner'

type InvalidateType = {is: boolean | string, comment: string}

interface UserRegisterData extends UserLogInData {
  confirmed: string
}

export default function Register () {
  const [registerInfo, dispatch] = useForm()
  const {username, password, confirmed} = registerInfo as UserRegisterData
  const [allFormData, setFormData] = useState<UserLogInData>()
  const [isInvalid, setInvalid] = useState<InvalidateType>({is: false, comment: ''})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const register = useRegisterUser()
  const navigate = useNavigate()
  
  useEffect(()=>{
    const handleAsync = async () => {
      setIsLoading(true)
      if (password !== confirmed) {
        setInvalid({comment: "Passwords doesn't match.", is: true})
      } else if (allFormData !== undefined && Boolean(username) === true && Boolean(password) === true && Boolean(confirmed) === true) {
        const sent = await register(allFormData)
        if (sent.ok) {
          setIsLoading(false)
          navigate('/login', {state: {from : '/register'}})
        } else {
          const json = await sent.json()
          if (json?.message !== undefined) {
            setIsLoading(false)
            setInvalid({is: true, comment: json.message})
          }
        }
      } else {
        setIsLoading(false)
        setInvalid({is:false, comment:''})
      }
    }

    handleAsync()
      .catch(err => {
        setIsLoading(false)
      })
  },[allFormData])

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {

    e.preventDefault()
    const {target} = e
    const form = target as HTMLFormElement
    const dataFromForm = new FormData(form)
    const obj = {username: dataFromForm.get('username'), password: dataFromForm.get('password')} 
    if (String(username).length < 5) setInvalid({is:'username', comment: 'Username too short'})
    else if (!String(password)?.match(new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"))) setInvalid({is: 'password', comment:'Password is not secure enough'})
    else {
      setFormData(obj)
    }
  }

  return (
    <> 
      <Header />
      <form onSubmit={handleSubmit} className='login'>
        <input name='username' onChange={({target})=> dispatch({payload: target.value, type: 'username'})} value={String(username)} placeholder='Your username' type='text' />
        {isInvalid.is === 'username' ? <p className='invalid'>{isInvalid.comment}</p> : '' }
        <input name='password' onChange={({target})=> dispatch({payload: target.value, type: 'password'})} value={String(password)} placeholder='New password' type='password' />
        {isInvalid.is === 'password' ? <p className='invalid'>{isInvalid.comment}</p> : ''}
        <p className='requirements'> &#x25A1;The password must contain six characters or more. <br />  &#x25A1;Must contain at least one lowercase and one uppercase alphabetical character <b>or</b> at least one lowercase and one numeric character <b>or</b> at least one uppercase and one numeric character.</p>
        <input name='confirmed' onChange={({target})=> dispatch({payload: target.value, type: 'confirmed'})} value={String(confirmed)} placeholder='Confirm password' type='password' />
        {isInvalid.is === true ? <p className='invalid'>{isInvalid.comment}</p> : '' }
        {isLoading ? <Spinner/> : <button type='submit'>Register</button> }
        <p>Or <b><Link to='/login'>Log In</Link></b></p>
      </form>
    </>
  )
}
