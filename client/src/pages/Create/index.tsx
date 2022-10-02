import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './styles/index.scss'
import Nav from 'components/Nav'
import NavHome from 'components/NavHome'
import RichEditor from 'components/RichEditor'
import useCreate from './hooks/useCreate'
import { useNavigate } from 'react-router-dom'
import { UserLogged, NoteType } from 'types'
import {Dispatch, SetStateAction} from 'react'
import {useState} from 'react'
import {EditorState} from 'draft-js'
import Helmet from 'react-helmet'

type Args = {
  setLogged: Dispatch<SetStateAction<UserLogged>>, 
  title: string, 
  content: string, 
  userId: string
}

export default function Create () {
	const titleHandlers = useState(()=> EditorState.createEmpty())
	const contentHandlers = useState(()=> EditorState.createEmpty())
	const create = useCreate()
	const navigate = useNavigate()

	const createNote = async ({setLogged, title, content, userId}: Args) => {
		//received title and content are RAW from Draft.
		const res: NoteType = await create({title: title, content: content, userId: userId, archived: false})
		if (res.id !== undefined) {
			setLogged((prev: UserLogged)  => {
				const {notes} = prev
				navigate(`/${res.id}/view`)
				return {...prev, notes: notes.concat(res)}
			})
		}
	}


	return (
		<div className='page'>
			<Helmet>
				<title>Nopiqui | Create</title>
				<meta name="description" content="Create your notes using Nopiqui and share them to your friends." />
			</Helmet>

			<Nav>
				<NavHome />
			</Nav>

			<RichEditor doNote={createNote} contentHandlers={contentHandlers} titleHandlers={titleHandlers} />
     
		</div>
	)
}