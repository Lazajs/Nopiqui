import Nav from "components/Nav"
import NavHome from "components/NavHome"
import Back from "components/Back"
import RichEditor from "components/RichEditor"
import { EditorState, convertFromRaw } from "draft-js"
import {Dispatch,  SetStateAction, useEffect, useState} from 'react'
import {UserLogged, NoteType} from 'types'
import useEdit from './hooks/useEdit'
import {useNavigate, useLocation} from 'react-router-dom'
import Spinner from "components/Spinner"

type Args = {
  setLogged: Dispatch<SetStateAction<UserLogged>>, 
  title: string, 
  content: string, 
  userId: string
}

type RouterState = {state: {logged: UserLogged}}

export default function () {
  const edit = useEdit()
  const navigate = useNavigate()
  const location = useLocation()
  const selfId = location.pathname.split('/').at(-1) as string
  const {state} = location as RouterState

  const [title, setTitle] = useState<any>()
  const [content, setContent] = useState<any>()

  const titleHandlers = [title, setTitle]
  const contentHandlers = [content, setContent]

  useEffect(()=> {

    setTitle(() => {
      if (state?.logged !== undefined) {
        const {notes} = state.logged
        const itself = notes.find((e: NoteType) => e.id === selfId)
        const fromRaw = convertFromRaw(JSON.parse(itself.title))
        return EditorState.createWithContent(fromRaw)
      }}
    )

    setContent(() => {
      if (state?.logged !== undefined) {
        const {notes} = state.logged
        const itself = notes.find((e: NoteType) => e.id === selfId)
        const fromRaw = convertFromRaw(JSON.parse(itself.content))
        return EditorState.createWithContent(fromRaw)
      }}
    )
  },[])

  const editNote = async ({setLogged, title, content, userId}: Args) => {
    //received title and content are RAW from Draft.
    console.log(title, content, userId)
    const res: NoteType = await edit({title: title, content: content, userId: userId, id: selfId})
    
    if (res.id !== undefined) {
      setLogged((prev: UserLogged)  => {
        const {notes} = prev
        const filtered = notes.filter((e: NoteType) => e.id !== selfId) 
        navigate(`/home/${userId}`)
        return {...prev, notes: filtered.concat(res)}
      })
    }
  }

  return (
     <div className='page'>
      <Nav>
        <NavHome />
      </Nav>

      <Back />
      {title !== undefined ? <RichEditor doNote={editNote} titleHandlers={titleHandlers} contentHandlers={contentHandlers} /> : <Spinner />}
     
    </div>
  )
}