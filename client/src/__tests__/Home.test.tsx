import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, cleanup} from '@testing-library/react'
import {MemoryRouter as Router} from 'react-router-dom'
import Home from 'pages/Home'
import NotesSection from 'pages/Home/NotesSection'
import App from 'App'


describe('Home page', ()=> {
	afterEach(cleanup)

	it('renders correctly', ()=> {
		render(
			<Router initialEntries={['/home']}>
				<App />
			</Router>
		)
	})

	it('renders main content', () => {
		const Notes = render(<Router initialEntries={['/home']}><App /></Router>)
		expect(Notes.container).toContainHTML('main')
		const Main = Notes.getByTestId('main')
		expect(Main).toBeInTheDocument()
	})
})


