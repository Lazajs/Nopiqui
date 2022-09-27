import NoteList from './NoteList'
import './styles/NotesSection.scss' 
import { useContext, useState, useEffect } from 'react'
import { NoteType, UserLogged, LogUser} from 'types'
import { UserRecentLoggedCTX } from 'context/UserRecentLogged'
import { Link } from 'react-router-dom'
import Add from './Add'

export default function NotesSection () {
	const {logged} = useContext(UserRecentLoggedCTX) as LogUser
	const [isLoad, setIsLoad] = useState<UserLogged>()

	const parseNotes = (user : UserLogged) => {
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
		const userInstance = user
		userInstance.notes = parsedNotes as NoteType[]
		return userInstance
	}

	useEffect(()=> {
		if (logged !== undefined && logged?.notes !== undefined && logged?.id !== undefined) {
			const {...copy} = logged
			setIsLoad(parseNotes(copy))
		}
	},[logged])

	return (
		<main className="main">
			{
				isLoad ? <NoteList notes={isLoad.notes} /> : ''
			}
			{
				isLoad && isLoad?.notes.length <= 0 ? <p className="none">Your ideas will appear here, start creating!</p> : ''
			}
			<Link to={isLoad ? `/${isLoad.id}/create` : '/'}>
				<Add />
			</Link>
		</main>
	)
}