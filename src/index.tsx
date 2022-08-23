import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import UserProvider from 'context/User'
import { BrowserRouter as Router } from 'react-router-dom'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <App/>
      </UserProvider>
    </Router>
  </React.StrictMode>
)
