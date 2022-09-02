import { useContext, useState } from 'react'
import { convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './styles/index.css'
import Nav from 'components/Nav';
import NavHome from 'components/NavHome';
import { UserRecentLoggedCTX } from 'context/UserRecentLogged';
import {NoteType, UserLogged} from 'types'
import useCreate from './hooks/useCreate'
import { Link } from 'react-router-dom';

type LogUser = {
  logged: UserLogged,
  setLogged: React.Dispatch<React.SetStateAction<UserLogged>>
}

type ErrorCase = {
  title?: string,
  save?: string
}

export default function Create () {
  const {logged, setLogged} = useContext(UserRecentLoggedCTX) as LogUser
  const [titleState, setTitleState] = useState(()=> EditorState.createEmpty())
  const [editorState, setEditorState] = useState(()=> EditorState.createEmpty())
  const [isEmpty, setIsEmpty] = useState<ErrorCase>()
  const create = useCreate() 
  const {id} = logged

  const handleSave = () => {
    const rawTitleString = JSON.stringify(convertToRaw(titleState.getCurrentContent()))
    const rawContentString = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    const {id} = logged   
    const title = JSON.parse(rawTitleString).blocks[0].text
      if (title.length > 20) {
        setIsEmpty({title: 'The title is too long.'})
        return
      } else if (title === '') {
        setIsEmpty({save: 'Title is required.'})
      } 

      create({title: rawTitleString, content: rawContentString, userId: id})
        .then((res: NoteType)=> {
          setLogged(prev => {
            const {notes} = prev
            return {...prev, notes: notes.concat(res)}
          })
        }) 
        .catch(console.log)
  }


  return (
    <>
      <Nav>
        <NavHome />
      </Nav>

      <Link to={`/home/${id}`}><button type='button'>GO BEFORE</button></Link>

      <Editor 
        toolbarOnFocus
        placeholder='Title'
        editorState={titleState}
        onEditorStateChange={setTitleState}
        wrapperClassName='edit-wrapper title'
        editorClassName='edit-editor title'
        toolbarClassName='edit-toolbar title'
        toolbar={{
          options:  ['fontFamily', 'colorPicker', 'emoji', 'remove', 'history'],
          fontFamily: {options: ['Assistant', 'Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana', 'Bad Script']}
        }}
       />
       {isEmpty?.title !== undefined ? <p>{isEmpty.title}</p> : ''}

      <Editor 
        toolbarOnFocus
        placeholder='Content'
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName='edit-wrapper content'
        editorClassName='edit-editor content'
        toolbarClassName='edit-toolbar content'
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true, defaultTargetOption: '_blank'},
          fontFamily: {options: ['Assistant', 'Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana']}
        }}
       />

      {isEmpty?.save !== undefined ? <p>{isEmpty.save}</p> : ''}
      <button onClick={handleSave}>Save</button>
    </>
  )
}