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
import { useNavigate } from 'react-router-dom';
import Spinner from 'components/Spinner';

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
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const create = useCreate() 

  const handleSave = async () => {
    const rawTitleString = JSON.stringify(convertToRaw(titleState.getCurrentContent()))
    const rawContentString = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    const {id} = logged   
    const title = JSON.parse(rawTitleString).blocks[0].text
    if (title.length > 20) {
      setIsEmpty({title: 'The title is too long (max: 20 char.)'})
      return
    } else if (title === '') {
      setIsEmpty({save: 'Title is required.'})
      return
    } 
    setIsLoading(true)
      

     const res: NoteType = await create({title: rawTitleString, content: rawContentString, userId: id})
        setLogged(prev => {
            const {notes} = prev
            navigate(`/home/${id}`)
            setIsLoading(false)
            return {...prev, notes: notes.concat(res)}
        })
  }


  return (
    <div className='page'>
      <Nav>
        <NavHome />
      </Nav>


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
       {isEmpty?.title !== undefined ? <p className='save-error'>{isEmpty.title}</p> : ''}
       {isEmpty?.save !== undefined ? <p className='save-error'>{isEmpty.save}</p> : ''}

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

 
      {!isLoading ? <button className='save' onClick={handleSave} type='button'>SAVE</button> : <div className='loading'><Spinner /></div> }
    </div>
  )
}