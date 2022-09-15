import './App.scss'
import Login from 'pages/Login'
import Register from 'pages/Register'
import Preview from 'pages/Preview'
import Home from 'pages/Home' 
import Create from 'pages/Create'
import View from 'pages/View'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import React, { useContext, useEffect } from 'react'
import { UserRecentLoggedCTX } from 'context/UserRecentLogged'
import { UserLogged } from 'types'
import Edit from 'pages/Edit'

type UserInformation = {
  logged : UserLogged,
  setLogged: React.Dispatch<React.SetStateAction<UserLogged>>
}

// fontsize comienza en 30 por alguna razon
// USAR mismo componente para create y edit
// arreglar rutas, poder entrar a visualizar nota sin estar registrado
// Crear ruta de 404

function App () {
  const navigate = useNavigate()
  const location = useLocation()
  const {logged} = useContext(UserRecentLoggedCTX) as UserInformation
  const notAllowedIfLogged = ['/', '/register', '/login']

  const {id} = logged

  useEffect(()=>{
    if (logged?.error !== undefined && Boolean(logged?.error)){
      navigate(notAllowedIfLogged.includes(location.pathname) ? location.pathname : '/login')
    } else if (logged !== undefined && logged.username !== '') {
      navigate(notAllowedIfLogged.includes(location.pathname) ? `/home/${id}` : location.pathname)
    }
  },[logged])

  return (
      <Routes>
        <Route path='/' element={<Preview />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home/:userId' element={<Home />} />
        <Route path='/home/:userId/create' element={<Create />} />
        <Route path='/view/:noteId' element={<View />} />
        <Route path='/edit/:noteId' element={<Edit />} />
      </Routes>
  )
}

export default App