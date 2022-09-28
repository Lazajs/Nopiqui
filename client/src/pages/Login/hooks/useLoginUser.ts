import { UserLogInData } from 'types'


export default function useLoginUser () {
	return async (data: UserLogInData) => {
		const OPTIONS = {
			method: 'POST',
			body: JSON.stringify(data),
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		} as RequestInit
		const request =  fetch('/login', OPTIONS)
		return request
	}
}