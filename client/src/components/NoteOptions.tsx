import useDeleteNote from 'hooks/useDeleteNote'
import dots from 'assets/images/dots.svg'
import edit from 'assets/images/edit.svg'
import trash from 'assets/images/trash.svg'
import archive from 'assets/images/archive.svg'
import { useState, useContext, SetStateAction } from 'react'
import { UserRecentLoggedCTX } from 'context/UserRecentLogged'
import { NoteType, UserLogged, LogUser } from 'types'
import {useNavigate} from 'react-router-dom'


type Props = {
  id: string,
  loading: React.Dispatch<SetStateAction<boolean>>
}

export default function NoteOptions ({id, loading} : Props) {
	const navigate = useNavigate()
	const {logged, setLogged} = useContext(UserRecentLoggedCTX) as LogUser
	const [options, toggleOptions] = useState<boolean>(false)
	const deleteNote = useDeleteNote()

	const handleDelete = () => {
		loading(true)
		deleteNote({id})
			.then(res => {
				if (res.ok) {
					setLogged((prev: UserLogged) => {
						const {notes} = prev
						const newOnes = notes.filter((e: NoteType) => e.id !== id)
						loading(false)
						if (!location.pathname.includes('/home')) navigate('/home')
						return {...prev, notes: newOnes}
					})
				}
			})
			.catch(console.log)
	}

	const handleEdit = () => {
		navigate(`/${id}/edit`, {state: {logged: logged}})
	}

	return (
		<span className='option-wrapper'>

			<img style={{display: 'none'}} title='Delete' alt='trash' src={trash} />
			<img style={{display: 'none'}} title='Edit' alt='edit' src={edit} />
			<img style={{display: 'none'}} title='Archive' alt='archive' src={archive} />

			<img onClick={()=> toggleOptions(prev => !prev)} src={dots} title='Options' alt="Options" className='option' />
			{
				options ? 
					<div className='options-box'>
						<img  title='Delete' alt='trash' src={trash} className='single' onClick={handleDelete} />
						<img  title='Edit' alt='edit' src={edit} className='single' onClick={handleEdit} />
						<img  title='Archive' alt='archive' src={archive} className='single' />
					</div>
					: ''
			} 
        
		</span>
	)
}