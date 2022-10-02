import NoteOptions from 'components/NoteOptions'
import { useParams } from 'react-router-dom'
import {SetStateAction, Dispatch} from 'react'
import './styles/NavView.scss'
import { Link } from 'react-router-dom'

type Props = {
  toggleLoading: Dispatch<SetStateAction<boolean>>
}

export default function NavView ({toggleLoading}: Props) {
	const {noteId} = useParams()
	
	return (
		<nav className="view__nav">
			<Link to={'/home'}>Home</Link>
			<NoteOptions loading={toggleLoading} id={noteId as string} />
		</nav>
	)
}