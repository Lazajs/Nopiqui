import { useState, useEffect } from 'react'
import { UserRecentLoggedCTX } from 'context/UserRecentLogged'
import { useContext } from 'react'
import { LogUser } from 'types'
import useParser from 'pages/Home/hooks/useParser'
import { UserLogged, NoteType } from 'types'
import './styles/index.scss'
import 'pages/Home/styles/NotesSection.scss'
import NoteList from 'pages/Home/NoteList'
import Helmet from 'react-helmet'

export default function Archive () {
	const {logged} = useContext(UserRecentLoggedCTX) as LogUser
	const [loadData, setLoaded] = useState<UserLogged>()
	const noteToString = useParser()

	useEffect(()=> {
		if (logged !== undefined && logged?.notes !== undefined && logged?.id !== undefined) {
			const loggedDraft = structuredClone(logged)
			const parsedNotes = noteToString({user: loggedDraft})
			const unarchived = parsedNotes.filter((e: NoteType) => e.archived )
			loggedDraft.notes = unarchived as NoteType[]
			setLoaded(loggedDraft)
		}
	},[logged])

	
	return (
		<aside className='archive'>
			<Helmet>
				<title>Nopiqui | Home - Archive</title>
				<meta name="description" content="Archived notes" />
			</Helmet>

			<h2>Archive</h2>
			<div className='main'>
				{(loadData && loadData.notes) && <NoteList notes={loadData.notes}/> }
				{(loadData && loadData.notes.length === 0) && <p className='nothing'>Nothing here.</p>}
			</div>
		</aside>
	)

}