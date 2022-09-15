import useDeleteNote from 'hooks/useDeleteNote'
import dots from 'assets/images/dots.svg'
import edit from 'assets/images/edit.svg'
import trash from 'assets/images/trash.svg'
import archive from 'assets/images/archive.svg'
import { useState, useContext } from 'react'
import { UserRecentLoggedCTX } from 'context/UserRecentLogged'
import { NoteType, UserLogged, LogUser } from 'types'
import {useNavigate} from 'react-router-dom'

type Props = {
  id: string,
}

export default function ({id} : Props) {
  const navigate = useNavigate()
  const {logged, setLogged} = useContext(UserRecentLoggedCTX) as LogUser
  const [options, toggleOptions] = useState<boolean>(false)
  const deleteNote = useDeleteNote()
  const [isDeleting, setIsDeleting] = useState<boolean>(false) 

  const handleDelete = () => {
    setIsDeleting(true)
    deleteNote({id})
      .then(res => {
        if (res.ok) {
          setLogged((prev: UserLogged) => {
            const {notes} = prev
            const newOnes = notes.filter((e: NoteType) => e.id !== id)
            setIsDeleting(false)
            if (!location.pathname.includes('/home')) navigate(`/home/${logged.id}`)
            return {...prev, notes: newOnes}
          })
        }
      })
      .catch(console.log)
  }

  const handleEdit = () => {
    navigate(`/edit/${id}`)
  }


  if (isDeleting) return (
    <div className='box spinning'>
      <p>Deleting...</p>
    </div>
  )

  return (
    <span className='option-wrapper'>
      <img onClick={()=> toggleOptions(prev => !prev)} src={dots} title='Options' alt="Options" className='option' />
        {
          options ? 
          <div className='options-box'>
            <img title='Delete' alt='trash' src={trash} className='single' onClick={handleDelete} />
            <img title='Edit' alt='edit' src={edit} className='single' onClick={handleEdit} />
            <img title='Archive' alt='archive' src={archive} className='single' />
          </div>
                  : ''
        } 
    </span>
 )
}