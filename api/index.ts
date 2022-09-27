import express from 'express'
import connectDB from './db/mongo'
import register from './routes/register'
import login from './routes/login'
import contact from './routes/contact'
import notes from './routes/notes'
import logout from './routes/logout'
import logged from './routes/middlewares/logged'
import populate from './routes/middlewares/populate'
import handleError from './routes/middlewares/handleError'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import './db/models/Note'

dotenv.config()
const app = express()

const corsOptions = {
	credentials: true,
	origin: ['http://localhost:3000'],
}

connectDB
	.then(() => console.log('Succesfully connected to DB'))
	.catch(ConnectToDBError => console.log({ConnectToDBError}))

app.use(cookieParser())
app.use(express.json({limit: '50mb'}))
app.use(cors(corsOptions))
// default date is new Date().toLocaleDateString()
app.use('/register', register)
app.use('/login', login)
app.use('/contact', contact)
app.use('/notes', notes)
app.use('/logout', logout)

app.get('/' , logged, populate, (req, res, next) => {
	const populated = res.locals?.populated
  
	if (populated !== undefined) {
		res.status(200).send(populated).end()
	} else {
		next({type: 'auth'})
	}
})

app.use(handleError)

app.listen(process.env.PORT === undefined ? 3001 : process.env.PORT, ()=> console.log('listening'))