import {Router} from 'express'
import Contact from '../db/models/Contact'


const router = Router()

router.post('/', async (req,res) => {
  const {text, email} = req.body

  if (!text || !email) res.status(400).send({message: 'Error while sending, some data is missing'}).end()

  const check = await Contact.find({email}) as any
  const found = check[0]
  if (found && found._id) res.status(400).send({message: "You've already sent a message. Please wait to be answered."}).end()
  
  const Message = new Contact({email: email, text: text})
  await Message.save()
  res.status(201).end()

})

export default router