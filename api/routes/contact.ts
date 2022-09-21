import {Router} from 'express'
import Contact from '../db/models/Contact'


const router = Router()

router.post('/', async (req,res, next) => {
  const {text, email} = req.body

  if (!text || !email) next({type: 'bad'})

  const check = await Contact.find({email}) as any
  const found = check[0]
  if (found && found._id) next({type: 'conflict'})
  
  const Message = new Contact({email: email, text: text})
  await Message.save()
  res.status(201).end()

})

export default router