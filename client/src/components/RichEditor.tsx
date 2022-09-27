import { convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { useState, useContext } from 'react'
import {LogUser, UserLogged} from 'types'
import {UserRecentLoggedCTX} from 'context/UserRecentLogged'
import Spinner from 'components/Spinner'
import { Dispatch, SetStateAction} from 'react'

type ErrorCase = {
  title?: string,
  save?: string
}

type PropParams = {title: string, content: string, userId: string, setLogged: Dispatch<SetStateAction<UserLogged>>}

type Props = {
  doNote : ({ title, content, userId, setLogged }: PropParams) => Promise<void>,
  titleHandlers : Array<any>,
  contentHandlers: Array<any>
}

export default function RichEditor ({doNote, titleHandlers, contentHandlers}: Props) {
	const {logged, setLogged} = useContext(UserRecentLoggedCTX) as LogUser
	const [isEmpty, setIsEmpty] = useState<ErrorCase>()
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const [titleState, setTitleState] = titleHandlers
	const [editorState, setEditorState] = contentHandlers

	const handleSave = async () => {
		const rawTitleString = JSON.stringify(convertToRaw(titleState.getCurrentContent()))
		const rawContentString = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
		const {id} = logged   
		const title = JSON.parse(rawTitleString).blocks[0].text
		if (title.length > 30) {
			setIsEmpty({title: 'The title is too long (max: 30 char.)'})
			return
		} else if (title === '') {
			setIsEmpty({save: 'Title is required.'})
			return
		} 
		setIsLoading(true)
		await doNote({setLogged: setLogged, title: rawTitleString, content: rawContentString, userId: id})
			.catch(console.log)
		setIsLoading(false)
    
	}

	return (
		<>
			<Editor 
				placeholder='Title'
				editorState={titleState}
				onEditorStateChange={setTitleState}
				wrapperClassName='edit-wrapper title'
				editorClassName='edit-editor title'
				toolbarClassName='edit-toolbar title'
				toolbar={{
					options:  ['fontFamily', 'colorPicker', 'emoji', 'remove', 'history', 'textAlign'],
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
		</>
	)
}