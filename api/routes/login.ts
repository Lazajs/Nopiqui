import {Router} from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import dayjs from 'dayjs'
import logged from './middlewares/logged'
import {UserData} from '../types'
import '../db/models/Note'
import User from '../db/models/User'

dotenv.config()
const router = Router()

router.post('/', async (req,res)=>{
  const data = {...req.body}
  const {password, username} = data
  const UserDBData: UserData | null = await User.findOne({username})


  if (!UserDBData || UserDBData.passwordHash === undefined) {
    res.status(404).send({message: 'Username not found'}).end()
  } else {
    const {passwordHash} = UserDBData
    const match = await bcrypt.compare(password, passwordHash)

    if (match) {
      const userPopulated = await User.findOne({username, passwordHash}).populate('notes') as any
      
      const DataToJWT = {id: UserDBData.id, username: UserDBData.username}
      const token = jwt.sign(DataToJWT, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRES })

      console.log(' el userdb data es:', userPopulated)

      const DataToSend = { ...userPopulated }

      res.cookie('token', JSON.stringify(token), {
        httpOnly: true,
        expires: dayjs().add(1, "days").toDate(),
        sameSite: 'none',
        secure: true
      }).header('Access-Control-Allow-Credentials', 'true').status(200).send(DataToSend).end()
    } else res.status(400).send({message: 'Invalid password'}).end()
  }
})

router.get('/', logged, async (req,res) =>{
  res.status(200).send(res.locals.decoded) //here should get all populated notes and be sen
})

export default router