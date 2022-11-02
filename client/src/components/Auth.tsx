import { Outlet, Navigate } from 'react-router-dom'
import { UserRecentLoggedCTX } from 'context/UserRecentLogged'
import { Dispatch, SetStateAction, useContext } from 'react'
import { UserLogged } from 'types'

type UserInformation = {
  logged : UserLogged,
  setLogged: Dispatch<SetStateAction<UserLogged>>
}

export default function Auth () {
  const { logged } = useContext(UserRecentLoggedCTX) as UserInformation

  return logged?.id !== '' ? <Outlet /> : <Navigate to='/login' />
}
