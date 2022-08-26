import express from 'express'
import connectDB from './db/mongo'
import register from './routes/register'
import login from './routes/login'
import contact from './routes/contact'
import notes from './routes/notes'
import logout from './routes/logout'
import logged from './routes/middlewares/logged'
import populate from './routes/middlewares/populate'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import './db/models/Note'

dotenv.config()
const app = express()

const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000', 'http://localhost:3001'],
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
app.use('/logout', logout)


app.get('/' , logged, populate, (req, res) => {
  const populated = res.locals?.populated
  if (populated) {
    res.status(200).send(populated).end()
  } else res.status(401).send({ error: 'Session expired. Please Log In to continue' })
})

app.listen(process.env.PORT || 3001, ()=> console.log('listening'))