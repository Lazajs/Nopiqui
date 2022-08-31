import { useContext, useState } from 'react'
import { convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './styles/index.css'
import Nav from 'components/Nav';
import NavHome from 'components/NavHome';
import { UserCTX } from 'context/User';
import { UserRecentLoggedCTX } from 'context/UserRecentLogged';
import {UserLogged} from 'types'
import useCreate from './hooks/useCreate'

type LogUser = {
  logged: UserLogged,
  setLogged: React.Dispatch<React.SetStateAction<UserLogged>>
}

type ErrorCase = {
  title?: string,
  save?: string
}

export default function Create () {
  const user = useContext(UserCTX)
  const {logged, setLogged} = useContext(UserRecentLoggedCTX) as LogUser
  const [titleState, setTitleState] = useState(()=> EditorState.createEmpty())
  const [editorState, setEditorState] = useState(()=> EditorState.createEmpty())
  const [isEmpty, setIsEmpty] = useState<ErrorCase>()
  const create = useCreate() 

  const handleSave = () => {
    const rawTitleString = JSON.stringify(convertToRaw(titleState.getCurrentContent()))
    const rawContentString = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    const userId = user?.id === undefined ? logged?.id : user?.id
    const title = JSON.parse(rawTitleString).blocks[0].text
      if (title.length > 20) {
        setIsEmpty({title: 'The title is too long.'})
        return
      } else if (title === '') {
        setIsEmpty({save: 'Title is required.'})
      } 

      create({title: rawTitleString, content: rawContentString, userId: userId})
        .then(console.log)
        .catch(console.log)
  }


  return (
    <>
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