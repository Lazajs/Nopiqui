import 'styles/Form.scss'
import React,{useEffect, useState, useContext} from 'react'
import Header from 'components/Header'
import {UserLogged, UserLogInData} from 'types'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import useLoginUser from 'pages/Login/hooks/useLoginUser'
import useForm from './hooks/useForm'
import { UserRecentLoggedCTX } from 'context/UserRecentLogged'
import Spinner from 'components/Spinner'

type InvalidateType = {is: boolean, comment: string}

type LogUser = {
  logged: UserLogged,
  setLogged: React.Dispatch<React.SetStateAction<UserLogged>>
}

type LocationState = {
  state: {
    from?: string
  }
}



export default function Login () {
  const {logged, setLogged} = useContext(UserRecentLoggedCTX) as LogUser
  const [loginInfo, dispatch] = useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const { username, password } = loginInfo
  const [allFormData, setAllFormData] = useState<UserLogInData>()
  const [isInvalid, setInvalid] = useState<InvalidateType>({is: false, comment: ''})
  const navigate = useNavigate()
  const login = useLoginUser() 
  const location = useLocation()
  const {state} = location as LocationState

  useEffect(()=>{
    if (allFormData !== undefined && Boolean(allFormData.password) === true && Boolean(allFormData.username) === true) {
      const getToken = async () =>{
        setLoading(true)
        const response = await login(allFormData)
        const dataResponse = await response.json()
        if (response.ok) {
          setLoading(false)
          setLogged(dataResponse)
          navigate(`/home`)
        } else {
          setLoading(false)
          setInvalid({is: true, comment: dataResponse.message})
        }
      }

      getToken()
        .catch(err => {
          setLoading(false)
          console.log(err)
        })
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
        {state?.from === '/register' ? <small>Welcome! Log In to continue</small> : ''}
        <input autoFocus onChange={({target})=> dispatch({type: 'username', payload: target.value})} value={String(username)} name='username' placeholder='Username' type='text' />
        <input onChange={({target})=> dispatch({type: 'password', payload: target.value})} value={String(password)} name='password' placeholder='Password' type='password' />
        {isInvalid.is ? <p className='invalid'>{isInvalid.comment}</p> : '' }
       { loading ? <Spinner /> :  <button type='submit'>Log In</button>}
        <p>Or <b><Link to='/register'>Register</Link></b></p>
      </form>
    </section>
  )
}
