import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import {MemoryRouter as Router} from 'react-router-dom'
import App from 'App'

describe('Home page', ()=> {
	const route = ['/home']

	it('renders correctly', ()=> {
		render(
			<Router initialEntries={route}>
				<App />
			</Router>
		)
	})

	it('renders main content', () => {
		const Notes = render(<Router initialEntries={route}><App /></Router>)
		expect(Notes.container).toContainHTML('main')
		const Main = Notes.getByTestId('main')
		expect(Main).toBeInTheDocument()
	})

	it('renders archive', ()=> {
		render(
			<Router initialEntries={['/home/archive']}>
				<App />
			</Router>
		)

		screen.getAllByText('Archive')
	})


})


