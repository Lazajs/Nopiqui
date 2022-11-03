import express from 'express'
import connectDB from './db/mongo'
import register from './routes/register'
import login from './routes/login'
import contact from './routes/contact'
import notes from './routes/notes'
import logout from './routes/logout'
import handleError from './routes/middlewares/handleError'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import path from 'path'
import './db/models/Note'
import notFound from './routes/notFound'

dotenv.config()
const app = express()

const corsOptions = {
	credentials: true,
	origin: false,
}

connectDB
	.then(() => console.log('Succesfully connected to DB'))
	.catch(ConnectToDBError => console.log({ConnectToDBError}))

app.use(cookieParser())
app.use(express.json({limit: '50mb'}))
app.use(cors(corsOptions))
app.use(express.static('../client/build'))

app.use('/register', register)
app.use('/login', login)
app.use('/contact', contact)
app.use('/notes', notes)
app.use('/logout', logout)
app.use('404', notFound)

app.get('*', (req, res) => {    
	if (process.env?.ENVIROMENT) res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))                 
	else res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'))                  
})

app.use(handleError)

app.listen(process.env.PORT || 3001, ()=> console.log('listening'))