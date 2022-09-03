import { NoteType, UserLogged} from 'types'
import './styles/Note.scss'
import { useNavigate } from 'react-router-dom'
import dots from 'assets/images/dots.svg'
import edit from 'assets/images/edit.svg'
import trash from 'assets/images/trash.svg'
import archive from 'assets/images/archive.svg'
import React, { Dispatch, SetStateAction, useState } from 'react'
import useDeleteNote from './hooks/useDeleteNote'

type Elements = HTMLImageElement | HTMLElement

interface Props extends NoteType {
  update: Dispatch<SetStateAction<any>>
}

export default function Note ({title, content, id, update} : Props) {
  const [options, toggleOptions] = useState<boolean>(false)
  const navigate = useNavigate()
  const deleteNote = useDeleteNote()
  // const [isLoading, setIsLoading] = useState<boolean>(false)
  
  const handleDelete = () => {
    deleteNote({id})
      .then(res => {
        if (res.ok) {
          update((prev: UserLogged) => {
            const {notes} = prev
            const newOnes = notes.filter((e: NoteType) => e.id !== id)

            return {...prev, notes: newOnes}
          })
        }
      })
      .catch(console.log)
  }

  const handleClick = (e: React.SyntheticEvent) =>{
    const target: Elements = e.target as Elements
    if (target.classList.contains('option')) {
      toggleOptions(prev => !prev)
    } else if (target.classList.contains('options-box')) {
      return
    } else if (target.classList.contains('single')) {
      return
    } else {
      navigate('/home/:user/note/:id') //note view
    }
  }
  return (
      <div onClick={handleClick} className='box'>
        <span className='title'>
          <h4>{title}</h4>
        </span>
        <span className='content'>
          {content}
        </span>
        <img src={dots} title='Options' alt="Options" className='option' />
        {
          options ? 
          <div className='options-box'>
            <img title='Delete' alt='trash' src={trash} className='single' onClick={handleDelete} />
            <img title='Edit' alt='edit' src={edit} className='single' />
            <img title='Archive' alt='archive' src={archive} className='single' />
          </div>
                  : ''
        }
      </div>
  )
}