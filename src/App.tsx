import './App.scss'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from 'pages/Login'
import Register from 'pages/Register'
import useSession from 'hooks/useSession'

// import TypingAnimation from 'components/TypingAnimation'
// {/* <TypingAnimation /> */}

function App () {
  const {user} = useSession()

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