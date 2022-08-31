import Note from "./Note"
import Add from "./Add"
import './styles/NotesSection.scss' 
import {UserCTX} from "context/User"
import { useContext, useState, useEffect } from "react"
import {DataForUser, NoteType, UserLogged} from 'types'
import { UserRecentLoggedCTX } from "context/UserRecentLogged"

type LogUser = {
  logged: UserLogged
}

export default function NotesSection () {
  const user = useContext(UserCTX) as DataForUser 
  const {logged} = useContext(UserRecentLoggedCTX) as LogUser
  const [isLoad, setIsLoad] = useState<UserLogged | DataForUser>()

  const parseNotes = (user : any) => {
    const {notes} = user
    const parsedNotes = notes.map((e: any) => {
      if (e.title.includes('blocks') !== true) return e
      return {
        archived: e.archived,
        title: JSON.parse(e.title).blocks[0].text,
        content: JSON.parse(e.content).blocks[0].text,
        userId: e.userId,
        id: e.id
      }
    })
    const userInstance = user
    console.log(userInstance)
    userInstance.notes = parsedNotes as any
    return userInstance
  }

  useEffect(()=> {
    if (user !== undefined && user?.notes !== undefined && user?.id !== undefined) {
      setIsLoad(parseNotes(user))
    } else if (logged !== undefined && logged?.notes !== undefined && logged?.id !== undefined) {
      setIsLoad(parseNotes(logged))
    }
  },[user])
  console.log(isLoad)

  return (
    <main className="main">
      {
        isLoad ? isLoad?.notes.map((e: NoteType) =>{
          return <Note title={e.title} content={e?.content} id={e.id} key={e.id} />
        }) : ''
      }
      {
        isLoad && isLoad?.notes.length <= 0 ? <p className="none">Your ideas will appear here, start creating!</p> : ''
      }
      {
        isLoad !== undefined ? <Add info={isLoad as UserLogged} /> : ''
      }
    </main>
  )
}