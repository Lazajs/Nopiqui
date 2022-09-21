import express from "express"
import bcrypt from 'bcrypt'
import User from "../db/models/User"

const router = express.Router()

router.post('/', async (req, res, next)=>{ //still missing notes 
  const body = {...req.body}
  const {password, username} = body
  const passwordHash = await bcrypt.hash(password, 12).then()
  delete body.password
  body.username = body.username.trim()
  body.created = new Date().toDateString()
  const NewUser = new User({...body, passwordHash})
  
  const check = await User.findOne({username})

  if (check !== null) {
    next({type: 'bad'})
  } else {
    NewUser.save()
      .then(is => res.status(201).end())
      .catch(console.log)
  }
})

export default router