import { NoteType, UserLogged } from "types"
import Note from "./Note"
import Add from "./Add"
import './styles/NotesSection.scss' 
import {UserCTX} from "context/User"
import { useContext, useState, useEffect } from "react"
import {DataForUser} from 'types'

export default function NotesSection () {
  const user = useContext(UserCTX) as DataForUser
  const [isLoad, setIsLoad] = useState<boolean>(false)

  useEffect(()=> {
    if (user !== undefined && user?.notes !== undefined && user?.notes.length>= 1) {
      setIsLoad(true)
      console.log(user.notes)
    } else setIsLoad(false)
  },[user])


  // const {notes} = user as UserLogged

  return (
    <main className="main">
      {
        isLoad ? user?.notes.map((e: any) =>{
          return <Note title={e.title} content={e?.content} key={e.id} />
        }) : ''
      }
      {
        isLoad && user?.notes.length <= 0 ? <p className="none">Your ideas will appear here, start creating!</p> : ''
      }
      <Add />
    </main>
  )
}