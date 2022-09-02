import Note from "./Note"
import Add from "./Add"
import './styles/NotesSection.scss' 
import { useContext, useState, useEffect } from "react"
import { NoteType, UserLogged} from 'types'
import { UserRecentLoggedCTX } from "context/UserRecentLogged"
import { Link } from 'react-router-dom'

type LogUser = {
  logged: UserLogged
}

export default function NotesSection () {
  const {logged} = useContext(UserRecentLoggedCTX) as LogUser
  const [isLoad, setIsLoad] = useState<UserLogged>()

  const parseNotes = (user : UserLogged) => {
    const {notes} = user
    const parsedNotes = notes.map((e: NoteType) => {
      if (e.title.includes('blocks') !== true) return e
      const {content, title} = e
      return {
        archived: e.archived,
        title: JSON.parse(title).blocks[0].text,
        content: JSON.parse(String(content)).blocks[0].text,
        userId: e.userId,
        id: e.id
      }
    })
    const userInstance = user
    userInstance.notes = parsedNotes as NoteType[]
    return userInstance
  }

  useEffect(()=> {
    if (logged !== undefined && logged?.notes !== undefined && logged?.id !== undefined) {
      setIsLoad(parseNotes(logged))
    }
  },[logged])

  return (
    <main className="main">
      {
        isLoad ? isLoad?.notes.map((e: NoteType) =>{
          return <Note update={setIsLoad} title={e.title} content={e?.content} id={e.id} key={e.id} />
        }) : ''
      }
      {
        isLoad && isLoad?.notes.length <= 0 ? <p className="none">Your ideas will appear here, start creating!</p> : ''
      }
      {
        isLoad !== undefined ? <Link to={`/home/${isLoad.id}/create`}><Add /></Link> : ''
      }
    </main>
  )
}