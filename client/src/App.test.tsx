import { render, cleanup } from '@testing-library/react'
import App from './App'
import {BrowserRouter as Router} from 'react-router-dom'

describe('Renders the App', () => {
	afterEach(cleanup)
	
	it ('renders correctly', ()=> {
		render(
			<Router>
				<App />
			</Router>
		)
	}) 
})
