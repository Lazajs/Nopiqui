import express from "express"
import register from './routes/register'
import login from './routes/login'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db/mongo'

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

app.use(express.json())
app.use(cors(corsOptions))
app.use('/register', register)
app.use('/login', login)

app.post('/', (req, res) => {
  console.log(req.header)
  res.status(200).end()
})

app.listen(process.env.APP_PORT, ()=> console.log('listening'))