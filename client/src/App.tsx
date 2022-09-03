import './App.scss'
import Login from 'pages/Login'
import Register from 'pages/Register'
import Preview from 'pages/Preview'
import Home from 'pages/Home' 
import Create from 'pages/Create'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import React, { useContext, useEffect } from 'react'
import { UserRecentLoggedCTX } from 'context/UserRecentLogged'
import { UserLogged } from 'types'

type UserInformation = {
  logged : UserLogged,
  setLogged: React.Dispatch<React.SetStateAction<UserLogged>>
}

// Deberia agregar boton para archivar y desarchivar
// fontsize comienza en 30 por alguna razon
// el estilo del toolbar no me termina de convencer
// USAR mismo componente para create y edit

// PROBLEMAS GRAVES 
// ser mas user friendly con la espera de resolucion de promesas, se ve todo muy poco dinamico

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
    console.log(logged)
  },[logged])

  return (
      <Routes>
        <Route path='/' element={<Preview />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home/:userId' element={<Home />} />
        <Route path='/home/:userId/create' element={<Create />} />
      </Routes>
  )
}

export default App