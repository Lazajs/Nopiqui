import '@testing-library/jest-dom/extend-expect'
import {render, screen, fireEvent} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'
import App from 'App'

describe('Preview', ()=> {
	const route = ['/']

	it('renders', ()=> {
		render(
			<MemoryRouter initialEntries={route}>
				<App />
			</MemoryRouter>
		)
	})

	it('has title', ()=> {
		render(
			<MemoryRouter initialEntries={route}>
				<App />
			</MemoryRouter>
		)

		expect(screen.getAllByText('Nopiqui')[0]).toBeInTheDocument()
	})

	it('Nav is working and redirects', ()=> {
		render(
			<MemoryRouter initialEntries={route}>
				<App />
			</MemoryRouter>
		)
		
		const getStarted = screen.getByText('Get started')
		fireEvent.click(getStarted)

		expect(getStarted).not.toBeInTheDocument()
	})

	it('Have contact form', ()=> {
		render(
			<MemoryRouter initialEntries={route}>
				<App />
			</MemoryRouter>
		)

		expect(screen.getByText('Pricing & contact')).toBeInTheDocument()
		expect(screen.getByPlaceholderText('your@email.com')).toBeInTheDocument()
		expect(screen.getByPlaceholderText('Your message')).toBeInTheDocument()
	})
})