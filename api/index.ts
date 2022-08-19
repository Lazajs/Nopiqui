import express from "express"
import register from './routes/register'
import login from './routes/login'
import contact from './routes/contact'
import notes from './routes/notes'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db/mongo'
import cookieParser from 'cookie-parser'
import logged from './routes/middlewares/logged'

dotenv.config()
const app = express()

//@todo arreglar para mas seguridad
const corsOptions = {
  credentials: true,
  origin: process.env.ENVIROMENT === 'development' ? 'http://localhost:3000' : 'http://localhost:3000'
}

connectDB
  .then(res => console.log('Succesfully connected to DB'))
  .catch(console.log)

app.use(cookieParser())
app.use(express.json())
app.use(cors(corsOptions))
app.use('/register', register)
app.use('/login', login)
app.use('/contact', contact)
app.use('/notes', notes)

app.get('/' , logged, (req, res) => {
  console.log(req.header)
  res.status(200).send(res.locals.decoded).end()
})

app.listen(process.env.APP_PORT, ()=> console.log('listening'))