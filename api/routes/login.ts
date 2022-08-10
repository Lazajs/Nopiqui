import {Router} from 'express'
import jwt from 'jsonwebtoken'
import User from '../db/models/User'
import bcrypt from 'bcrypt'
import { UserData } from 'types'
import dotenv from 'dotenv'
import dayjs from 'dayjs'

dotenv.config()
const router = Router()

router.post('/', async (req,res)=>{
  const data = {...req.body}
  const {password, username} = data
  const UserDBData: UserData | null = await User.findOne({username})
// .populate('notes')
  
  if (!UserDBData || UserDBData.passwordHash === undefined) {
    res.status(404).send({message: 'Username not found'}).end()
  } else {
    const {passwordHash} = UserDBData
    const match = await bcrypt.compare(password, passwordHash)

    if (match) {
      const DataToJWT = {id: UserDBData._id, username: UserDBData.username}
      const token = jwt.sign(DataToJWT, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRES })

      const DataToSend = {
        username: UserDBData.username,
        notes: [] //send real notes afterwards
      }

      res.cookie('token', JSON.stringify(token), {
        httpOnly: true,
        expires: dayjs().add(1, "days").toDate(),
        sameSite: 'none',
        secure: true
      }).header('Access-Control-Allow-Credentials', 'true').status(200).send(DataToSend).end()
    } else res.status(400).send({message: 'Invalid password'}).end()
  }
})

export default router