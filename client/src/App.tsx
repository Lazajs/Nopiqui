import './App.scss'
import Login from 'pages/Login'
import Register from 'pages/Register'
import Preview from 'pages/Preview'
import Home from 'pages/Home' 
import Create from 'pages/Create'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { UserCTX } from 'context/User'
import { DataForUser } from 'types'
import RecentLoggedProvider from 'context/UserRecentLogged'

function App () {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useContext(UserCTX) as DataForUser 
  const notAllowedIfLogged = ['/', '/register', '/login']

  useEffect(()=>{
    if (user?.error !== undefined && Boolean(user?.error)){
      navigate(notAllowedIfLogged.includes(location.pathname) ? location.pathname : '/login')
    } else if (user !== undefined && user.username !== undefined) {
      navigate(notAllowedIfLogged.includes(location.pathname) ? `/home/${user.id}` : location.pathname)
    }
  },[user])

  return (
    <RecentLoggedProvider>
      <Routes>
        <Route path='/' element={<Preview />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home/:userId' element={<Home />} />
        <Route path='/home/:userId/create' element={<Create />} />
      </Routes>
    </RecentLoggedProvider>
  )
}

export default App