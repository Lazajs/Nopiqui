
import {NoteType} from 'types'
import './styles/Note.scss'
import { Link } from 'react-router-dom'

export default function Note ({title, content} : NoteType) {
  return (
    <Link to={'/home/:user/note/:id'}>
      <div className='box'>
        <span className='title'>
          <h4>{title}</h4>
        </span>
        <span className='content'>
          {content}
        </span>
      </div>
    </Link>
  )
}