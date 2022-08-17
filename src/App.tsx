import './App.scss'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from 'pages/Login'
import Register from 'pages/Register'
import useSession from 'hooks/useSession'
import Preview from 'pages/Preview'

function App () {
  // const {user} = useSession()
  
  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Preview />} />
        {/* <Route path='/login' element={<Login />} /> */}
        {/* <Route path='/register' element={<Register />} /> */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App