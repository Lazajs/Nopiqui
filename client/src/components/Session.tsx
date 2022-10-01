import { Outlet, Navigate } from 'react-router-dom'
import { UserRecentLoggedCTX } from 'context/UserRecentLogged'
import { useContext} from 'react'
import { UserLogged } from 'types'

type UserInformation = {
  logged : UserLogged,
  setLogged: React.Dispatch<React.SetStateAction<UserLogged>>
}

export default function Session () {
	const {logged} = useContext(UserRecentLoggedCTX) as UserInformation

	return logged && logged?.id !== '' && logged.username !== '' ? <Navigate to='/home' /> : <Outlet />
}