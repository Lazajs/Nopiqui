import Nav from 'components/Nav'
import NavHome from 'components/NavHome'
import RichEditor from 'components/RichEditor'
import { EditorState, convertFromRaw } from 'draft-js'
import {Dispatch,  SetStateAction, useEffect, useState, useCallback} from 'react'
import {UserLogged, NoteType} from 'types'
import useEdit from './hooks/useEdit'
import {useNavigate, useLocation, useParams, Navigate} from 'react-router-dom'
import Spinner from 'components/Spinner'
import Helmet from 'react-helmet'

type Args = {
  setLogged: Dispatch<SetStateAction<UserLogged>>, 
  title: string, 
  content: string, 
  userId: string
}

type RouterState = {state: {logged: UserLogged}}

export default function Edit () {
	const edit = useEdit()
	const navigate = useNavigate()
	const location = useLocation()
	const {noteId} = useParams() 
	const {state} = location as RouterState

	const [title, setTitle] = useState<any>()
	const [content, setContent] = useState<any>()

	const titleHandlers = [title, setTitle]
	const contentHandlers = [content, setContent]

	useEffect(()=> {

		setTitle(() => {
			if (state?.logged !== undefined) {
				const {notes} = state.logged
				const itself = notes.find((e: NoteType) => e.id === noteId)
				const fromRaw = convertFromRaw(JSON.parse(itself.title))
				return EditorState.createWithContent(fromRaw)
			}}
		)

		setContent(() => {
			if (state?.logged !== undefined) {
				const {notes} = state.logged
				const itself = notes.find((e: NoteType) => e.id === noteId)
				const fromRaw = convertFromRaw(JSON.parse(itself.content))
				return EditorState.createWithContent(fromRaw)
			}}
		)
	},[])

	const editNote = async ({setLogged, title, content, userId}: Args) => {
		//received title and content are RAW from Draft.
		const res: NoteType = await edit({title: title, content: content, userId: userId, id: noteId as string})
    
		if (res.id !== undefined) {
			setLogged((prev: UserLogged)  => {
				const {notes} = prev
				const filtered = notes.filter((e: NoteType) => e.id !== noteId) 
				navigate(`/${res.id}/view`)
				return {...prev, notes: filtered.concat(res)}
			})
		}
	}

	if (noteId === undefined) return <Navigate to ='/404'/>

	return (
		<div className='page'>
			<Helmet>
				<title>Nopiqui | Edit</title>
			</Helmet>

			<Nav>
				<NavHome />
			</Nav>

			{title !== undefined ? <RichEditor doNote={editNote} titleHandlers={titleHandlers} contentHandlers={contentHandlers} /> : <Spinner />}
     
		</div>
	)
}