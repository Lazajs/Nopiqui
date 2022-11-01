import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import App from 'App'
import {MemoryRouter, BrowserRouter} from 'react-router-dom'
import RichEditor from 'components/RichEditor'
import {useState, Dispatch, SetStateAction} from 'react'
import {UserLogged} from 'types'
import {convertFromRaw, EditorState} from 'draft-js'

type Args = {
  setLogged: Dispatch<SetStateAction<UserLogged>>, 
  title: string, 
  content: string, 
  userId: string
}

function Container () {
	const titleRaw = {'blocks':[{'key':'4amhd','text':'Nota de segundo','type':'unstyled','depth':0,'inlineStyleRanges':[],'entityRanges':[],'data':{}}],'entityMap':{}}
	const contentRaw = {'blocks':[{'key':'7oqna','text':'Nota de segundo Nota de segundo Nota de segundo Nota de segundo Nota de segundo ','type':'unstyled','depth':0,'inlineStyleRanges':[],'entityRanges':[],'data':{}}],'entityMap':{}}
	
	
	const titleHandlers = useState(()=> {
		const fromRaw = convertFromRaw(titleRaw)
		return EditorState.createWithContent(fromRaw)
	})

	const contentHandlers = useState(()=> {
		const fromRaw = convertFromRaw(contentRaw)
		return EditorState.createWithContent(fromRaw)
	})

	const editNote = async ({setLogged, title, content, userId}: Args) => {
		const _unusedVar = setLogged + title + content + userId
		return
	}


	return (
		<RichEditor doNote={editNote} titleHandlers={titleHandlers} contentHandlers={contentHandlers} />
	)
}

describe('Editor', ()=> {
	it ('create editor renders correctly', ()=> {
		render(
			<MemoryRouter initialEntries={['/asdfa/create']}>
				<App />
			</MemoryRouter>
		)

		screen.getAllByTitle('Color Picker')
		screen.getAllByTitle('Emoji')
	})

	it ('edition renders correctly', ()=> {
		render(
			<MemoryRouter initialEntries={['/asdfa/create']}>
				<App />
			</MemoryRouter>
		)

		screen.getAllByTitle('Color Picker')
		screen.getAllByTitle('Emoji')
	})

	it ('editor renders correctly with content', ()=> {
		render(
			<BrowserRouter>
				<Container />
			</BrowserRouter>
		)

		expect(screen.getAllByText('Nota de segundo')[0]).toBeInTheDocument()
	})

})