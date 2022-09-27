import { useContext } from 'react'
import { UserRecentLoggedCTX } from 'context/UserRecentLogged'
import { LogUser } from 'types'

export default function useLogout () {
	const {logged, setLogged} = useContext(UserRecentLoggedCTX) as LogUser   

	const request = async () =>{
		const OPTIONS = {
			method:'GET',
			credentials: 'include'
		} as RequestInit

		const send = await fetch('http://127.0.0.1:3001/logout', OPTIONS)
		setLogged({id: '', username: '', notes: [], archive:[]})
		return send
	}
	return request

}