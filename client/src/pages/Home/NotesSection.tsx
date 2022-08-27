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

  useEffect(()=> {
    if (user !== undefined && user?.notes !== undefined && user?.notes.length >= 1) {
      setIsLoad(user)
      console.log(user.notes)
    } else if (logged !== undefined && logged?.notes !== undefined && logged?.notes.length >= 1) {
      setIsLoad(logged)
    } 
  },[user])

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
        isLoad !== undefined && <Add info={isLoad as UserLogged} />
      }
    </main>
  )
}