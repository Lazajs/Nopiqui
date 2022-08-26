import 'styles/Form.scss'
import React,{useEffect, useState} from 'react'
import Header from 'components/Header'
import {RegisterDTFormData} from 'types'
import {Link, useNavigate} from 'react-router-dom'
import useLoginUser from 'pages/Login/hooks/useLoginUser'
import useForm from './hooks/useForm'

type InvalidateType = {is: boolean, comment: string}

export default function Login () {
  const [loginInfo, dispatch] = useForm()
  const { username, password } = loginInfo
  const [allFormData, setAllFormData] = useState<RegisterDTFormData>()
  const [isInvalid, setInvalid] = useState<InvalidateType>({is: false, comment: ''})
  const navigate = useNavigate()
  const login = useLoginUser()
  
  useEffect(()=>{
    if (allFormData !== undefined && Boolean(allFormData.password) === true && Boolean(allFormData.username) === true) {
      const getToken = async () =>{
        const response = await login(allFormData)
        const dataResponse = await response.json()
        if (response.ok) {
          navigate(`/home/${dataResponse.username}`)
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
        <small>Log In to continue</small>
        <input autoFocus onChange={({target})=> dispatch({type: 'username', payload: target.value})} value={username} name='username' placeholder='Username' type='text' />
        <input onChange={({target})=> dispatch({type: 'password', payload: target.value})} value={password} name='password' placeholder='Password' type='password' />
        {isInvalid.is ? <p className='invalid'>{isInvalid.comment}</p> : '' }
        <button type='submit'>Log In</button>
        <p>Or <b><Link to='/register'>Register</Link></b></p>
      </form>
    </section>
  )
}
