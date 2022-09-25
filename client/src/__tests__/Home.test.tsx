import React from "react";
import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'
import Home from 'pages/Home'
import Add from 'pages/Home/Add'

describe('Home page', ()=> {
  const routes = ['/home']
  
  const Page = render(
    <MemoryRouter initialEntries={routes} initialIndex={0}>
      <Home />
    </MemoryRouter>
  )

  it('renders correctly', ()=> {
    expect(Page.container).toBeInTheDocument()
  })

  // describe('Add note component', ()=>{
  //   it('renders correctly', () => {
  //     screen.getByText('Add new')
  //   })
  // })

  screen.debug()
})


