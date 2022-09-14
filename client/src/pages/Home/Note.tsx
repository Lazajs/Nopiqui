import './styles/Note.scss'
import { useNavigate } from 'react-router-dom'
import NoteOptions from 'components/NoteOptions'
import {NoteType} from 'types'

type Elements = HTMLImageElement | HTMLElement

export default function Note ({title, content, id} : NoteType) {
  const navigate = useNavigate()

  const handleClick = (e: React.SyntheticEvent) =>{
    const target: Elements = e.target as Elements
    if (target.classList.contains('option')) {
      return
    } else if (target.classList.contains('options-box')) {
      return
    } else if (target.classList.contains('single')) {
      return
    } else {
      navigate(`/view/${id}`, {state: {id: id}})
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
        <NoteOptions id={id}/>
      </div>
  )
}