import '@testing-library/jest-dom/extend-expect'
import {render, cleanup, screen} from '@testing-library/react'
import {MemoryRouter as Router } from 'react-router-dom'
import App from 'App'

describe('Preview', ()=> {
	afterEach(cleanup)

	it('renders correctly', ()=> {
		render(<Router initialEntries={['/']}><App/></Router>)
	})

	it('matches route', ()=> {
		const Page = render(<Router initialIndex={0} initialEntries={['/']}><App/></Router>)
		screen.debug()
	})
  
})