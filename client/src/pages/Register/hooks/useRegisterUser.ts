import { UserLogInData } from 'types'

export default function useRegisterUser () {
	return async (data: UserLogInData) => {
		const OPTIONS = {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		}

		const request = await fetch('/register', OPTIONS)
		return request 
	}
}