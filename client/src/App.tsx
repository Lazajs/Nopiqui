import './App.scss'
import Login from 'pages/Login'
import Register from 'pages/Register'
import Preview from 'pages/Preview'
import Home from 'pages/Home' 
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { UserCTX } from 'context/User'
import { DataForUser } from 'types'
import RecentLoggedProvider from 'context/UserRecentLogged'

function App () {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useContext(UserCTX) as DataForUser 

  useEffect(()=>{
    if (user?.error !== undefined && Boolean(user?.error)){
      navigate(location.pathname === '/' ? '/' : location.pathname === '/register' ? '/register' : '/login')
    } else if (user !== undefined && user.username !== undefined) {
      navigate(`/home/${user.username}`)
    }
  },[user])

  return (
    <RecentLoggedProvider>
      <Routes>
        <Route path='/' element={<Preview />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home/:user' element={<Home />} />
        {/* <Route path='/notes/:user/:id' element={//} /> */}
      </Routes>
    </RecentLoggedProvider>
  )
}

export default App