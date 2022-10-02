import { convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { useState, useContext, useEffect, useRef } from 'react'
import {LogUser, UserLogged} from 'types'
import {UserRecentLoggedCTX} from 'context/UserRecentLogged'
import { Dispatch, SetStateAction} from 'react'
import './styles/RichEditor.scss'
import Spinner from './Spinner'

type PropParams = {title: string, content: string, userId: string, setLogged: Dispatch<SetStateAction<UserLogged>>}

type Props = {
  doNote : ({ title, content, userId, setLogged }: PropParams) => Promise<void>,
  titleHandlers : any,
  contentHandlers: any 
}

export default function RichEditor ({doNote, titleHandlers, contentHandlers}: Props) {
	const {logged, setLogged} = useContext(UserRecentLoggedCTX) as LogUser
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [titleState, setTitleState] = titleHandlers
	const [editorState, setEditorState] = contentHandlers
	const button = useRef<any>()

	useEffect(()=> {
		if (titleState !== undefined && button.current) {
			const rawTitle = convertToRaw(titleState.getCurrentContent())
			const title = rawTitle.blocks[0].text
			if (title.length > 1 && title.length < 30) {
				button.current.disabled = false
			} else button.current.disabled = true
		}
	},[titleState])

	const handleSave = async () => {
		const rawContentString = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
		const rawTitleString = JSON.stringify(convertToRaw(titleState.getCurrentContent()))
		const {id} = logged   

		if (rawTitleString) {
			setIsLoading(true)
			await doNote({setLogged: setLogged, title: rawTitleString, content: rawContentString, userId: id})
				.catch(console.log)
			setIsLoading(false)
		} 
	}

	return (
		<>
			<article className='holder'>
				<Editor 
					placeholder='Title (max: 30)'
					editorState={titleState}
					onEditorStateChange={setTitleState}
					wrapperClassName='wrapper title'
					editorClassName='editor title'
					toolbarClassName='toolbar title'
					toolbar={{
						options:  ['fontFamily', 'colorPicker', 'emoji', 'remove', 'history', 'textAlign'],
						fontFamily: {options: ['Assistant', 'Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana', 'Bad Script']}
					}}
				/>

				<Editor 
					placeholder='Content'
					editorState={editorState}
					onEditorStateChange={setEditorState}
					wrapperClassName='wrapper content'
					editorClassName='editor content'
					toolbarClassName='toolbar content'
					toolbar={{
						options: ['colorPicker','image','inline','emoji',  'fontSize', 'fontFamily','blockType', 'list', 'textAlign',  'link', 'embedded',  'remove', 'history'],
						inline: { inDropdown: true },
						list: { inDropdown: true },
						textAlign: { inDropdown: true },
						link: { inDropdown: true, defaultTargetOption: '_blank'},
						fontFamily: {options: ['Assistant', 'Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana', 'Bad Script']}
					}}
				/>
			</article>

			{!isLoading ? <button className='save' ref={button} onClick={handleSave} type='button'>SAVE</button>  : <Spinner/>}
		</>
	)
}