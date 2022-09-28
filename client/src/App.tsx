import './App.scss' 
import Login from 'pages/Login'
import Register from 'pages/Register'
import Preview from 'pages/Preview'
import Home from 'pages/Home' 
import Create from 'pages/Create'
import View from 'pages/View'
import { Routes, Route, Navigate } from 'react-router-dom'
import Edit from 'pages/Edit'
import Auth from 'components/Auth'
import Session from 'components/Session'
import NotFound from 'pages/404'
import Archive from 'pages/Home/Archive'

function App () {
	return (
		<Routes>
			<Route element ={<Session />}> 
				<Route path='/' element={<Preview />} />
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
			</Route>

			<Route path='/:noteId/view' element={<View />} />

			<Route element={<Auth />}>
				<Route path='/home' element={<Home />}>
					<Route path='archive' element={<Archive />} />
				</Route>
				<Route path='/:userId/create' element={<Create />} />
				<Route path='/:noteId/edit' element={<Edit />} />
			</Route>

			<Route path='/404' element={<NotFound />} />
			<Route path='*' element={<Navigate to='/404'/>} />
		</Routes>
	)
}

export default App