import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import App from 'App'
import {MemoryRouter} from 'react-router-dom'

describe('Register', ()=> {
	it ('renders correctly', ()=> {
		render(
			<MemoryRouter initialEntries={['/register']}>
				<App />
			</MemoryRouter>
		)

		screen.getByText('Register')
	})
})