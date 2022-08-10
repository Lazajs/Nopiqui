import React, { useEffect, useState } from 'react'
import './App.scss'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from 'pages/Login'
import Register from 'pages/Register'

// import TypingAnimation from 'components/TypingAnimation'
// {/* <TypingAnimation /> */}

function App () {
  
  return (
    <>
    <BrowserRouter>
      <Routes>

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
