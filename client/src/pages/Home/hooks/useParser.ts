import { NoteType, UserLogged } from 'types'

type Params = { user: UserLogged }

export default function useParser () {

	const noteToString = ({user} : Params) => {

		const {notes} = user
		const parsedNotes = notes.map((e: NoteType) => {
			if (e.title.includes('blocks') !== true) return e
			const {content, title} = e
			return {
				archived: e.archived,
				title: JSON.parse(title).blocks[0].text,
				content: JSON.parse(String(content)).blocks[0].text,
				userId: e.userId,
				id: e.id
			}
		})

		return parsedNotes
	}

	return noteToString
}
