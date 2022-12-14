import { NoteType } from 'types'

type Props = {
  title: string,
  content: string,
  userId: string,
	archived: boolean
}
export default function useSave () {
	const request = async ({title, content, userId, archived} : Props): Promise<NoteType> => {
		const OPTIONS = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({title, content, userId, archived}),
			credentials: 'include'
		} as RequestInit

		const response = await fetch('/notes/create', OPTIONS)
		const json = await response?.json()


		return json !== undefined ? json : response
	} 

	return request
} 