import '@testing-library/jest-dom/extend-expect'
import {fireEvent, render, RenderResult} from '@testing-library/react'
import Preview from 'pages/Preview'
import {BrowserRouter as Router} from 'react-router-dom'
import Register from 'pages/Register'

test('clicking to signup', ()=>{
  const component: RenderResult = render(<Router><Preview/></Router>)
  const button = component.getByText("Sign up - It's free")
  fireEvent.click(button)
  const register = render(<Router><Register /></Router>)
  expect(register.container).toBeInTheDocument()

})