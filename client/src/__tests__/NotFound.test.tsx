import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import App from 'App'
import {MemoryRouter} from 'react-router-dom'

describe('404 Error page', ()=> {
	it('renders if neccesary', ()=> {
		render(
			<MemoryRouter initialEntries={['/invalid']}>
				<App />
			</MemoryRouter>
		)

		expect(screen.getByText('404')).toBeInTheDocument()
	})

	it('do not render if not neccesary', ()=> {

		render(
			<MemoryRouter initialEntries={['/home']}>
				<App />
			</MemoryRouter>
		)

		const notFound = screen.queryByText('404')
		expect(notFound).toBeNull() 

	})
})