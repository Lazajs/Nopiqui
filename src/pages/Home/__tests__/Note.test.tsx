import React from "react";
import '@testing-library/jest-dom/extend-expect'
import {render} from '@testing-library/react'
import {BrowserRouter as Router} from 'react-router-dom'
import Home from 'pages/Home'
import NotesSection from 'pages/Home/NotesSection'

test('Add note rendered', () => {
  const HomeComponent = render(<Router> <Home/></Router>)
  HomeComponent.findByText('Add new...')
})

test('All notes rendered', () => {
  const AllNotesRendered = render(<Router><NotesSection /></Router>)
  AllNotesRendered.getByText('Primera Nota') // has note, but how many?
  
  // console.log(AllNotesRendered.debug())
})