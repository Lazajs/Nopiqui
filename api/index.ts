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
import path from 'path'

dotenv.config()
const app = express()

//@todo arreglar para mas seguridad
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

console.log('CULO ROTO CHYUPA VERGA ', path.join(__dirname, '..', 'public'))
const publicPath = path.join(__dirname, '..', 'public')

app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});
  
app.get('/' , logged, (req, res) => {
res.status(200).send(res.locals.decoded).end()
})

app.listen(process.env.PORT || 3001, ()=> console.log('listening'))