import NoteList from './NoteList'
import './styles/NotesSection.scss' 
import { useContext, useState, useEffect } from 'react'
import {  UserLogged, LogUser} from 'types'
import { UserRecentLoggedCTX } from 'context/UserRecentLogged'
import { Link } from 'react-router-dom'
import Add from './Add'
import useParser from './hooks/useParser'
import { NoteType } from 'types'

export default function NotesSection () {
	const {logged} = useContext(UserRecentLoggedCTX) as LogUser
	const [loadData, setLoaded] = useState<UserLogged>()
	const noteToString = useParser()

	useEffect(()=> {
		if (logged !== undefined && logged?.notes !== undefined && logged?.id !== undefined) {
			const loggedDraft = structuredClone(logged)
			const parsedNotes = noteToString({user: loggedDraft})
			const unarchived = parsedNotes.filter((e: NoteType) => !e.archived )
			loggedDraft.notes = unarchived as NoteType[]
			setLoaded(loggedDraft)
		}
	},[logged])

	return (
		<main className="main" data-testid='main'>
			{
				loadData && <NoteList notes={loadData.notes} /> 
			}
			<Link to={loadData ? `/${loadData.id}/create` : '/'}>
				<Add />
			</Link>
		</main>
	)
}