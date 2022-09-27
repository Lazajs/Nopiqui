import { NoteType } from 'types'

type Props = {
  title: string,
  content: string,
  userId: string,
}
export default function useSave () {
	const request = async ({title, content, userId} : Props): Promise<NoteType> => {
		const OPTIONS = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({title, content, userId}),
			credentials: 'include'
		} as RequestInit

		const response = await fetch('http://127.0.0.1:3001/notes/create', OPTIONS)
		const json = await response?.json()


		return json !== undefined ? json : response
	} 

	return request
} 